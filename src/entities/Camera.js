export class Camera{ 
    constructor(viewRX, viewRY){ 
        this.x = 0 
        this.y = 0 // in tiles 
        this.width = viewRX * 2 + 1 
        this.height = viewRY * 2 + 1 
    } 
    follow(target) { 
        this.x = target.x - (this.width - 1) / 2 
        this.y = target.y - (this.height - 1) / 2 
    } 
    worldToScreen(worldX, worldY){ 
        return { 
            x: worldX - this.x, 
            y: worldY - this.y 
        } 
    } 
}