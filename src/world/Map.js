
export class Map{
    map = []

    constructor(ctx){
        this.ctx = ctx
        this.map = [
            [
                [[2, 0, 1], [0, 4, 3]], 
                [[2, 0, 1], [0, 5, 5]], 
                [[2, 0, 1], [0, 1, 2]], 
                [[2, 0, 1], [0, 1, 2]]
            ],

            [
                [[2, 0, 1], [0, 2, 1]], 
                [[0, 1, 1]], 
                [[1, 4, 1]], 
                [[1, 1, 2]]
            ],

            [
                [[2, 0, 1], [0, 2, 1]], 
                [[0, 1, 1]], 
                [[1, 2, 1]], 
                [[3, 3, 0]]
            ]
        ]
    }
    drawTile(img, tileSize, tileIndexX, tileIndexY, toX, toY) {    
        let newSize = 48    
        this.ctx.drawImage(
            img,
            tileIndexX * tileSize, tileIndexY * tileSize,
            tileSize, tileSize,
            toX * newSize, toY * newSize,
            newSize, newSize
        )
    }
    drawMap(tileSets){
        for (let i = 0; i < this.map.length; i++){
            for (let j = 0; j < this.map[i].length; j++){
                for (let k = 0; k < this.map[i][j].length; k++){
                    let tile = this.map[i][j][k]
                    this.drawTile(tileSets.getTileSetById(tile[0]).img, tileSets.tileSize, tile[1], tile[2], j, i)
                }
            }
        }
    }
}