import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getMoviesBySearch } from '../../api/apiService';
import styles from './MoviesPage.module.css';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (!searchParams.get('query')) {
      return;
    }

    const fetchMovies = async () => {
      const movies = await getMoviesBySearch(searchParams.get('query'));
      setMovies(movies);
    };

    fetchMovies();
  }, [searchParams]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchParams({ query });
    setError(null);
    setMovies(null);
    try {
      const movies = await getMoviesBySearch(query);
      setMovies(movies);
    } catch {
      setError('Failed to fetch movies');
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {movies && movies.length > 0 && <MovieList movies={movies} />}
      {movies && movies.length === 0 && (
        <p className={styles.noResultsMessage}>
          There are no movies by your request
        </p>
      )}
    </>
  );
};

export default MoviesPage;
