import { Animation } from "./Animation.js";
import { Tile } from "../world/Map.js";

const Direction = {
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 3
}

const PlayerState = {
    IDLE: "idle",
    WALK: "walk"
}
const speed = 3 // tiles/sec

export class Player {
    constructor(x, y, tilesets, camera) {
        this.x = x
        this.y = y
        this.currentSpeed = speed
        this.playerTileset = tilesets.getTilesetByName("Player")

        this.direction = Direction.DOWN
        this.state = PlayerState.IDLE
        this.animations = {
            idle:{
                [Direction.DOWN]: new Animation([
                    tilesets.getTileByGid(0 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(1 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(2 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(3 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(4 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(5 + this.playerTileset.firstgid)
                ], 0.2),
                [Direction.LEFT]: new Animation([
                    tilesets.getTileByGid(6 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(7 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(8 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(9 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(10 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(11 + this.playerTileset.firstgid)
                ], 0.2),
                [Direction.RIGHT]: new Animation([
                    tilesets.getTileByGid(6 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(7 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(8 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(9 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(10 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(11 + this.playerTileset.firstgid)
                ], 0.2),
                [Direction.UP]: new Animation([
                    tilesets.getTileByGid(12 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(13 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(14 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(15 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(16 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(17 + this.playerTileset.firstgid)
                ], 0.2)
            },
            walk:{
                [Direction.DOWN]: new Animation([
                    tilesets.getTileByGid(18 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(19 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(20 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(21 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(22 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(23 + this.playerTileset.firstgid)
                ], 0.17 / (this.currentSpeed / speed)),
                [Direction.LEFT]: new Animation([
                    tilesets.getTileByGid(24 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(25 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(26 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(27 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(28 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(29 + this.playerTileset.firstgid)
                ], 0.17 / (this.currentSpeed / speed)),
                [Direction.RIGHT]: new Animation([
                    tilesets.getTileByGid(24 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(25 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(26 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(27 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(28 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(29 + this.playerTileset.firstgid)
                ], 0.17 / (this.currentSpeed / speed)),
                [Direction.UP]: new Animation([
                    tilesets.getTileByGid(30 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(31 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(32 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(33 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(34 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(35 + this.playerTileset.firstgid)
                ], 0.17 / (this.currentSpeed / speed))
            }
        }
        this.currentAnimation = this.animations.idle[this.direction]

        this.camera = camera
        this.camera.follow(this)

        this.hitbox = {
            // tiles
            x: 0.1,
            y: 0.3,
            width: 0.8,
            height: 0.7
        }

    }
    update(dt, input, map) {
        let moved = false
        
        if (input.isDown("ShiftLeft") || input.isDown("ShiftRight")) this.currentSpeed = speed * 1.5
        else this.currentSpeed = speed

        if (input.isDown("KeyW")) {
            this.tryMove(0, -this.currentSpeed * dt, map)
            this.direction = Direction.UP
            moved = true
        }
        if (input.isDown("KeyS")) {
            this.tryMove(0, this.currentSpeed * dt, map)
            this.direction = Direction.DOWN
            moved = true
        }
        if (input.isDown("KeyA")) {
            this.tryMove(-this.currentSpeed * dt, 0, map)
            this.direction = Direction.LEFT
            moved = true
        }
        if (input.isDown("KeyD")) {
            this.tryMove(this.currentSpeed * dt, 0, map)
            this.direction = Direction.RIGHT
            moved = true
        }

        this.state = moved ? PlayerState.WALK : PlayerState.IDLE

        const newAnim = this.animations[this.state][this.direction]
        if (this.currentAnimation !== newAnim) {
            this.currentAnimation = newAnim
            this.currentAnimation.reset()
        }

        this.currentAnimation.update(dt)
    }
    drawPlayer(ctx) { 
        const tile = new Tile(this.currentAnimation.currentFrame) 
        const tileSize = 16 
        const screenX = this.camera.worldToScreen(this.x, this.y).x * tileSize
        const screenY = this.camera.worldToScreen(this.x, this.y).y * tileSize

        ctx.save()
        ctx.translate(-tileSize / 2, -tileSize / 2)
        if (this.direction === Direction.LEFT){ 
            ctx.save() 
            ctx.translate(screenX + tile.width, screenY) 
            ctx.scale(-1, 1) 
            tile.drawTile(ctx, 0, 0) 
            ctx.restore() 
        } 
        else 
            tile.drawTile(ctx, screenX, screenY)

        ctx.restore()

        // ctx.fillStyle = "rgba(255, 0, 0, 0.4)"
        // ctx.fillRect(
        //     screenX + this.hitbox.x * 16,
        //     screenY + this.hitbox.y * 16,
        //     this.hitbox.width * 16,
        //     this.hitbox.height * 16
        // )
    }

    /** Checking collisions */
    getTouchedTiles(x, y, hitbox, map) {
        const left   = Math.floor(x + hitbox.x)
        const right  = Math.floor(x + hitbox.x + hitbox.width)
        const top    = Math.floor(y + hitbox.y)
        const bottom = Math.floor(y + hitbox.y + hitbox.height)

        const colliders = []

        for (let y = top; y <= bottom; y++) {
            for (let x = left; x <= right; x++) {
                if (map.getTileByXY(x, y) === null) return null

                const tile = map.getTileByXY(x, y)
                if (!tile || !tile.colliders || tile.colliders.length === 0) continue

                for (const collider of tile.colliders) {
                    colliders.push({
                        x: x + collider.x / tile.width,
                        y: y + collider.y / tile.height,
                        width: collider.width / tile.width,
                        height: collider.height / tile.height
                    })
                }
            }
        }

        return colliders
    }
    tryMove(dx, dy, map) {
        // x
        if (dx !== 0) {
            let blocked = false
            const nextX = this.x + dx
            const colliders = this.getTouchedTiles(
                nextX,
                this.y,
                this.hitbox,
                map
            )
            if (colliders !== null) {
                for (const collider of colliders) {
                    if (nextX + this.hitbox.x < collider.x + collider.width &&
                        nextX + this.hitbox.x + this.hitbox.width > collider.x &&
                        this.y + this.hitbox.y < collider.y + collider.height &&
                        this.y + this.hitbox.y + this.hitbox.height > collider.y) {
                        blocked = true
                        break
                    }
                }
            if (!blocked) this.x = nextX
            }
        }

        // y
        if (dy !== 0) {
            let blocked = false
            const nextY = this.y + dy
            const colliders = this.getTouchedTiles(
                this.x,
                nextY,
                this.hitbox,
                map
            )

            if (colliders !== null){
                for (const collider of colliders) {
                    if (this.x + this.hitbox.x < collider.x + collider.width &&
                        this.x + this.hitbox.x + this.hitbox.width > collider.x &&
                        nextY + this.hitbox.y < collider.y + collider.height &&
                        nextY + this.hitbox.y + this.hitbox.height > collider.y) {
                        blocked = true
                        break
                    }
                }
                if (!blocked) this.y = nextY
            }
        }
    }
    /** Save-load */
    serialize() {
        return {
            x: this.x,
            y: this.y,
            direction: this.direction,
            state: this.state
        }
    }
    deserialize(data) {
        this.x = data.x
        this.y = data.y
        this.direction = data.direction
        this.state = data.state
    }
}
