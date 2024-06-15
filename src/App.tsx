import { useCallback, useState } from "react";
import "./App.css";
import { GenerateQrCode } from "./components/qrCodes/generate";
import { GenerateQrCodeWithLogo } from "./components/qrCodes/generateWithLogo"

function App() {
  type qrCodes = {
    id: string;
    url: string;
  };

  const [url, setUrl] = useState("");
  const [type, setType] = useState("directly");
  const [isValid, setIsValid] = useState(true);
  const [qrCodes, setQrCodes] = useState<qrCodes[]>([]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleClick = () => {
    const input = document.querySelector("input[name=url]") as HTMLInputElement;

    if (input) {
      setUrl(input.value);
    }
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
      {url && <GenerateQrCodeWithLogo url={url} logoUrl="/g-qrcode/trung-tam-bao-tang.jpeg" />}
      {qrCodes.length > 0 && (
        <div>
          {qrCodes.map((qrCode) => (
            <GenerateQrCode key={qrCode.id} url={qrCode.url} />
          ))}
        </div>
      )}

      <div className="form">
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="directly"
              checked={type === "directly"}
              onChange={(e) => handleTypeChange(e)}
            />
            Trực tiếp
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="file"
              onChange={(e) => handleTypeChange(e)}
            />
            File
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
