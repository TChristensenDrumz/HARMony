import React from "react";

const styles = {
    health: {
        position: "absolute",
        color: "white",
        left: "21.5%",
        top: ".5%"
    },
    progress: {
        position: "absolute",
        width: "367px",
        left: "28%",
        top: ".2%",
        height: "23px",
    }
}

const Stats = (props) => {
    return (
        <div>
            <p style={styles.health}>Health: </p>
            <progress style={styles.progress} className="nes-progress is-error" value={props.health} max={props.max} />
        </div>
    )
};

export default Stats;