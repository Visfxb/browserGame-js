import { UIWindow } from "./UIWindow.js"
import { UIButton } from "../UIElements/UIButton.js"
import { UIText } from "../UIElements/UIText.js"

export class PauseMenu extends UIWindow {
    constructor(ctx, eventBus) {
        super(0, 0, ctx.canvas.width, ctx.canvas.height, "pause")
        this.modal = true
        this.eventBus = eventBus
        this.elements = [
            new UIButton(this, 20, 20, 100, 25, "Save", () => { eventBus.emit("pause:save-game") }),
            new UIButton(this, 20, 55, 100, 25, "Load", () => { eventBus.emit("pause:load-game") })
        ]
    }

    update(dt, input) {
        if (input.isPressed("Escape")){
            this.eventBus.emit("pause")
        }

        for (const elem of this.elements)
            elem.update(dt, input)
    }

    draw(ctx) {
        super.draw(ctx)

        for (const elem of this.elements)
            elem.draw(ctx)
    }
}
