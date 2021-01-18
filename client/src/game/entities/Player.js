import Entity from "../../utils/Entity";

class Player extends Entity{
    inventory = [];

    attributes = {
        name: 'Player',
        ascii: '👨‍🎤',
        health: 10,
        offset: {x: -2, y: 3}
    }

    move(dx, dy) {
        if (this.attributes.health <= 0){
            return;
        }
        this.x += dx;
        this.y += dy;
    }

    add(item) {
        this.inventory.push(item);
    }

    copyPlayer() {
        let newPlayer = new Player();
        Object.assign(newPlayer, this);
        return newPlayer;
    }
}

export default Player;