import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ marginTop: "60px" }}>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
