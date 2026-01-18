export class TileSets{
    tileSets = []
    constructor(tilseSize){
        this.tileSize = tilseSize
    }
    add(src, id) {
        let img = new Image()
        img.src = src

        return new Promise(resolve => {
            img.onload = () => {
                this.tileSets.push({ img, id })
                resolve()
            }
        })
    }
    getTileSetById(id){
        for (let i = 0; i < this.tileSets.length; i++)
            if (this.tileSets[i].id === id) return this.tileSets[i]
    }
}