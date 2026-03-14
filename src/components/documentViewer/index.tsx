export function DocumentViewer() {
  const pdfUrl =
    "https://trungle1612.github.io/g-qrcode/Bao%20tang%20CVCD.pdf";
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  return (
    <div className="document-page">
      <iframe
        src={viewerUrl}
        title="Bộ tài liệu Chương trình Giáo dục Di sản"
      >
        <p>
          Trình duyệt của bạn không hỗ trợ xem PDF.{" "}
          <a href={pdfUrl} download>
            Tải xuống tài liệu
          </a>
        </p>
      </iframe>
    </div>
  );
}
