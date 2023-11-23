import React from "react";

const footerStyle = {
  backgroundColor: "#646cff",
  padding: "10px",
  textAlign: "center",
  position: "sticky",
  bottom: "0",
  width: "100%",
};
export const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div>
        <p>All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
