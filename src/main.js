import { Map } from "./world/Map.js";
import { Tilesets } from "./world/TileSets.js";
import { Game } from "./core/Game.js";
import { World } from "./world/World.js";
import { Input } from "./core/Input.js";
import { Player } from "./entities/Player.js";


let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

let tilesets = new Tilesets()
let map = new Map()
await map.init("../src/assets/map.json", tilesets)

let player = new Player(0, 0, tilesets)
let world = new World(map, player)
let input = new Input()

let game = new Game(ctx, world, input)
game.start()
