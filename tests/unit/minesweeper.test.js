import { shallowMount } from '@vue/test-utils'
import Minesweeper from '@/components/Minesweeper.vue'

describe('Minesweeper.vue', () => {

  test('contains 100 tiles', () => {
    const ms = shallowMount(Minesweeper)

    expect(ms.vm.tiles.flat().length).toBe(100)
  })

  test('less than half of the tiles are bombs', () => {
    const ms = shallowMount(Minesweeper)

    expect(ms.vm.tiles.flat().filter(tile => tile.hasMine).length < 50).toBeTruthy()
  })

  test('dizzy face is shown if the game is over', () => {
    const ms = shallowMount(Minesweeper)

    ms.vm.setGameOver()
    expect(ms.vm.displayClassicEmoji).toBe('😵')
  })

  test('sunglasses face is shown if the player wins', () => {
    const ms = shallowMount(Minesweeper)

    ms.vm.tiles.flat().filter(tile => ! tile.hasMine).forEach(tile => tile.revealed = true)

    expect(ms.vm.displayClassicEmoji).toBe('😎')
  })

  test('anguished face is shown if the remaining uncovered tiles are under 5', () => {
    const ms = shallowMount(Minesweeper)

    ms.vm.tiles.flat().forEach(tile => tile.revealed = true)
    ms.vm.tiles[0][0].revealed = false

    expect(ms.vm.displayClassicEmoji).toBe('😧')
  })

  test('revealing a tile removes the flag', () => {
    const ms = shallowMount(Minesweeper)

    ms.vm.tiles[4][8].flagged = true

    ms.vm.reveal(4, 8)

    expect(ms.vm.tiles[4][8].flagged).toBeFalsy()
  })

  test('flagging a tile acts as a toggle', () => {
    const ms = shallowMount(Minesweeper)

    ms.vm.flag(4, 8)

    expect(ms.vm.tiles[4][8].flagged).toBeTruthy()

    ms.vm.flag(4, 8)

    expect(ms.vm.tiles[4][8].flagged).toBeFalsy()
  })

  test('Play again clicked, and game reset', () => {
    const ms = shallowMount(Minesweeper)

    ms.vm.reveal(4, 8)

    ms.vm.setGameOver()

    ms.vm.playAgain()

    expect(ms.vm.gameOver).toBeFalsy()
    
    expect(ms.vm.tiles[4][8].revealed).toBeFalsy()
  })
})
