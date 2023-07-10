import Container from 'components/Container/Container';
import PageHeading from 'components/Pageheading/Pageheading';
import MovieList from 'components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { getMovies } from 'services/movies-api';
import PageNotFound from 'PageNotFound/PageNotFound';

export default function GetTrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = () => {
      setLoading(true);
      getMovies()
        .then(results => {
          setMovies(results);
        })
        .catch(error => {
          setError('Ooops. Something went wrong...');
          console.log(error);
        })
        .finally(() => setLoading(false));
    };
    fetchTrendingMovies();
  }, []);

  const isNotFound = !loading && !movies.length;
  return (
    <>
      <Container>
        <PageHeading text={'Trending Movies'}></PageHeading>
        {/* <SearchBar onSubmit={handleFormSubmit} /> */}
        {loading && 'Loading ...'}
        {isNotFound && <PageNotFound />}
        {error && <div>{error}</div>}
        {movies && <MovieList movies={movies} />}
      </Container>
    </>
  );
}
