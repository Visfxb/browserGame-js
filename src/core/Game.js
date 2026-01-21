export class Game {
    constructor(ctx, world, input) {
        this.ctx = ctx
        this.world = world
        this.input = input
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
        this.world.update(dt, this.input)
    }

    render() {
        this.ctx.save()
        this.ctx.translate(64, 64)
        this.ctx.scale(2, 2)
        this.world.drawWorld(this.ctx)
        this.ctx.restore()
    }
}
