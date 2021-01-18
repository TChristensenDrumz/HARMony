import Entity from "../../utils/Entity";

class Loot extends Entity {
    action(verb, room) {
        if(verb === 'bump') {
            console.log('Pickup',this);
            room.player.add(this);
            room.remove(this)
        }
        if(verb === 'drop') {
            console.log('Drop',this);
        }
    }
}

export default Loot;