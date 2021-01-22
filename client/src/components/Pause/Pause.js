import React from "react";

const styles = {
    overlay: {
        position: "absolute",
        height: "100%",
        width: "70%",
        textAlign: "center",
        backgroundColor: "black",
        opacity: "0.75"
    },
    text: {
        color: "red",
        marginTop: "35vh"
    }
}

const Pause = () => {
    return (
        <div style={styles.overlay}>
            <h1 style={styles.text}>PAUSED</h1>
        </div>
    );
};

export default Pause;