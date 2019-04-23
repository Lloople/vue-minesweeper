<template>
    <div class="tile" :class="{ revealed : revealed }" v-on:contextmenu="flag" v-on:click="cleanOrExplode">
        <span v-if="hasMine && gameOver">💥</span>
        <span v-if="flagged && ! revealed">🚩</span>
        <span v-if="hasMine && winner">💣</span>
        <span :class="coloredCounter" v-if="revealed && minesNear > 0">{{ minesNear }}</span>

        <!--<span v-if="mine">💣</span>-->
        <!--<span :class="coloredCounter" v-if="! mine && minesNear > 0">{{ minesNear}}</span>-->
    </div>
</template>

<script>
  export default {
    name: 'Tile',
    props: {
      x: Number,
      y: Number,
      minesNear: Number,
      hasMine: Boolean,
      gameOver: Boolean,
      winner: Boolean,
      revealed: Boolean,
    },
    data () {
      return {
        flagged: false
      }
    },
    methods: {
      cleanOrExplode () {
        if (this.gameOver) {
          return;
        }

        if (this.hasMine) {
          this.$emit('game-over')
          return
        }

        this.$emit('reveal', this.x, this.y);

        if (this.minesNear === 0) {
          this.$emit('reveal-colindant', this.x, this.y);
        }
      },
      flag() {
        this.flagged = true;
      }
    },
    computed: {
      coloredCounter () {
        if (!this.minesNear) {
          return ''
        }

        if (this.minesNear <= 2) {
          return 'text-blue'
        }

        if (this.minesNear <= 4) {
          return 'text-red'
        }

        return 'text-black'
      }
    }
  }
</script>
