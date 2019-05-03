import { shallowMount } from '@vue/test-utils'
import Tile from '@/components/Tile.vue'

describe('Tile.vue', () => {

  test('it shows nothing by default', () => {
    const tile = shallowMount(Tile)

    expect(tile.text()).toBe('')
  })

  test('it shows the near mines counter if it\s revealed', () => {
    const tile = shallowMount(Tile)

    tile.setProps({ minesNear: 4 })
    expect(tile.text()).not.toBe('4')

    tile.setProps({ revealed: true })
    expect(tile.text()).toBe('4')

  })

  test('it shows the flag if it\'s marked', () => {
    const tile = shallowMount(Tile)

    tile.setProps({ flagged: true })
    expect(tile.text()).toBe('🚩')

    tile.setProps({ winner: true })
    expect(tile.text()).not.toBe('🚩')
  })

  test('it shows the bomb when game ends', () => {
    const tile = shallowMount(Tile)

    tile.setProps({ hasMine: true })
    expect(tile.text()).not.toBe('💣')

    tile.setProps({ winner: true })
    expect(tile.text()).toBe('💣')
  })

  test('it shows the explosion when game is over', () => {
    const tile = shallowMount(Tile)

    tile.setProps({ hasMine: true })
    expect(tile.text()).not.toBe('💥')

    tile.setProps({ gameOver: true })
    expect(tile.text()).toBe('💥')
  })

  test('can determine the correct class', () => {
    const tile = shallowMount(Tile)

    tile.setProps({ minesNear: 0 })
    expect(tile.vm.coloredCounter).toBe('')

    tile.setProps({ minesNear: 2 })
    expect(tile.vm.coloredCounter).toBe('text-blue')

    tile.setProps({ minesNear: 3 })
    expect(tile.vm.coloredCounter).toBe('text-red')

    tile.setProps({ minesNear: 8 })
    expect(tile.vm.coloredCounter).toBe('text-black')
  })

  test('fires the flag event when right-clicked', () => {
    const tile = shallowMount(Tile)
    tile.setProps({ x: 4, y: 8 })

    tile.trigger('contextmenu')
    expect(tile.emitted('flag')[0]).toEqual([4, 8])
  })

  test('fires the revealed event when left-clicked', () => {
    const tile = shallowMount(Tile)
    tile.setProps({ x: 4, y: 8 })

    tile.trigger('click')
    expect(tile.emitted('reveal')[0]).toEqual([4, 8])
  })

  test('fires the game over event when left-clicked and containing a mine', () => {
    const tile = shallowMount(Tile)
    tile.setProps({ hasMine: true })

    tile.trigger('click')
    expect(tile.emitted('game-over')[0]).toBeTruthy()
    expect(tile.emitted('reveal')).toBeFalsy()
  })

  test('fires the reveal-adjacent event when left-clicked and is clean', () => {
    const tile = shallowMount(Tile)
    tile.setProps({ x: 4, y: 8, minesNear: 0 })

    tile.trigger('click')
    expect(tile.emitted('reveal')).toBeTruthy()
    expect(tile.emitted('reveal-adjacent')[0]).toEqual([4, 8])
  })

  test('cannot trigger again if the game is finished', () => {
    const tile = shallowMount(Tile)

    tile.setProps({ gameOver: true })

    tile.trigger('click')
    expect(tile.emitted('game-over')).toBeFalsy()
    expect(tile.emitted('reveal')).toBeFalsy()
    expect(tile.emitted('reveal-adjacent')).toBeFalsy()

    tile.setProps({ gameOver: false, winner: true })

    tile.trigger('click')
    expect(tile.emitted('game-over')).toBeFalsy()
    expect(tile.emitted('reveal')).toBeFalsy()
    expect(tile.emitted('reveal-adjacent')).toBeFalsy()
  })
})
