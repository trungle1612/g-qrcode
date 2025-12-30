import { type FC, useRef, useId } from "react";
import { QRCode } from "react-qrcode-logo";

type GenerateQrCodeProps = {
  url: string;
  logoUrl?: string;
  bgColor?: string;
  qrStyle?: "dots" | "squares" | "fluid";
  fgColor?: string;
};

export const GenerateQrCodeWithLogo: FC<GenerateQrCodeProps> = ({
  url,
  logoUrl,
  bgColor,
  qrStyle = "squares",
  fgColor = "#01589d",
}) => {
  const qrCodeRef = useRef(null);
  const domainName = url.replace(
    /(https?:\/\/)?(www\.)?([a-zA-Z0-9-]*).*$/,
    "$3"
  );
  const id = useId();

  const downloadQRCodeWithImage = () => {
    const qrCodeCanvas = document.getElementById(id) as HTMLCanvasElement;
    const link = document.createElement("a");
    link.href = qrCodeCanvas.toDataURL();
    link.download = `${domainName}.png`
    link.click();
  };
  return (
    <div className="form">
      <QRCode
        value={url}
        size={300}
        logoImage={logoUrl}
        ref={qrCodeRef}
        id={id}
        bgColor={bgColor}
        qrStyle={qrStyle}
        fgColor={fgColor}
        eyeRadius={10}
      />
      <button onClick={downloadQRCodeWithImage}>Tải QR Code</button>
    </div>
  );
};
