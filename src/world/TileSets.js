export class Tilesets{
    tilesets = []

    async init(json) {
        for (let i = 0; i < json.tilesets.length; i++) {
            const tileset = json.tilesets[i]
            const img = new Image()
            img.src = tileset.image

            await new Promise(res => img.onload = res)

            this.tilesets.push({
                name: tileset.name,
                image: img,
                firstgid: tileset.firstgid,
                tilecount: tileset.tilecount,
                tilewidth: tileset.tilewidth,
                tileheight: tileset.tileheight,
                columns: tileset.columns,
                tiles: tileset.tiles
            })
        }
    }
    getTilesetByGid(gid) {
        for (let i = 0; i < this.tilesets.length; i++){
            let tileset = this.tilesets[i]
            if (tileset.firstgid <= gid && gid < tileset.firstgid + tileset.tilecount)
                return tileset
        }
    }
    getTileByGid(gid){
        if (gid === 0) return null

        let tileset = this.getTilesetByGid(gid)
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
            solid: tileset.solid,
            colliders: this.colliders = tileset.tiles?.find((element) => element?.id === localId)?.objectgroup?.objects || []
        }
    }
    getTilesetByName(name){
        for (let i = 0; i < this.tilesets.length; i++)
            if (this.tilesets[i].name === name)
                return this.tilesets[i]
    }
}