import React from "react";

const styles = {
  overlay: {
    position: "absolute",
    height: "720px",
    width: "1200px",
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

const GG = () => {
  localStorage.removeItem("direction");
  return (
    <div style={styles.overlay}>
      <h1 style={styles.h1}>GAME OVER</h1>
      <h2 style={styles.h2}>Score: </h2>
      <a className="nes-btn is-error text-center" href="/harmony">Play Again</a>
    </div>
  );
};

export default GG;