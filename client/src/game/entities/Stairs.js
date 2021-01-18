import Entity from "../../utils/Entity";
import Spawner from "../../utils/Spawner";

class Stairs extends Entity {
    attributes = {
        name: 'Stairs',
        color: 'black',
        ascii: '🚩',
        offset: {x:-2, y:2}
    }

    action(verb, room) {
        if(verb === 'bump') {
            room.addToHistory('You move down the stairs...');
            room.createCellularMap();
            room.player.x = 0;
            room.player.y = 0;
            room.moveToSpace(room.player);
            room.entities = room.entities.filter(e => e === room.player);
            let spawner = new Spawner(room);
            spawner.spawnLoot(10);
            spawner.spawnMonsters(6);
            spawner.spawnStairs();
        }
    }
}

export default Stairs;