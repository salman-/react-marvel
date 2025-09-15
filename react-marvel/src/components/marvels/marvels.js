import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import marvelsWithThumbnail from "../../assets/offlineMarvels.json";
import {buildThumbnailPath} from "../../services/helperUtils";
import "./Marvels.css";

const Marvels = () => {
  const [marvels, setMarvels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    getMarvels();
  }, []);

  const getMarvels = async () => {
    const uniqueMarvelsWithThumbnail = [...new Set(marvelsWithThumbnail)];
    setMarvels(uniqueMarvelsWithThumbnail);
  };

  // Pagination logic
  const totalPages = Math.ceil(marvels.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMarvels = marvels.slice(indexOfFirstItem, indexOfLastItem);

  // Page numbers logic (show only 5 at a time)
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;
  let startPage = Math.max(1,
      currentPage - Math.floor(maxPageNumbersToShow / 2));
  let endPage = startPage + maxPageNumbersToShow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
      <div className="marvels-page" data-testid="marvels">
        <div className="marvels-grid">
          {currentMarvels.map((marvel, index) => {
            const {thumbnail, thumbnailExtention, name, id} = marvel;
            return (
                <div
                    key={id}
                    className="marvel-card"
                    data-testid={`marvelId-${index}`}
                >
                  <Link
                      to={`/marvels/${id}`}
                      className="marvel-link"
                      data-testid={`marvel-link-${id}`}
                  >
                    <img
                        src={buildThumbnailPath(thumbnail, thumbnailExtention)}
                        alt={name}
                        className="marvel-image"
                        data-testid={`marvel-image-${index}`}
                    />
                    <h3 className="marvel-name"
                        data-testid={`marvel-name-${index}`}>
                      {name}
                    </h3>
                  </Link>
                </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
              className="page-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
              <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`page-number ${
                      currentPage === number ? "active" : ""
                  }`}
              >
                {number}
              </button>
          ))}

          <button
              className="page-btn"
              onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
  );
};

export default Marvels;
