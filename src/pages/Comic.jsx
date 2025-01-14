import React, { useEffect, useState } from "react";
import { getComics } from "../services/ApiServiceMarvel";
import "../styles/Comic.css";
import Carrusel from "../components/Carrusel";

const Comic = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const comicsPerPage = 12;

  const fetchComics = async (page) => {
    const offset = (page - 1) * comicsPerPage;
    try {
      const comicsData = await getComics(comicsPerPage, offset);
      setComics(comicsData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchComics(currentPage);
  }, [currentPage]);

  return (
    <div className="comic">
      <Carrusel />
      <h2 className="comic-title">Comics</h2>
      {isLoading ? (
        <p className="loading">Cargando...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="comic-personajes-list">
          {comics.map((comic) => (
            <div key={comic.id} className="comic-card">
              <div className="comic-card-header">
                <h2>{comic.title}</h2>
              </div>
              <div className="comic-card-body">
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                />
              </div>
              <div className="comic-card-footer">
                <a href={`/comic/${comic.id}`}>Ver detalles</a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="comic-pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Comic;
