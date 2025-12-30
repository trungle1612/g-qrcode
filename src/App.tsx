import { useCallback, useState } from "react";
import "./App.css";
import { GenerateQrCode } from "./components/qrCodes/generate";
import { GenerateQrCodeWithLogo } from "./components/qrCodes/generateWithLogo";

function App() {
  type qrCodes = {
    id: string;
    url: string;
  };

  const [url, setUrl] = useState("");
  const [type, setType] = useState("directly");
  const [isValid, setIsValid] = useState(true);
  const [qrCodes, setQrCodes] = useState<qrCodes[]>([]);
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

  const handleOnClickFileType = () => {
    // Read file from input
    const input = document.querySelector(
      "input[type=file]"
    ) as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      console.log(qrCodes);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setQrCodes([]);

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target?.result;
          const lines = data?.toString().split("\n");
          // save lines.split(",") to qrCodes
          lines?.forEach((line) => {
            const [id, url] = line.split(",");
            setQrCodes((prev) => [...prev, { id, url }]);
          });
        };
        reader.readAsText(file);
        setIsValid(true);
      } else {
        setIsValid(false);
        setQrCodes([]);
      }
    },
    []
  );

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
      {qrCodes.length > 0 && (
        <div>
          {qrCodes.map((qrCode) => (
            <GenerateQrCode key={qrCode.id} url={qrCode.url} />
          ))}
        </div>
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
        {type === "directly" && (
          <>
            <input placeholder="Enter URL" name="url" />
            <button onClick={handleClick}>Tạo QrCode</button>
          </>
        )}
        {type === "file" && (
          <>
            <span className="required-file" hidden={isValid}>
              * Vui lòng chọn file
            </span>
            <input
              type="file"
              accept=".csv, .txt, .rtf"
              onChange={handleFileChange}
            />
            <button onClick={handleOnClickFileType}>
              Tạo danh sách QrCode
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
