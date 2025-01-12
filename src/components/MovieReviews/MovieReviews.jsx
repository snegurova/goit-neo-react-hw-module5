import { getMovieReviews } from '../../api/apiService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      setError(null);
      try {
        const movieCastData = await getMovieReviews(movieId);
        setMovieReviews(movieCastData);
      } catch {
        setError("Failed to load movie's reviews.");
      }
    };

    fetchMovieReviews();
  }, [movieId]);
  return (
    <div className={styles.container}>
      {error && <p>{error}</p>}
      {movieReviews && movieReviews.length > 0 && (
        <ul className={styles.list}>
          {movieReviews.map(({ id, author, content }) => (
            <li key={id} className={styles.item}>
              <h3 className={styles.author}>{author}</h3>
              <p className={styles.review}>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {movieReviews && movieReviews.length === 0 && !error && (
        <p>There is no review added yet</p>
      )}
    </div>
  );
};

export default MovieReviews;
