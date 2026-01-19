import { Map } from "./world/Map.js";
import { Tilesets } from "./world/TileSets.js";

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

let tilesets = new Tilesets()

let map = new Map(ctx)
await map.init("src/assets/mapWithLayers.json", tilesets)

map.drawMap()