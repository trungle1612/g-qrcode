import { useState } from "react";
import "./App.css";
import { GenerateQrCode } from "./components/qrCodes/generate";

function App() {
  const [url, setUrl] = useState("");
  const handleClick = () => {
    const input = document.querySelector("input");

    if (input) {
      setUrl(input.value);
    }
  };

  return (
    <>
      {url && <GenerateQrCode url={url} />}

      <div className="form">
        <input placeholder="Enter URL" name="url" />
        <button onClick={handleClick}>Generate QR Code</button>
      </div>
    </>
  );
}

export default App;
