import React from 'react';



function Footer() {
    const footerStyle={
        height: "10vh",
        width: "100vw",
        overflowX: "hidden"
    }
    return (
        <footer className="row"  style={footerStyle}>
            <div className="container">
                <div className="text-center align-item-center mt-4 p-2">
                    <i className="nes-icon github m-0"></i>
                </div>
            </div>
        </footer> 
    );
};

export default Footer; 