import React, { useState } from "react";
import "../index.css";

export default function XSSPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = () => {
    setOutput(input); // intentionally vulnerable (for XSS labs)
  };

  return (
    <div className="page-container">
      <h1 className="title">Cross Site Scripting (XSS)</h1>

      <label className="label-text">Enter Your Name</label>
      <input
        type="text"
        placeholder="Type here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button className="submit-btn" onClick={handleSubmit}>Submit</button>

      <div className="output-box" dangerouslySetInnerHTML={{ __html: output }}></div>
    </div>
  );
}