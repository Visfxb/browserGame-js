import { Map } from "./world/Map.js";
import { TileSets } from "./world/TileSets.js";

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
ctx.imageSmoothingEnabled = false

let tileSets = new TileSets(16)
await tileSets.add("src/assets/Tiles/Cliff.png", 0)
await tileSets.add("src/assets/Tiles/Cliff-Water.png", 1)
await tileSets.add("src/assets/Tiles/TexturedGrass.png", 2)
await tileSets.add("src/assets/Tiles/Shore.png", 3)

let map = new Map(ctx)
map.drawMap(tileSets)