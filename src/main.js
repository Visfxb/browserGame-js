import { Map } from "./world/Map.js";
import { Tilesets } from "./world/TileSets.js";
import { Game } from "./core/Game.js";
import { World } from "./world/World.js";
import { Input } from "./core/Input.js";
import { Player } from "./entities/Player.js";
import { Camera } from "./entities/Camera.js";
import { EventBus } from "./core/EventBus.js";
import { UIManager, initEvents } from "./ui/UIManager.js";
import { PauseMenu } from "./UI/UIWindow/PauseMenu.js";

export const SCALE = 2
const TILE_SIZE = 16

/** Init cxt */
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

/** Init map */
let tilesets = new Tilesets()
let map = new Map()
await map.init("../src/assets/map.json", tilesets)
// console.log(map.getTileByXY(-42, -11))
/** Init player */
let camera = new Camera(10, 7)
let player = new Player(-37, -11, tilesets, camera)

/** Canvas settings */
canvas.width  = camera.width  * TILE_SIZE * SCALE
canvas.height = camera.height * TILE_SIZE * SCALE
ctx.imageSmoothingEnabled = false

/** Init UI */
let eventBus = new EventBus()
let ui = new UIManager()
ui.register(new PauseMenu(ctx, eventBus))

/** Init game and events */
let game = new Game(
    ctx, 
    new World(map, player), 
    new Input(),
    ui
)
initEvents(ui, game, eventBus)

game.start()
