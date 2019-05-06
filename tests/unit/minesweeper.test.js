import { shallowMount } from '@vue/test-utils'
import Minesweeper from '@/components/Minesweeper.vue'

describe('Minesweeper.vue', () => {

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
    ms.vm.tiles.flat()[0].revealed = false

    expect(ms.vm.displayClassicEmoji).toBe('😧')
  })

})
