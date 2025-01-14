import React, { useEffect, useState } from "react";
import { getComicsId } from "../services/ApiServiceMarvel";
import "../styles/ComicDetail.css"; // Crear un archivo CSS para los estilos

const VerComic = () => {
    const [comic, setComic] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener el ID desde la URL
    const id = window.location.pathname.split("/")[2];

    // Llamar al servicio para obtener los datos del cómic
    useEffect(() => {
        const fetchComic = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const comicData = await getComicsId(id);
                if (!comicData) {
                    throw new Error("No se encontró información para este cómic.");
                }
                setComic(comicData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchComic();
    }, [id]);

    // Renderizar estados de carga y error
    if (isLoading) return <div className="ver-personaje "><p className="loading">Cargando cómic...</p></div>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!comic) return <p>No se encontró información para este cómic.</p>;

    // Desestructurar datos del cómic
    const { title, description, thumbnail, creators, urls } = comic;
    const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;

    return (
        <div className="ver-personaje">
            <h1 className="comic-title">{title}</h1>
            <div className="character-info">
                <img src={imageUrl} alt={title} className="character-image " />
                <div className="character-details ">
                    <p className="character-description">
                        {description || "Descripción no disponible."}
                    </p>
                    <div className="character-creators">
                        <h3>Creadores:</h3>
                        <ul>
                            {creators.items.map((creator) => (
                                <li key={creator.resourceURI}>
                                    {creator.role}: {creator.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="character-links">
                        <h3>Enlaces:</h3>
                        <ul>
                            {urls.map((url) => (
                                <li key={url.type}>
                                    <a
                                        href={url.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {url.type === "detail" ? "Detalles" : url.type}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerComic;
