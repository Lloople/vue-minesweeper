<template>
    <div class="container text-center w-1/2 mt-4 mx-auto">
        <h1>Welcome to the classic minesweeper! 💣</h1>
        <div class="w-2/3 mx-auto text-center mt-8">
            <div v-for="(tilesRow, indexRow) in tiles" :key="indexRow">
                <div v-for="(tile, index) in tilesRow" :key="index">
                    <tile
                            :x="tile.x"
                            :y="tile.y"
                            :mine="tile.mine"
                            :minesNear="tile.minesNear"
                            :gameOver="gameOver"
                            :winner="winner"
                            :revealed="tile.revealed"
                            v-on:reveal="reveal"
                            v-on:game-over="setGameOver"
                            v-on:reveal-colindant="revealColindantTiles"
                    ></tile>
                </div>
                <div class="clearfix"></div>
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
      prepareTiles () {
        let tiles = [...Array(10).keys()].map(y => {
          return [...Array(10).keys()].map(x => {
            let tile = {
              x: y,
              y: x,
              mine: Math.floor(Math.random() * 7) === 6,
              minesNear: 0,
              revealed: false
            }

            return tile
          })
        })

        tiles.forEach(tilesRow => {
          tilesRow.forEach(tile => {
            if (!tile.mine) {
              return
            }

            this.getViableColindantTiles(tile.x, tile.y).forEach(coords => {
              tiles[coords[0]][coords[1]].minesNear++
            })
          })
        })

        return tiles
      },
      getViableColindantTiles (x, y) {
        return [
          [x - 1, y - 1],
          [x, y - 1],
          [x + 1, y - 1],
          [x - 1, y],
          [x + 1, y],
          [x - 1, y + 1],
          [x, y + 1],
          [x + 1, y + 1],
        ].filter(coords => {
          return coords[0] >= 0 && coords[1] >= 0 && coords[0] < 10 && coords[1] < 10
        })
      },
      setGameOver () {
        this.gameOver = true
      },
      reveal (x, y) {
        this.tiles[x][y].revealed = true
      },
      revealColindantTiles (x, y) {
        this.getViableColindantTiles(x, y).forEach(coords => {

          this.reveal(coords[0], coords[1])

        })
      }
    },
    computed: {
      winner () {
        return this.tiles.flat().filter(tile => !tile.mine).filter(tile => !tile.revealed).length === 0
      }
    },
    created () {
      document.oncontextmenu = function () {
        return false
      }
    }
  }
</script>
