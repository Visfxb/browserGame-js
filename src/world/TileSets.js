export class Tilesets{
    tilesets = []
    constructor(tilseSize){
        this.tileSize = tilseSize
    }
    add(src, id, firstGid, count) {
        let img = new Image()
        img.src = src

        return new Promise(resolve => {
            img.onload = () => {
                this.tilesets.push({ img, id, firstGid, count })
                resolve()
            }
        })
    }
    getTilesetById(id){
        for (let i = 0; i < this.tilesets.length; i++)
            if (this.tilesets[i].id === id) return this.tilesets[i]
    }

    async init(json) {
        for (let i = 0; i < json.tilesets.length; i++) {
            const tileset = json.tilesets[i]
            const img = new Image()
            img.src = tileset.image

            await new Promise(res => img.onload = res)

            this.tilesets.push({
                id: i,
                image: img,
                firstgid: tileset.firstgid,
                count: tileset.tilecount,
                tilewidth: tileset.tilewidth,
                tileheight: tileset.tileheight,
                columns: tileset.columns
            })
        }
    }
    
    getTileset(gid) {
        for (let i = 0; i < this.tilesets.length; i++){
            let tileset = this.tilesets[i]
            if (tileset.firstgid <= gid && gid < tileset.firstgid + tileset.count)
                return tileset
        }
    }
    getTile(gid){
        if (gid === 0) return null

        let tileset = this.getTileset(gid)
        let localId = gid - tileset.firstgid

        let x = localId % tileset.columns
        let y = Math.floor(localId / tileset.columns)

        return {
            gid: gid,
            image: tileset.image,
            sx: x * tileset.tilewidth,
            sy: y * tileset.tileheight,
            width: tileset.tilewidth,
            height: tileset.tileheight,
            type: tileset.type,
            solid: tileset.solid
        }
    }
}