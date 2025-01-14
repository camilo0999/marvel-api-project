import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getMarvelCharactersId } from "../services/ApiServiceMarvel";
import "../styles/VerPersonaje.css";

const VerPersonaje = () => {
    const { id } = useParams(); 
    const [character, setCharacter] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const characterData = await getMarvelCharactersId(id); 
                setCharacter(characterData);
                setIsLoading(false);
            } catch (err) {
                setError("Error al cargar los datos del personaje.");
                setIsLoading(false);
            }
        };
        fetchCharacter();
    }, [id]);

    const renderList = (title, items) => (
        <>
            <h2>{title}</h2>
            {items.length > 0 ? (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No hay {title.toLowerCase()} relacionadas.</p>
            )}
        </>
    );

    return (
        <div className="ver-personaje">
            {isLoading ? (
                <p className="loading">Cargando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                character && (
                    <>
                        <h1>{character.name}</h1>
                        <div className="character-info">
                            <img
                                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                alt={character.name}
                                className="character-image"
                            />
                            <div className="character-details">
                                <p>
                                    <strong>Descripción:</strong>{" "}
                                    {character.description || "No hay descripción disponible para este personaje."}
                                </p>
                                <p>
                                    <strong>Modificado por última vez:</strong>{" "}
                                    {new Date(character.modified).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="character-extra">
                            {renderList("Series", character.series.items)}
                            {renderList("Historias", character.stories.items)}
                            {renderList("Eventos", character.events.items)}
                        </div>

                        <div className="character-links">
                            <h2>Enlaces Relacionados</h2>
                            {character.urls.length > 0 ? (
                                <ul>
                                    {character.urls.map((url, index) => (
                                        <li key={index}>
                                            <a href={url.url} target="_blank" rel="noopener noreferrer">
                                                {url.type}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay enlaces disponibles.</p>
                            )}
                        </div>
                    </>
                )
            )}
        </div>
    );
};

VerPersonaje.propTypes = {
    id: PropTypes.string,
};

export default VerPersonaje;
