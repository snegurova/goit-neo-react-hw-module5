import { getMovieCast } from '../../api/apiService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      setError(null);
      try {
        const movieCastData = await getMovieCast(movieId);
        setMovieCast(movieCastData);
      } catch {
        setError("Failed to load movie's cast.");
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={styles.container}>
      {error && <p>{error}</p>}
      {movieCast && movieCast.length > 0 && (
        <ul className={styles.list}>
          {movieCast.map(({ id, profile_path, name, character }) => (
            <li key={id} className={styles.item}>
              {profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt={name}
                  width={100}
                />
              )}
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      )}
      {movieCast && movieCast.length === 0 && !error && (
        <p>There is no cast provided</p>
      )}
    </div>
  );
};

export default MovieCast;
