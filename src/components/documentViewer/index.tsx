export function DocumentViewer() {
  const pdfUrl = "/g-qrcode/Bao tang CVCD.pdf";

  return (
    <div className="document-page">
      <iframe
        src={pdfUrl}
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
