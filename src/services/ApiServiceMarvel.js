// services/ApiServiceMarvel.js

const publicKey = 'a2055a14c5e28815abcda53d1b598090';
const privateKey = '5423d6716820a843ec90c546aadc7591b765b034';
const ts = 1;

const hash = 'f23648b7c0d298eb8976a390f1a0c41f';

export const getMarvelCharactersId = async (id) => {
  if (!id) {
    console.error("ID del personaje no proporcionado.");
    throw new Error("Se requiere un ID de personaje para realizar la consulta.");
  }

  const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP! Estado: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Validamos que haya resultados
    if (!data.data || !data.data.results || data.data.results.length === 0) {
      throw new Error("No se encontraron resultados para el ID proporcionado.");
    }

    // Devolvemos solo el primer personaje, asumiendo que el ID es único
    return data.data.results[0];
  } catch (error) {
    console.error("Error al obtener los datos del personaje:", error);
    throw error; // Lanzamos el error para que el componente lo maneje
  }
};

export const getMarvelCharacters = async (limit, offset) => {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

// Servicios para destacados
export const getFeaturedCharacters = async () => {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/characters?orderBy=modified&limit=5&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error fetching featured characters:', error);
    return [];
  }
};

export const getFeaturedComics = async () => {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/comics?orderBy=modified&limit=5&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error fetching featured comics:', error);
    return [];
  }
};

export const getComics = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/comics?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Validar estructura esperada en la respuesta
    if (data?.data?.results) {
      console.log(`Fetched ${data.data.results.length} comics successfully.`);
      return data.data.results;
    } else {
      throw new Error("Unexpected API response structure.");
    }
  } catch (error) {
    console.error("Error fetching comics:", error.message);
    return [];
  }
};
export const getComicsId = async (id) => {
  try {
    // Validar si se ha pasado un ID
    if (!id) {
      throw new Error("El ID del cómic es requerido.");
    }

    // Realizar la solicitud
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error al obtener el cómic: ${response.status} ${response.statusText}`);
    }

    // Parsear la respuesta a JSON
    const data = await response.json();

    // Validar que existan resultados en la respuesta
    if (!data.data || !data.data.results || data.data.results.length === 0) {
      throw new Error("No se encontraron datos para el ID proporcionado.");
    }

    // Retornar el primer resultado
    return data.data.results[0];
  } catch (error) {
    // Manejo de errores y retorno de valor consistente
    console.error("Error al obtener el cómic por ID:", error.message);
    return null;
  }
};


export const getFeaturedEvents = async () => {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/events?orderBy=modified&limit=5&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
};

// Obtener series destacadas
export const getMarvelSeries = async (limit, offset) => {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/series?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error fetching series:', error);
    return [];
  }
};

// Obtener noticias destacadas (se pueden usar eventos como "noticias")
export const getMarvelEvents = async (limit, offset) => {
  try {
    const response = await fetch(
      `https://gateway.marvel.com/v1/public/events?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};


// Obtener personajes por nombre
export const getCharactersName = async (name) => {
  try {
    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&apikey=a2055a14c5e28815abcda53d1b598090&hash=f23648b7c0d298eb8976a390f1a0c41f&ts=1`;

    const response = await fetch(url);

    // Comprobar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("Error en la solicitud de personajes");
    }

    const data = await response.json();
    return data.data.results || []; // Retorna los resultados o un arreglo vacío si no hay resultados
  } catch (error) {
    console.error("Error al obtener personajes:", error);
    return []; // Retorna un arreglo vacío en caso de error
  }
};

// Obtener cómics por nombre
export const getComicsName = async (name) => {
  try {
    const url = `https://gateway.marvel.com/v1/public/comics?title=${name}&apikey=a2055a14c5e28815abcda53d1b598090&hash=f23648b7c0d298eb8976a390f1a0c41f&ts=1`;
    const response = await fetch(url);

    // Comprobar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("Error en la solicitud de cómics");
    }

    const data = await response.json();
    return data.data.results || []; // Retorna los resultados o un arreglo vacío si no hay resultados
  } catch (error) {
    console.error("Error al obtener cómics:", error);
    return []; // Retorna un arreglo vacío en caso de error
  }
};
