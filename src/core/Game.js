import { SCALE } from "../main.js"

export class Game {
    constructor(ctx, world, input, ui) {
        this.ctx = ctx
        this.world = world
        this.input = input
        this.ui = ui

        this.isPaused = false
    }

    start() {
        this.lastTime = 0
        requestAnimationFrame(this.loop.bind(this))
    }

    loop(time) {
        const delta = (time - this.lastTime) / 1000
        this.lastTime = time

        this.ctx.clearRect(0, 0, canvas.width, canvas.height)
        this.update(delta)
        this.render()

        requestAnimationFrame(this.loop.bind(this))
    }

    update(dt) {
        if (!this.isPaused)
            this.world.update(dt, this.input)

        this.ui.update(dt, this.input)
        this.input.update()
    }

    render() {
        this.ctx.save()
        this.ctx.scale(SCALE, SCALE)
        this.world.drawWorld(this.ctx)
        this.ctx.restore()
        this.ui.draw(this.ctx)
    }

    /** Save-load */
    serialize() {
        return {
            world: this.world.serialize()
        }
    }
    deserialize(data) {
        this.world.deserialize(data.world)
    }
}
