import { UIElement } from "./UIElement.js"

export class UIText extends UIElement {
    constructor(parent, x, y, text) {
        super(parent, x, y, 0, 0)
        this.text = text
    }

    draw(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "16px monospace"
        ctx.textAlign = "left"
        ctx.textBaseline = "top"

        ctx.fillText(this.text, this.screenX, this.screenY)
    }
}
