import React from "react";

const styles = {
  overlay: {
    position: "relative",
    height: "720px",
    width: "1200px",
    margin: "auto",
    textAlign: "center",
    backgroundColor: "black",
    alignItem: "center",
    opacity: "1",
    zIndex: "2"
  },
  h1: {
    color: "red",
    paddingTop:"300px"
  }
};

const GG = () => {
  localStorage.removeItem("direction");
  return (
    <div style={styles.overlay}>
      <h1 style={styles.h1}>GAME OVER</h1>
      <a className="nes-btn is-error text-center" href="/harmony">Play Again</a>
    </div>
  );
};

export default GG;