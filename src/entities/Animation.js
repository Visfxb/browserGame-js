export class Animation {
    constructor(frames, frameTime) {
        this.frames = frames
        this.frameTime = frameTime
        this.timer = 0
        this.index = 0
    }

    update(dt) {
        this.timer += dt
        if (this.timer >= this.frameTime) {
            this.timer = 0
            this.index = (this.index + 1) % this.frames.length
        }
    }

    reset() {
        this.timer = 0
        this.index = 0
    }

    get currentFrame() {
        return this.frames[this.index]
    }
}
