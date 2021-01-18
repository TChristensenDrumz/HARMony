import {Map} from "rot-js";
import Player from "./entities/Player";

class Room {
    constructor(width , height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.entities = [new Player(0, 0, 16)];
        this.history = ['You entered the dungeon', '---'];

        this.map = new Array(this.width);
        for(let x = 0; x < this.width; x++) {
            this.map[x] = new Array(this,height);
        }
    }

    get player() {
        return this.entities[0];
    }

    add(entity) {
        this.entities.push(entity);
    }

    remove(entity) {
        this.entities = this.entities.filter(e => e !== entity);
    }

    moveToSpace(entity) {
        for (let x = entity.x; x < this.width; x++) {
            for (let y = entity.y; y < this.height; y++) {
                if(this.map[x][y] === 0 && !this.getEntityAtLocation(x, y)) {
                    entity.x = x;
                    entity.y = y;
                    return;
                }
            }
        }
    }

    isWall(x, y) {
        return (
            this.map[x] === undefined || 
            this.map[y] === undefined || 
            this.map[x][y] === 1
        );
    }

    getEntityAtLocation(x, y) {
        return this.entities.find(entity => entity.x === x && entity.y === y);
    }

    movePlayer(dx, dy) {
        let tempPlayer = this.player.copyPlayer();
        tempPlayer.move(dx, dy);
        let entity = this.getEntityAtLocation(tempPlayer.x, tempPlayer.y);
        if(entity) {
            console.log(entity);
            entity.action('bump',this);
            return;
        }

        if (this.isWall(tempPlayer.x, tempPlayer.y)) {
            console.log(`Way blocked at ${tempPlayer.x}:${tempPlayer.y}!`);
        }
        else {
            this.player.move(dx, dy);
        }
    }

    createCellularMap() {
        let newMap = new Map.Cellular(this.width, this.height, { connected: true });
        newMap.randomize(0.5);
        let userCallback = (x, y, value) => {
            if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
                this.map[x][y] = 1;
                return;
            }
            this.map[x][y] = value === 0 ? 1 : 0;
        };
        newMap.create(userCallback);
        newMap.connect(userCallback, 1);
    }

    draw(context) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (this.map[x][y] === 1) this.drawWall(context, x, y);
            }
        }
        this.entities.forEach(entity => {
            entity.draw(context);
        })
    }

    drawWall(context, x, y) {
        context.fillStyle = '#000';
        context.fillRect(
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
        );
    }

    addToHistory(history) {
        this.history.push(history);
        if(this.history.length > 6) {
            this.history.shift();
        }
    }
}

export default Room;