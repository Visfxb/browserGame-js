import { Map } from "./world/Map.js";
import { Tilesets } from "./world/TileSets.js";
import { Game } from "./core/Game.js";
import { World } from "./world/World.js";
import { Input } from "./core/Input.js";
import { Player } from "./entities/Player.js";
import { Camera } from "./entities/Camera.js";

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

let tilesets = new Tilesets()
let map = new Map()
await map.init("../src/assets/map.json", tilesets)

let camera = new Camera(8, 6)
let player = new Player(0, 0, tilesets, camera)

let game = new Game(
    ctx, 
    new World(map, player), 
    new Input()
)
game.start()
