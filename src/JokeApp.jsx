// src/JokeApp.jsx
import React, { useState, useEffect } from 'react';
import styles from './JokeApp.module.scss'; // Import SCSS module

const JokeApp = () => {
  const [joke, setJoke] = useState(null); // Tilstand til at gemme jokeren
  const [loading, setLoading] = useState(true); // Tilstand til at gemme loading status

  // URL til API'et
  const url = 'https://official-joke-api.appspot.com/random_joke';

  // Brug useEffect til at hente en joke ved første render
  useEffect(() => {
    // Funktion til at hente en joke
    async function fetchJoke() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setJoke(data); // Gem joke data i state
      } catch (error) {
        console.error('Error fetching joke:', error);
      } finally {
        setLoading(false); // Sæt loading til false når data er hentet
      }
    }

    fetchJoke(); // Kalder fetch funktionen
  }, []); // Tomt dependency array sikrer, at den kun kører én gang

  return (
    <div className={styles.container}>
      <div className={styles.jokeBox}>
        {loading ? (
          <p>Loading...</p> // Viser loading indtil data er hentet
        ) : (
          joke && (
            <div>
              <h3>{joke.setup}</h3>
              <p>{joke.punchline}</p>
            </div>
          )
        )}
      </div>
      <button className={styles.button} onClick={() => window.location.reload()}>
        Get a new joke
      </button>
    </div>
  );
};

export default JokeApp;
