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


export class Player {
    constructor(x, y, tilesets, camera) {
        this.x = x
        this.y = y
        this.speed = 3 // tiles/sec
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
                ], 0.2),
                [Direction.LEFT]: new Animation([
                    tilesets.getTileByGid(24 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(25 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(26 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(27 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(28 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(29 + this.playerTileset.firstgid)
                ], 0.2),
                [Direction.RIGHT]: new Animation([
                    tilesets.getTileByGid(24 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(25 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(26 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(27 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(28 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(29 + this.playerTileset.firstgid)
                ], 0.2),
                [Direction.UP]: new Animation([
                    tilesets.getTileByGid(30 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(31 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(32 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(33 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(34 + this.playerTileset.firstgid),
                    tilesets.getTileByGid(35 + this.playerTileset.firstgid)
                ], 0.2)
            }
        }
        this.currentAnimation = this.animations.idle[this.direction]

        this.camera = camera
        this.camera.follow(this)
    }

    update(dt, input) {
        let moved = false

        if (input.isDown("KeyW")) {
            this.y -= this.speed * dt
            this.direction = Direction.UP
            moved = true
        }
        if (input.isDown("KeyS")) {
            this.y += this.speed * dt
            this.direction = Direction.DOWN
            moved = true
        }
        if (input.isDown("KeyA")) {
            this.x -= this.speed * dt
            this.direction = Direction.LEFT
            moved = true
        }
        if (input.isDown("KeyD")) {
            this.x += this.speed * dt
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
    }
}
