import Loot from "../game/entities/Loot";
import Monster from "../game/entities/Monster";
import Stairs from "../game/entities/Stairs";

const lootTable = [
    {
        name: 'Long Sword',
        color: 'darkgrey',
        ascii: '⚔️',
        offset: {x: -3, y: 3}
    },
    {
        name: 'Health Potion',
        color: 'red',
        ascii: '❤️',
        offset: {x: -3, y: 3}
    },
    {
        name: 'Coin',
        color: 'yellow',
        ascii: '💰',
        offset: {x: -2, y: 3}
    },
    {
        name: 'Light Armor',
        color: 'lightgrey',
        ascii: '🛡️',
        offset: {x: -1, y: 3}
    }
];

const monsterTable = [
    {
        name: 'Ogre',
        color: 'lightgrey',
        ascii: '👹',
        offset: {x: -3, y: 3},
        health: 6
    },
    {
        name: 'Kobold',
        color: 'green',
        ascii: '🐊',
        offset: {x: -3, y: 3},
        health: 3
    },
    {
        name: 'Slime',
        color: 'darkgreen',
        ascii: '🦠',
        offset: {x: -3, y: 2},
        health: 2
    },
    {
        name: 'Dragon',
        color: 'red',
        ascii: '🐉',
        offset: {x: -3, y: 3},
        health: 10
    }
]

class Spawner {
    constructor(map) {
        this.map = map;
    }

    spawn(spawnCount, createEntity) {
        for (let count = 0; count < spawnCount; count++) {
            let entity = createEntity();
            this.map.add(entity);
            this.map.moveToSpace(entity);
        }
    }

    spawnLoot(spawnCount) {
        this.spawn(spawnCount, () => {
            return new Loot(
                getRandomInt(this.map.width - 1), 
                getRandomInt(this.map.height - 1), 
                this.map.tileSize, 
                lootTable[getRandomInt(lootTable.length)]
            );
        });
    }

    spawnMonsters(spawnCount) {
        this.spawn(spawnCount, () => {
            return new Monster(
                getRandomInt(this.map.width - 1), 
                getRandomInt(this.map.height - 1), 
                this.map.tileSize, 
                monsterTable[getRandomInt(monsterTable.length)]
            );
        });
    }

    spawnStairs() {
        this.spawn(1, () => {
            return new Stairs(
                this.map.width - 10, 
                this.map.height - 10, 
                this.map.tileSize, 
            );
        });
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;