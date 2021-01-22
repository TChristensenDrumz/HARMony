import React from "react";

const styles = {
  overlay: {
    position: "absolute",
    height: "100%",
    width: "70%",
    textAlign: "center",
    backgroundColor: "black",
    alignItem: "center",
    opacity: "0.75",
    zIndex: "2"
  },
  h1: {
    color: "red",
    marginTop: "25vh",
    padding: "25px"
  },

  h2: {
    color: "white",
    padding: "15px",
  },

  p: {
      color: "white",

  }
};

const Pause = () => {
  return (
    <div style={styles.overlay}>
      <h1 style={styles.h1}>PAUSED</h1>
      <h2 style={styles.h2}>Controls</h2>
      <p style={styles.p}>Move: W-A-S-D </p>
      <p style={styles.p}>Attack: Space</p>
      <p style={styles.p}>Pause: Esc</p> 
    </div>
  );
};

export default Pause;
