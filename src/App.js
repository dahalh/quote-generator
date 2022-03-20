import "./App.css";
import React, { useState, useEffect, useRef } from "react";
function App() {
  const [quotes, setQuotes] = useState("");
  const textRef = useRef();
  let colors = ["#ffff00", "#90ee90", "#ffa500", "#ff68ff", "#a9a9e7"];

  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNum]);
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  useEffect(() => {
    textRef.current.style.color =
      colors[Math.floor(Math.random() * colors.length)];
  }, [quotes]);

  return (
    <div className="App">
      <div className="quote">
        <p ref={textRef}>{quotes.text}</p>
        <p>Author: {quotes.author}</p>
        <div className="btn-container">
          <button onClick={getQuote} className="btn">
            Get Quote
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${quotes.text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Tweet
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
