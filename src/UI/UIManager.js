import { EventBus } from "../core/EventBus.js"

export class UIManager {
    constructor() {
        this.windows = new Map() // not world
        this.events = new EventBus()
    }

    register(window) {
        this.windows.set(window.id, window)
        window.ui = this
    }

    open(id) {
        this.windows.get(id)?.open()
    }

    close(id) {
        this.windows.get(id)?.close()
    }

    emit(event, data) {
        this.events.emit(event, data)
    }

    on(event, callback) {
        this.events.on(event, callback)
    }
    update(dt, input){
        for (let window of this.windows.values())
            window.update(dt, input)
    }
    draw(ctx){
        for (let window of this.windows.values())
            if (window.visible)
                window.draw(ctx)
    }
}

export function initEvents(ui, game, eventBus){
    eventBus.on("pause", () => {
        game.isPaused = !game.isPaused

        if (game.isPaused)
            ui.open("pause")
        else
            ui.close("pause")
    })

    eventBus.on("pause:save-game", () => {
        const saveData = game.serialize()
        localStorage.setItem("gameSave", JSON.stringify(saveData))
        alert("Game saved")
    })

    eventBus.on("pause:load-game", () => {
        const raw = localStorage.getItem("gameSave")
        if (!raw) return

        const saveData = JSON.parse(raw)
        game.deserialize(saveData)

        alert("Game loaded")
    })
}