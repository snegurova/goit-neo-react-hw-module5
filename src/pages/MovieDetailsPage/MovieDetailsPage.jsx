import { useEffect, useRef, useState } from 'react';
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from 'react-router-dom';
import { getMovieById } from '../../api/apiService';
import clsx from 'clsx';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const classBuilder = ({ isActive }) =>
    clsx(styles.tab, { [styles.activeTab]: isActive });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieById(movieId);
        setMovie(movieData);
      } catch {
        setError('Failed to load movie.');
      }
    };

    fetchMovie();
  }, [movieId]);

  const location = useLocation();
  const backLink = useRef(location.state ?? '/');

  return (
    <>
      {error && <p>{error}</p>}{' '}
      {movie && (
        <>
          <Link className={styles.backLink} to={backLink.current}>
            Go back
          </Link>
          <div className={styles.movieWrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div>
              <h1>{`${movie.title} (${movie.release_date.slice(0, 4)})`}</h1>
              <p>{`User Score: ${parseInt(movie.popularity)}%`}</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <p>
                {movie.genres.map(({ name, id }) => (
                  <span key={id} className={styles.genre}>
                    {name}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>
            <div className={styles.additionaInfo}>
              <NavLink
                className={classBuilder}
                to={`/movies/${movieId}/cast`}
                state={location}
              >
                Cast
              </NavLink>
              <NavLink
                className={classBuilder}
                to={`/movies/${movieId}/reviews`}
                state={location}
              >
                Reviews
              </NavLink>
            </div>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
