export class UIWindow {
    constructor(x, y, w, h, id) {
        this.x = x
        this.y = y
        this.width = w
        this.height = h
        this.id = id

        this.ui = null
        this.visible = false
        this.modal = false
    }

    open() {
        this.visible = true
    }

    close() {
        this.visible = false
    }

    toggle() {
        this.visible = !this.visible
    }

    update(dt) {}

    draw(ctx) {
        ctx.fillStyle = "rgba(0,0,0,0.85)"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    contains(px, py) {
        return (
            px >= this.x &&
            px <= this.x + this.width &&
            py >= this.y &&
            py <= this.y + this.height
        )
    }
}
