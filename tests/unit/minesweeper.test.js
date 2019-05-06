import { shallowMount } from '@vue/test-utils'
import Minesweeper from '@/components/Minesweeper.vue'

describe('Minesweeper.vue', () => {

  // TODO: This test is not working, why? The code works in the browser
  // Maybe something related to this?
  // https://github.com/kulshekhar/ts-jest/issues/828
  test('dizzy face is shown if the game is over', () => {
    const ms = shallowMount(Minesweeper)

    ms.vm.setGameOver()
    expect(ms.vm.displayClassicEmoji).toBe('😵')
  })

})
