export class UIElement {
    constructor(parent, x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.visible = true
        this.parent = parent // UIWindow
    }

    get screenX() {
        return this.parent.x + this.x
    }

    get screenY() {
        return this.parent.y + this.y
    }

    update(dt, input) {}

    draw(ctx) {}

    containsPoint(px, py) {
        return (
            px >= this.screenX &&
            px <= this.screenX + this.width &&
            py >= this.screenY &&
            py <= this.screenY + this.height
        )
    }
}
