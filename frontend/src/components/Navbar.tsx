import React from "react";

const Navbar = () => {
  return (
    <div style={navStyle}>
      <div>
        <h2 style={{ color: "#ff4d6d" }}>hechieTech Settlement</h2>
        <p style={{ fontSize: "12px" }}>Real-Time DvP • NSE/BSE • T+0</p>
      </div>

      <div>
        <button style={btn}>Connect MetaMask</button>
      </div>
    </div>
  );
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 40px",
  background: "#0f172a",
  color: "white"
};

const btn = {
  padding: "10px 20px",
  background: "#ff4d6d",
  border: "none",
  color: "white",
  cursor: "pointer"
};

export default Navbar;