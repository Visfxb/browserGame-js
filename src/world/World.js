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
        for (const entity of this.entities)
            entity.update()
    }
    drawWorld(ctx){
        this.map.drawMap(ctx)
        this.player.drawPlayer(ctx)

        for (const entitiy of this.entities)
            this.entitiy.draw()
    }
}