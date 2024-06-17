import { type FC } from "react";
import DataGrid from "react-data-grid";
import { GenerateQrCodeWithLogo } from "../../qrCodes/generateWithLogo";
import "react-data-grid/lib/styles.css";

type TableRowProps = {
  url: string;
  id: string;
};

export const TableRow: FC<TableRowProps> = ({ url, id }) => {
  const columns = [
    { key: "id", name: "Id" },
    { key: "url", name: "Url" },
    { key: "qrCode", name: "QrCode" },
  ];

  const rows = [
    {
      id: id,
      url: url,
      qrCode: (
        <GenerateQrCodeWithLogo
          url={url}
          logoUrl="/g-qrcode/trung-tam-bao-tang.jpeg"
        />
      ),
    },
  ];

  return <DataGrid columns={columns} rows={rows} rowHeight={140} />;
};
