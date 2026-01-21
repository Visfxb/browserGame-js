export class World{
    entities = []
    constructor(map, player){
        this.map = map
        this.player = player
    }
    addEntity(...entities){
        entities.push(...entities)
    }
    update(dt, input){
        this.player.update(dt, input)
        this.player.camera.follow(this.player)

        for (const entity of this.entities)
            entity.update()
    }
    drawWorld(ctx){
        let buffer = document.createElement("canvas")
        buffer.width = this.player.camera.width * this.map.tileSize
        buffer.height = this.player.camera.height * this.map.tileSize
        const bctx = buffer.getContext("2d")
        bctx.imageSmoothingEnabled = false
        
        this.map.drawMap(bctx, this.player.camera)

        ctx.drawImage(
            buffer,
            0, 0,
            buffer.width, buffer.height,
            0, 0,
            buffer.width, buffer.height
        )
        this.player.drawPlayer(ctx)

        for (const entitiy of this.entities)
            this.entitiy.draw()
    }
}