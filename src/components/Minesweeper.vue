<template>
    <div class="container text-center xl:w-1/2 mt-4 mx-auto">
        <h2>Minesweeper game made with Vue</h2>
        <h1 class="text-4xl text-center">{{ displayClassicEmoji }}</h1>
        <button v-if="gameOver" v-on:click="playAgain" class="play-again-button">Play Again</button>
        <div class="mx-auto text-center mt-8">

            <div v-for="(tilesRow, indexRow) in tiles" :key="indexRow" class="board-container">
                <div v-for="(tile, index) in tilesRow" :key="index">
                    <tile
                            :x="tile.x"
                            :y="tile.y"
                            :hasMine="tile.hasMine"
                            :minesNear="tile.minesNear"
                            :gameOver="gameOver"
                            :winner="winner"
                            :revealed="tile.revealed"
                            :flagged="tile.flagged"
                            v-on:reveal="reveal"
                            v-on:game-over="setGameOver"
                            v-on:reveal-adjacent="revealAdjacentTiles"
                            v-on:flag="flag"
                    ></tile>
                </div>
                <div class="clearfix"></div>
            </div>


            <h2>
                <span class="float-left">Mines: {{ totalMines }}</span>
                <span class="float-right">Flags: {{ totalFlags }}</span>
            </h2>

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
        gameOver: false,
      }
    },
    methods: {
      prepareTiles () {
        let tiles = [...Array(10).keys()].map(y => {
          return [...Array(10).keys()].map(x => {
            return {
              x: y,
              y: x,
              hasMine: Math.floor(Math.random() * 7) === 6,
              minesNear: 0,
              revealed: false,
              flagged: false
            }
          })
        })

        tiles.forEach(tilesRow => {
          tilesRow.forEach(tile => {
            if (!tile.hasMine) {
              return
            }

            this.getViableAdjacentTiles(tile.x, tile.y).forEach(coords => {
              tiles[coords[0]][coords[1]].minesNear++
            })
          })
        })

        return tiles
      },
      getViableAdjacentTiles (x, y) {
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
        this.tiles[x][y].flagged = false
      },
      flag (x, y) {
        this.tiles[x][y].flagged = ! this.tiles[x][y].flagged
      },
      revealAdjacentTiles (x, y) {
        this.getViableAdjacentTiles(x, y).forEach(coords => {

          if (this.tiles[coords[0]][coords[1]].revealed) {
            return
          }

          this.reveal(coords[0], coords[1])

          if (this.tiles[coords[0]][coords[1]].minesNear === 0) {
            this.revealAdjacentTiles(coords[0], coords[1])
          }

        })
      },
      playAgain() {
        this.tiles = this.prepareTiles();
        this.gameOver = false;
      }
    },
    computed: {
      winner () {
        return this.tiles.flat().filter(tile => !tile.hasMine).filter(tile => !tile.revealed).length === 0
      },
      totalMines () {
        return this.tiles.flat().filter(tile => tile.hasMine).length
      },
      totalFlags () {
        return this.tiles.flat().filter(tile => tile.flagged).length
      },
      totalUnrevealed () {
        return this.tiles.flat().filter(tile => !tile.revealed && !tile.flagged).length
      },
      displayClassicEmoji () {
        if (this.gameOver) {
          return '😵'
        }

        if (this.winner) {
          return '😎'
        }

        if (this.totalUnrevealed <= 5) {
          return '😧'
        }

        return '🙂'
      }
    },
    created () {
      document.oncontextmenu = function () {
        return false
      }
    }
  }
</script>
