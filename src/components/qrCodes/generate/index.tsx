import { type FC, useRef } from "react";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";

type GenerateQrCodeProps = {
  url: string;
};

export const GenerateQrCode: FC<GenerateQrCodeProps> = ({ url }) => {
  const qrCodeRef = useRef(null);
  // create a variable from url prop, remove http:// and https:// from the url
  //const urlWithoutProtocol = url.replace(/^https?:\/\//, "");
  const domainName = url.replace(/(https?:\/\/)?(www\.)?([a-zA-Z0-9-]*).*$/, "$3");
  const downloadQRCode = () => {
    if (qrCodeRef.current) {
      htmlToImage
        .toPng(qrCodeRef.current)
        .then(function (dataUrl) {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${domainName}.png`; // download the QR code as a .png file
          link.click();
        })
        .catch(function (error) {
          console.error("Error generating QR code:", error);
        });
    }
  };

  return (
    <div className="form">
      <QRCode value={url} ref={qrCodeRef} size={300}/>

      <button onClick={downloadQRCode}>Download QR Code</button>
    </div>
  );
};
