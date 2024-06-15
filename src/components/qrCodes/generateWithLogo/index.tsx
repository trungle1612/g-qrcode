import { type FC, useRef, useId } from "react";
import * as htmlToImage from "html-to-image";
import { QRCode } from "react-qrcode-logo";

type GenerateQrCodeProps = {
  url: string;
  logoUrl?: string;
};

export const GenerateQrCodeWithLogo: FC<GenerateQrCodeProps> = ({
  url,
  logoUrl,
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
      />
      <button onClick={downloadQRCodeWithImage}>Tải QR Code</button>
    </div>
  );
};
