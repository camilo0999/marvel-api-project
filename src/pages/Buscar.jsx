import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getComicsName, getCharactersName } from "../services/ApiServiceMarvel";
import '../styles/Buscar.css';

const Buscar = () => {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const type = searchParams.get("type");  // Puede ser 'characters' o 'comics'
    const query = searchParams.get("q");  // El nombre que se busca

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            if (type === "characters") {
                const data = await getCharactersName(query);
                setResults(data);
            } else if (type === "comics") {
                const data = await getComicsName(query);
                setResults(data);
            }
            setLoading(false);
        };

        fetchResults();
    }, [type, query]);

    return (
        <div className="search-results">
            <h1>Resultados de búsqueda para "{query}"</h1>
            {loading ? (
                <p className="loading">Cargando...</p>
            ) : results.length === 0 ? (
                <p>No se encontraron resultados</p>
            ) : (
                <div className="results-list">
                    {results.map((result) => (
                        <div className="result-item" key={result.id}>

                            <div className="result-header">
                                <h2>{result.name}</h2>
                            </div>

                            <div className="result-image">
                                <img src={result.thumbnail.path + "." + result.thumbnail.extension} alt={result.name} />
                            </div>

                            <div className="result-buttons">

                                {
                                    type === "characters" ? (
                                        <a href={'/personajes/' + result.id }  rel="noopener noreferrer">
                                            Ver detalles
                                        </a>
                                    ) : (
                                        <a href={'/comic/' + result.id}  rel="noopener noreferrer">
                                            Ver detalles
                                        </a>
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Buscar;
