export class Input {
    keys = {}
    pressed = {}

    constructor(eventBus) {
        this.eventBus = eventBus

        this.mouseX = 0
        this.mouseY = 0

        this.mouseDown = false
        this.mousePressed = false

        /** Keyboard events */
        window.addEventListener("keydown", e => {
            if (!this.keys[e.code]) {
                this.pressed[e.code] = true
            }
            this.keys[e.code] = true
        })
        window.addEventListener("keyup", e => {
            this.keys[e.code] = false
        })
        /** Mouse events */
        canvas.addEventListener("mousemove", e => {
            const rect = canvas.getBoundingClientRect()
            this.mouseX = e.clientX - rect.left
            this.mouseY = e.clientY - rect.top
        })

        canvas.addEventListener("mousedown", () => {
            this.mouseDown = true
            this.mousePressed = true
        })

        canvas.addEventListener("mouseup", () => {
            this.mouseDown = false
        })
    }

    isDown(key) {
        return !!this.keys[key]
    }

    isPressed(key) {
        if (this.pressed[key]) {
            this.pressed[key] = false
            return true
        }
        return false
    }

    update() {
        this.mousePressed = false
    }
}
