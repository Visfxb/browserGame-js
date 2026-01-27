export class EventBus {
    constructor() {
        this.listeners = {}
    }

    on(event, callback) {
        (this.listeners[event] ??= []).push(callback)
    }

    emit(event, data) {
        for (const cb of this.listeners[event] ?? [])
            cb(data)
    }
}
    