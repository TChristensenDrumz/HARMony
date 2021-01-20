import React, { Component } from 'react'


function keyPressManager(event)  {
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var spacePressed = false
    
   function keyDownHandler(event) {
        if(event.keyCode == 68) {
            rightPressed = true;
        }
        else if(event.keyCode == 65) {
            leftPressed = true;
        }
        else if(event.keyCode == 83) {
        	downPressed = true;
        }
        else if(event.keyCode == 87) {
        	upPressed = true;
        }
        else if(event.keyCode == 32){
            spacePressed = true
        }
    }
    function keyUpHandler(event) {
        if(event.keyCode == 68) {
            rightPressed = false;
        }
        else if(event.keyCode == 65) {
            leftPressed = false;
        }
        else if(event.keyCode == 83) {
        	downPressed = false;
        }
        else if(event.keyCode == 87) {
        	upPressed = false;
        }
    }
}
export default keyPressManager