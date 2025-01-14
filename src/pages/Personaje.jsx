// components/Personaje.js

import React, { useState, useEffect } from "react";
import Carrusel from "../components/Carrusel";
import "../styles/Personaje.css";
import { getMarvelCharacters } from "../services/ApiServiceMarvel"; // Asegúrate de tener la ruta correcta

const Personaje = () => {
  // Estado para almacenar los personajes, la página actual, y el estado de carga
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 12; // Puedes ajustar esto según tus necesidades

  // Función para obtener personajes según la página actual
  const fetchCharacters = async (page) => {
    const offset = (page - 1) * charactersPerPage;
    try {
      const charactersData = await getMarvelCharacters(
        charactersPerPage,
        offset
      );
      setCharacters(charactersData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Usamos useEffect para consumir la API cuando el componente se monta o la página cambia
  useEffect(() => {
    setLoading(true);
    fetchCharacters(currentPage);
  }, [currentPage]);

  return (
    <div className="personajes">
      <Carrusel />
      <h2 className="title">Personajes de Marvel</h2>
      <div className="characters-list">
        {loading ? (
          <p className="loading">Cargando personajes...</p>
        ) : error ? (
          <p>Error al cargar personajes: {error.message}</p>
        ) : (
          characters.map((character) => (
            <div className="card" key={character.id}>
              <div className="card-header">
                <h2>{character.name}</h2>
              </div>  
              <div className="card-body">
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                />
              </div>
              <div className="card-footer">
                <a href={'/personajes/'+character.id} rel="noopener noreferrer">Ver a detalle</a>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination">
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

export default Personaje;
