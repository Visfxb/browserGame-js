export class Map{
    chunks = []

    async init(jsonMapSrc, tilesets){
        const res = await fetch(jsonMapSrc)
        const mapJson = await res.json()
        await tilesets.init(mapJson)

        this.tileSize = mapJson.tilewidth
        const layers = mapJson.layers

        for (let layerIndex = 0; layerIndex < layers.length; layerIndex++){

            const layer = layers[layerIndex]
            for (const chunk of layer.chunks){

                let chunkIndex = this.chunks.findIndex(c => c.x === chunk.x && c.y === chunk.y)

                // First layer
                if (layerIndex === 0){
                    const tiles = []
                    for (let y = 0; y < chunk.height; y++){
                        const row = []
                        for (let x = 0; x < chunk.width; x++){
                            const gid = chunk.data[y * chunk.width + x]
                            const tile = tilesets.getTileByGid(gid)
                            row.push(tile ? new Tile(tile) : null)
                        }
                        tiles.push(row)
                    }

                    this.chunks.push(new Chunk(tiles, chunk.x, chunk.y))
                }

                // Upper layer
                else{
                    const targetChunk = this.chunks[chunkIndex]

                    for (let y = 0; y < chunk.height; y++){
                        for (let x = 0; x < chunk.width; x++){

                            const gid = chunk.data[y * chunk.width + x]
                            if (gid === 0) continue

                            const tile = new Tile(tilesets.getTileByGid(gid))
                            const baseTile = targetChunk.tiles[y][x]

                            if (baseTile === null)
                                targetChunk.tiles[y][x] = tile
                            else
                                baseTile.addNextLayer(tile)
                        }
                    }
                }
            }
        }
    }


    drawMap(ctx, camera) {
        for (const chunk of this.chunks) { 
            for (let y = 0; y < chunk.tiles.length; y++) { 
                for (let x = 0; x < chunk.tiles[y].length; x++) { 

                    const tile = chunk.tiles[y][x] 
                    if (!tile) continue

                    const worldX = chunk.x + x 
                    const worldY = chunk.y + y 
                    if (worldX + 1 <= camera.x || worldX >= camera.x + camera.width || 
                        worldY + 1 <= camera.y || worldY >= camera.y + camera.height) 
                        continue 
                    
                    const screenX = camera.worldToScreen(worldX, worldY).x
                    const screenY = camera.worldToScreen(worldX, worldY).y

                    tile.drawTile(ctx, screenX * tile.width, screenY * tile.height) 
                } 
            } 
        }
    }
}

export class Chunk {
    constructor(tiles, x, y) {
        // Can be negative
        this.x = x        
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
        this.upperTile = null
    }
    addNextLayer(upperTile){
        this.upperTile = upperTile
    }
    drawTile(ctx, x, y){
        ctx.drawImage(
            this.image,
            this.sx,
            this.sy,
            this.width,
            this.height,
            x,
            y,
            this.width,
            this.height
        )
        // ctx.strokeRect(x, y, this.width, this.height)
        if (this.upperTile !== null)
            this.upperTile.drawTile(ctx, x, y)
    }
}
