
export class Map{
    map = []

    constructor(ctx){
        this.ctx = ctx
        this.map = [
            [
                [[5, 0, 1], [0, 4, 3]], 
                [[5, 0, 1], [0, 5, 5]], 
                [[5, 0, 1], [0, 1, 2]], 
                [[5, 0, 1], [0, 1, 2]]
            ],

            [
                [[5, 0, 1], [0, 2, 1]], 
                [[0, 1, 1]], 
                [[1, 4, 1]], 
                [[1, 1, 2]]
            ],

            [
                [[5, 0, 1], [0, 2, 1]], 
                [[0, 1, 1]], 
                [[1, 2, 1]], 
                [[4, 3, 0]]
            ]
        ]
    }
    drawTile(img, tileIndexX, tileIndexY, toX, toY) {

        let tileSize = 16
        let newSize = 48    
        this.ctx.drawImage(
            img,
            tileIndexX * tileSize, tileIndexY * tileSize,
            tileSize, tileSize,
            toX * newSize, toY * newSize,
            newSize, newSize
        )
    }
    drawMap(tilesets){
        console.log(tilesets)
        for (let i = 0; i < this.map.length; i++){
            for (let j = 0; j < this.map[i].length; j++){
                for (let k = 0; k < this.map[i][j].length; k++){
                    let tile = this.map[i][j][k]
                    this.drawTile(tilesets.getTilesetById(tile[0]).image, tile[1], tile[2], j, i)
                }
            }
        }
    }
    async init(jsonMapSrc, tilesets){
        const res = await fetch(jsonMapSrc)
        let mapJson = await res.json()
        await tilesets.init(mapJson)

        let map = []
        let layers = mapJson.layers
        // for (let i = 0; i < layers.length; i++){ // layers
            for (let j = 0; j < layers[0].chunks.length; j++){ // chunks
                let chunk = layers[0].chunks[j]

                let tiles = []
                for (let h = 0; h < chunk.height; h++){ // rows
                    let row = []
                    for (let w = 0; w < chunk.width; w++){ // cols
                        let tileGid = chunk.data[h * chunk.height + w]
                        if (tilesets.getTile(tileGid) !== null)
                            row.push(new Tile(tilesets.getTile(tileGid)))
                    }
                    tiles.push(row)
                }

                map.push(new Chunk(tiles, chunk.x, chunk.y))
            } 
        // }
        console.log(map)
    }
}

export class Chunk {
    constructor(tiles, x, y) {
        this.x = x        // может быть отрицательным
        this.y = y
        this.tiles = tiles
    }
}

export class Tile {
    constructor({ gid, image, sx, sy, width, height }) {
        this.gid = gid
        this.image = image
        this.sx = sx
        this.sy = sy
        this.width = width
        this.height = height
    }
}
