import { useState, useRef } from "react";
import "../App.css";

const UploadModal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("comedy");

  const pdfRef = useRef(null);
  const coverRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("pdf", pdfRef.current.files[0]);
    formData.append("cover", coverRef.current.files[0]);

    const response = await fetch("http://localhost:8080/api/uploads", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      closeModal();
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={closeModal}>
          ✖
        </span>

        <h2>Upload Book</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="comedy">Comedy</option>
            <option value="adventure">Adventure</option>
            <option value="romance">Romance</option>
            <option value="scifi">Scifi</option>
            <option value="manga">Manga</option>
            <option value="other">Other</option>
          </select>

          <input type="file" accept="application/pdf" ref={pdfRef} required />
          <input type="file" accept="image/*" ref={coverRef} required />

          <button type="submit" className="submit-btn">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
