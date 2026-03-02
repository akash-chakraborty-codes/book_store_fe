// Reader.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

// 🔥 IMPORTANT: Set worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Reader = () => {
  const { filename } = useParams();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const fileUrl = `http://localhost:8080/api/download/pdf?filePath=${filename}`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>📖 PDF Reader</h2>

      <div>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          ⬅ Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {pageNumber} of {numPages}
        </span>

        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next ➡
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default Reader;
