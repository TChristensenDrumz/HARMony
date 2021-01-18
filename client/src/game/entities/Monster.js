import Entity from "../../utils/Entity";

class Monster extends Entity {
    action(verb, room) {
        if(verb === 'bump') {
            room.addToHistory(`Player attacks ${this.attributes.name}!`);
            this.attributes.health = this.attributes.health - 1;
            if(this.attributes.health <= 0) {
                room.addToHistory(`${this.attributes.name} dies!`);
                room.remove(this);
            }
            else {
                room.addToHistory(`${this.attributes.name}'s health = ${this.attributes.health}`);
                room.player.attributes.health = room.player.attributes.health - 1;
                if(room.player.attributes.health <= 0) {
                    room.addToHistory('You have died!');
                    room.player.attributes.ascii = '💀';
                }
                else {
                    room.addToHistory(`You have ${room.player.attributes.health} health`);
                }
            }
        }
    }
}

export default Monster;