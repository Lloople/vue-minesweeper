import Vue from 'vue'
import Minesweeper from './components/Minesweeper.vue'

import './assets/styles.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(Minesweeper)
}).$mount('#app')
