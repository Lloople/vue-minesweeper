<template>
    <div class="tile" :class="{ revealed : revealed }" v-on:click="cleanOrExplode">
        <span v-if="mine && gameOver">💥</span>
        <span v-if="flagged">🚩</span>
        <span :class="coloredCounter" v-if="nearMinesCounter !== null">{{ nearMinesCounter }}</span>
    </div>
</template>

<script>
  export default {
    name: 'Tile',
    props: {
      x: Number,
      y: Number,
      mine: Boolean,
      gameOver: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        revealed: false,
        flagged: false,
        nearMinesCounter: null
      }
    },
    methods: {
      cleanOrExplode() {
        if (this.mine) {
          // emit an event to tell it's gameOver
          return;
        }

        this.revealed = true;

        // this.nearMinesCounter = parentComponent.revealTile(x, y);
        // 👆 parent component should reveal adjacent tiles until a bomb is found 🤔.
        // This looks like the most tricky part
        this.nearMinesCounter = 1;
      }
    },
    computed: {
        coloredCounter() {
          if (! this.nearMinesCounter) {
            return '';
          }

          if (this.nearMinesCounter <= 2) {
            return 'text-blue';
          }

          if (this.nearMinesCounter <= 4) {
            return 'text-red';
          }

          return 'text-black';
        }
    },
    created() {
        // Finish this as I don't know if it's working or not
        window.addEventListener('mousedown', e => {
          if (e.keyCode === 3) {
            alert("Right click!");
          }
        });
    }
  }
</script>
