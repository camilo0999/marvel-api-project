import React, { useState } from "react";
import '../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("characters"); // Tipo de búsqueda: 'characters' o 'comics'

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Redirige con los parámetros de tipo y término
            window.location.href = `/buscar?type=${searchType}&q=${encodeURIComponent(searchTerm)}`;
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1200px-Marvel_Logo.svg.png"
                    alt="Logo de Marvel"
                />
            </div>
            <div className={`menu-toggle ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
                &#9776;
            </div>
            <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                <li><a href="/">Inicio</a></li>
                <li><a href="/personajes">Personajes</a></li>
                <li><a href="/comic">Comic</a></li>
                <li>
                    {/* Formulario de búsqueda */}
                    <form onSubmit={handleSearch} className="search-form">
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className="search-select"
                        >
                            <option value="characters">Personajes</option>
                            <option value="comics">Cómics</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">🔍</button>
                    </form>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
