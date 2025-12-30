import { useState } from "react";
import "./App.css";
import { GenerateQrCodeWithLogo } from "./components/qrCodes/generateWithLogo";

function App() {
  const [url, setUrl] = useState("");
  const [logoType, setLogoType] = useState("bao-tang");
  const [qrStyle, setQrStyle] = useState("squares");
  const [fgColor, setFgColor] = useState("01589d");

  const handleClick = () => {
    const input = document.querySelector("input[name=url]") as HTMLInputElement;

    if (input) {
      setUrl(input.value);
    }
  };

  const handleLogoTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLogoType(e.target.value);
  };

  const handleQrStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQrStyle(e.target.value);
  };

  const handleFgColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFgColor(e.target.value);
  };

  return (
    <div className="container">
      {url && (
        <GenerateQrCodeWithLogo
          url={url}
          logoUrl={
            logoType !== ""
              ? logoType === "bao-tang"
                ? "/g-qrcode/bao-tang-di-tich-co-do.jpg"
                : "/g-qrcode/trung-tam-bao-tang.jpeg"
              : ""
          }
          bgColor="#FFF"
          qrStyle={qrStyle as "squares" | "dots" | "fluid"}
          fgColor={`#${fgColor}`}
        />
      )}

      <div className="form">
        <div className="form-group">
          <label>
            Chọn màu sắc QR Code:
            <select
              name="fgColor"
              value={fgColor}
              onChange={(e) => handleFgColorChange(e)}
            >
              <option value="01589d">Xanh</option>
              <option value="000000">Đen</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Chọn Logo:
            <select
              name="logoType"
              value={logoType}
              onChange={(e) => handleLogoTypeChange(e)}
            >
              <option value="">Không logo</option>
              <option value="bao-tang">Logo Bảo tàng cổ vật</option>
              <option value="trung-tam">
                Logo Trung tâm bảo tồn di tích Cố Đô
              </option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Chọn loại QR Code:
            <select
              name="qrStyle"
              value={qrStyle}
              onChange={(e) => handleQrStyleChange(e)}
            >
              <option value="squares">QR Code vuông</option>
              <option value="dots">QR Code dấu chấm</option>
              <option value="fluid">QR Code fluid</option>
            </select>
          </label>
        </div>
        <>
          <input placeholder="Enter URL" name="url" />
          <button onClick={handleClick}>Tạo QrCode</button>
        </>
      </div>
    </div>
  );
}

export default App;
