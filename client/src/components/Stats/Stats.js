import React from "react";

const styles = {
    health: {
        position: "absolute",
        color: "white",
        left: "51px",
        top: "5px"
    },
    progress: {
        position: "absolute",
        width: "367px",
        left: "178px",
        top: "1px",
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