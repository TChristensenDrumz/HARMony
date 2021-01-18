import React, {useRef, useEffect, useState} from "react";
import InputManager from "../utils/InputManager";
import Room from "../game/Room";
import Spawner from "../utils/Spawner"

function Canvas ({ width, height, tileSize }) {
    const canvasRef = useRef();
    const [room, setRoom] = useState(new Room(width, height, tileSize));
    let inputManager = new InputManager();
    const handleInput = (action, data) => {
        console.log(`handle input: ${action}:${JSON.stringify(data)}`);
        let newRoom = new Room();
        Object.assign(newRoom, room);
        newRoom.movePlayer(data.x, data.y);
        setRoom(newRoom);
    };

    useEffect(() => {
        console.log("Create Map!");
        let newRoom = new Room();
        Object.assign(newRoom, room);
        newRoom.createCellularMap();
        newRoom.moveToSpace(room.player);
        let spawner = new Spawner(newRoom);
        spawner.spawnLoot(10);
        spawner.spawnMonsters(6);
        spawner.spawnStairs();
        setRoom(newRoom);
    }, []);

    useEffect(() => {
        console.log("Bind input");
        inputManager.bindKeys();
        inputManager.subscribe(handleInput);
        return () => {
            inputManager.unbindKeys();
            inputManager.unsubscribe(handleInput);
        }
    });

    useEffect(() => {
        console.log("Draw to canvas");
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, width * tileSize, height * tileSize);
        room.draw(context)
    });

    return (
        <>
            <canvas
                ref={canvasRef} 
                width={width * tileSize} 
                height={height * tileSize} 
                style={{border: '1px solid black', background: 'DimGrey'}}>
            </canvas>
            <ul>
                {room.player.inventory.map((item, index) => (<li key={index}>{item.attributes.name}</li>))}
            </ul>
            <ul>
                {room.history.map((item, index) => (<li key={index}>{item}</li>))}
            </ul>
        </>
    );
}

export default Canvas;