import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        background: "#0e0e52",
        color: "white",
        justifyContent: "space-between",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        fontFamily:"calibri",
        fontSize:"17px"
      }}
    >
      <p>© 2024 YourDecide. All Rights Reserved</p>
      <p>Developed By YouDecide</p>
    </div>
  );
};

export default Footer;
