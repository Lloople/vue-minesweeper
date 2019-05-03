import { shallowMount } from '@vue/test-utils'
import Tile from '@/components/Tile.vue'

describe('Tile.vue', () => {

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
})
