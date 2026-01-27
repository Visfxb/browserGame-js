import { UIElement } from "./UIElement.js"

export class UIButton extends UIElement {
    constructor(parent, x, y, width, height, text, onClick) {
        super(parent, x, y, width, height)

        this.text = text
        this.onClick = onClick
        this.hover = false
    }

    update(dt, input) {
        const mx = input.mouseX
        const my = input.mouseY

        this.hover = this.containsPoint(mx, my)

        if (this.hover && input.mousePressed) {
            this.onClick()
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.hover ? "#666" : "#444"
        ctx.fillRect(this.screenX, this.screenY, this.width, this.height)

        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = "16px monospace"

        ctx.fillText(
            this.text,
            this.screenX + this.width / 2,
            this.screenY + this.height / 2
        )
    }
}
