import React, { useEffect, useState } from "react";
import Carrusel from "../components/Carrusel";
import "../styles/Inicio.css";
import {
  getFeaturedCharacters,
  getFeaturedComics,
  getFeaturedEvents,
  getMarvelSeries,
  getMarvelEvents,
} from "../services/ApiServiceMarvel";

const Inicio = () => {
  const [featuredCharacters, setFeaturedCharacters] = useState([]);
  const [featuredComics, setFeaturedComics] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [series, setSeries] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data for featured characters, comics, and events
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [characters, comics, events, seriesData, newsData] =
          await Promise.all([
            getFeaturedCharacters(),
            getFeaturedComics(),
            getFeaturedEvents(),
            getMarvelSeries(5, 0),
            getMarvelEvents(5, 0),
          ]);
        setFeaturedCharacters(characters);
        setFeaturedComics(comics);
        setFeaturedEvents(events);
        setSeries(seriesData);
        setNews(newsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="inicio">
      <Carrusel />
      {isLoading ? (
        <div className="loading">
          <p>Cargando información, por favor espera...</p>
        </div>
      ) : (
        <>
          {/* Featured Characters Section */}
          <section className="inicio-featured-section">
            <h2 className="title">Personajes Destacados</h2>
            <div className="inicio-content">
              {featuredCharacters.map((char) => (
                <div className="inicio-card" key={char.id}>
                  <div className="inicio-card-header">
                    <h2>{char.name}</h2>
                  </div>
                  <div className="inicio-card-body">
                    <img
                      src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                      alt={char.name}
                    />
                  </div>
                  <div className="inicio-card-footer">
                    <a href={`/personajes/${char.id}`}>Ver detalles</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Random Info Section */}

          <section className="random-info">
            <div className="video">
              <iframe
                src="https://www.youtube.com/embed/-FICWTyWbng?si=MLhvRicCkeWXh-PL"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="description">
              <h2>Iron Man | Marvel 101</h2>
              <p>
                ¡Bienvenido a Marvel 101, donde podrás aprender todo sobre tus
                personajes, lugares, objetos favoritos y más de la Casa de las
                Ideas! El tema de hoy: IRON MAN.
              </p>
              <p>
                Genio. Multimillonario. Filántropo. Tony Stark es el héroe
                llamado Iron Man.
              </p>
            </div>
          </section>

          {/* Featured Comics Section */}
          <section className="inicio-featured-section">
            <h2 className="title">Cómics Destacados</h2>
            <div className="inicio-content">
              {featuredComics.map((comic) => (
                <div className="inicio-card" key={comic.id}>
                  <div className="inicio-card-header">
                    <h2>{comic.title}</h2>
                  </div>
                  <div className="inicio-card-body">
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                    />
                  </div>
                  <div className="inicio-card-footer">
                    <a href={`/comic/${comic.id}`}>Ver detalles</a>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Random Info Section */}

          <section className="random-info">
            <div className="video">
              <iframe
                src="https://www.youtube.com/embed/4sGPkpoq0us?si=ufaqHZLJiE-ucE_y"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="description">
              <h2>Knull vs Avengers y Venom I King in Black</h2>
              <p>
                King in Black" es un evento de Marvel Comics de 2020 en el que
                Knull, el dios de los symbiotes, llega a la Tierra con su
                ejército para sumergirla en oscuridad. Los Avengers y otros
                héroes se ven superados por su poder, mientras Knull toma
                control de varios personajes clave.
              </p>
              <p>
                Venom, debido a su conexión con los symbiotes, se convierte en
                la última esperanza para derrotarlo. Después de una épica
                batalla, los héroes logran vencer a Knull, lo que reconfigura el
                futuro de los symbiotes y deja un importante legado para Venom
                en el universo Marvel.
              </p>
            </div>
          </section>

          {/* Featured Events Section */}
          <section className="inicio-featured-section">
  <h2 className="title">Eventos Destacados</h2>
  <div className="inicio-content">
    {featuredEvents.map((event) => (
      <div className="inicio-card" key={event.id}>
        <div className="inicio-card-header">
          <h2>{event.title}</h2>
        </div>
        <div className="inicio-card-body">
          <img
            src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
            alt={event.title}
          />
        </div>
        <div className="inicio-card-footer">
          {/* Redirigir a la URL original del evento */}
          <a
            href={event.urls?.[0]?.url || "#"} // Usa el primer enlace disponible en `urls`
            target="_blank" // Abrir en una nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad del enlace
          >
            Ver detalles
          </a>
        </div>
      </div>
    ))}
  </div>
</section>


          {/* Random Info Section */}
          <section className="random-info">
            <div className="video">
              <iframe
                src="https://www.youtube.com/embed/683OCFSFaAI?si=O_7WFVPAi67UefFo"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="description">
              <h2>Cosplay Marvel 2023 </h2>
              <p>
                El video presenta los mejores cosplays de Marvel de 2023,
                destacando creaciones impresionantes de personajes icónicos como
                Spider-Man, Iron Man y Capitana Marvel. Además, ofrece ideas de
                disfraces de último minuto para Halloween, inspiradas en
                personajes del universo Marvel, mostrando tanto la creatividad
                de los cosplayers como opciones fáciles y rápidas para quienes
                buscan un disfraz en el último momento.
              </p>
            </div>
          </section>

          {/* Series Section */}
          <section className="inicio-content-section">
  <h2 className="title">Series Destacadas</h2>
  <div className="inicio-content">
    {series.map((serie) => (
      <div className="inicio-card" key={serie.id}>
        <div className="inicio-card-header">
          <h2>{serie.title}</h2>
        </div>
        <div className="inicio-card-body">
          <img
            src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
            alt={serie.title}
          />
        </div>
        <div className="inicio-card-footer">
          {serie.urls && serie.urls.length > 0 ? (
            <a
              href={serie.urls[0].url} // Utiliza la primera URL del array
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver detalles
            </a>
          ) : (
            <span>Enlace no disponible</span>
          )}
        </div>
      </div>
    ))}
  </div>
</section>

          
          {/* Random Info Section */}
          <section className="random-info">
            <div className="video">
              <iframe
                src="https://www.youtube.com/embed/QyYqaTQ5uYk?si=ZTkReK_XRFytYl8D"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="description">
              <h2>CRONOLOGÍA COMPLETA de TODO Marvel </h2>
              <p>
                La cronología del universo Marvel abarca desde los orígenes de
                héroes como Capitán América y X-Men, hasta eventos cósmicos y la
                formación de equipos como los Avengers y Fantastic Four. A lo
                largo de los cómics y películas, los personajes enfrentan
                amenazas que van desde conflictos terrenales hasta grandes
                villanos cósmicos como Thanos.
              </p>
              <p>
                En el cine, el Marvel Cinematic Universe (MCU) comienza con Iron
                Man en 2008, expandiéndose a través de las Fases 1, 2 y 3,
                culminando con Avengers: Endgame. La Fase 4 introduce el
                Multiverso y nuevos personajes, abriendo una nueva era de
                historias y amenazas.
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Inicio;
