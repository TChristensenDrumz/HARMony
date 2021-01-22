import React from "react";

const styles = {
    score: {
        position: "absolute",
        color: "white",
        left: "7%",
        top: "4.5%"
    },
    health: {
        position: "absolute",
        color: "white",
        right: "40%",
        top: "4.5%"
    },
    progress: {
        position: "absolute",
        width: "390px",
        left: "60%",
        top: "4%",
        height: "23px",
    }
}

const Stats = (props) => {
    return (
        <div>
            <p style={styles.score}>Score: {props.score}</p>
            <p style={styles.health}>Health: </p>
            <progress style={styles.progress} className="nes-progress" value={props.health} max="100" />
        </div>
    )
};

export default Stats;