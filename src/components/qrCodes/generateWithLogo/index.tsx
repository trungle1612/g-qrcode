import { type FC } from "react";
import { QRCode } from 'react-qrcode-logo';


type GenerateQrCodeProps = {
  url: string;
  logoUrl?: string;
};

export const GenerateQrCodeWithLogo: FC<GenerateQrCodeProps> = ({ url, logoUrl }) => {
  return (
    <div className="form">
      <QRCode value={url} size={300} logoImage={logoUrl}/>
    </div>
  );
};
