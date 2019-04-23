<template>
    <div class="container text-center w-1/2 mt-4 mx-auto">
        <h1>Welcome to the classic minesweeper! 💣</h1>
        <div class="w-2/3 mx-auto text-center mt-8">
            <div v-for="(tile, index) in tiles" :key="index">
                <tile :x="tile.x" :y="tile.y" :mine="tile.mine" :gameOver="gameOver"></tile>
                <div class="clearfix" v-if="tile.x === 9"></div>
            </div>
        </div>
    </div>
</template>

<script>
  import Tile from './Tile.vue'

  export default {
    name: 'Minesweeper',
    components: {
      Tile
    },
    data () {
      return {
        tiles: this.prepareTiles(),
        gameOver: false
      }
    },
    methods: {
      prepareTiles() {
        return [...Array(10).keys()].map(y => {
          return [...Array(10).keys()].map(x => {
            return {
              x: x,
              y: y,
              mine: Math.floor(Math.random() * 7) === 6
            }
          })
        }).flat()
      },
      setGameOver() {
        this.gameOver = true;

        // Trigger the click in each of the tiles

      }
    },
    created() {
      document.oncontextmenu = function() { return false; };
    }
  }
</script>
