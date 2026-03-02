import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UploadModal from "./UploadModal";
import "../App.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  // 🔥 Fixed Categories
  const categories = [
    "All",
    "comedy",
    "adventure",
    "romance",
    "scifi",
    "manga",
    "other",
  ];

  // Fetch books from backend
  async function fetchBooks() {
    try {
      const response = await fetch("http://localhost:8080/api/uploads");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔥 Filter Logic
  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter(
          (book) =>
            book.category && book.category.toLowerCase() === selectedCategory,
        );

  return (
    <div className="home-container">
      <header className="header">
        <h1>📚 Book Store</h1>
        <button className="upload-btn" onClick={() => setShowModal(true)}>
          + Upload Book
        </button>
      </header>

      {/* 🔥 Category Buttons */}
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === "All" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* 🔥 Books Grid */}
      <div className="book-grid">
        {filteredBooks.length === 0 ? (
          <p>No books found in this category.</p>
        ) : (
          filteredBooks.map((book) => {
            const filename = book.pdfUrl.split("/").pop();

            return (
              <div key={book.id} className="book-card">
                <img
                  src={`http://localhost:8080${book.coverUrl}`}
                  alt="cover"
                  className="book-image"
                />

                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>

                  {/* 🔥 Buttons Container */}
                  <div className="btn-group">
                    <button
                      className="read-btn"
                      onClick={() =>
                        window.open(
                          `http://localhost:8080/api/read/pdf?filePath=${filename}`,
                          "_blank",
                        )
                      }
                    >
                      Read
                    </button>

                    <button
                      className="download-btn"
                      onClick={() =>
                        window.open(
                          `http://localhost:8080/api/download/pdf?filePath=${filename}`,
                        )
                      }
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 🔥 Upload Modal */}
      {showModal && (
        <UploadModal
          closeModal={() => {
            setShowModal(false);
            fetchBooks();
          }}
        />
      )}
    </div>
  );
};

export default Home;
