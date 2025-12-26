import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const style = { marginRight: 12 };
  const navigate = useNavigate();
  return (
    <nav style={{ marginBottom: 20 }}>
      <button style={style} onClick={() => navigate(-1)}>Home</button>
      <Link style={style} to="/reflected">Reflected XSS</Link>
      <Link style={style} to="/stored">Stored XSS</Link>
      <Link style={style} to="/dom">DOM-based XSS</Link>
    </nav>
  );
}
