export class Player {
    constructor(x, y){
        this.x = x
        this.y = y
        this.speed = 3 // tiles/sec
    }
    update(dt, input){
        if (input.isDown("KeyW")) this.y -= this.speed * dt
        if (input.isDown("KeyS")) this.y += this.speed * dt
        if (input.isDown("KeyA")) this.x -= this.speed * dt
        if (input.isDown("KeyD")) this.x += this.speed * dt
    }
    drawPlayer(ctx){
        let tileSize = 16
        let scale = 2
        let minNegChunkX = 48
        let minNegChunkY = 16
        const worldX = (this.x + minNegChunkX) * tileSize * scale
        const worldY = (this.y + minNegChunkY) * tileSize * scale
        
        ctx.fillStyle = "red"
        ctx.fillRect(worldX, worldY, tileSize * scale, tileSize * scale)
    }
}