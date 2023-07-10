import s from './MovieDetailsPage.module.css';
import Container from 'components/Container/Container';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchMoviesDetails } from 'services/movies-api';
import PageHeading from 'components/Pageheading/Pageheading';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getYear = () => new Date(movie.release_date).getFullYear();

  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  let activeClassName = {
    color: '#2196f3',
  };

  const handleClick = () => navigate(location?.state?.from ?? '/');

  useEffect(() => {
    setLoading(true);
    fetchMoviesDetails(movieId)
      .then(res => {
        setMovie(res);
      })
      .catch(error => {
        setError('Ooops. Something went wrong...');
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <>
      <Container>
        <button onClick={handleClick} className={s.MovieDetailsGoBackButton}>
          Go back
        </button>

        {movie && <PageHeading text={movie.title} />}
        {/* <h2>Movie Review</h2> */}
        {loading && 'Loading ...'}
        {error && <div>{error}</div>}
        {movie && (
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <h3 className={s.MovieDetailsMovieTitle}>{movie.title}</h3>
            <p className={s.MovieDetailsMovieYear}>({getYear()})</p>
            <p className={s.MovieDetailsUserScore}>User Score: {movie.popularity}</p>
            <div className={s.MovieDetailsMovieOverview}>
              <h3 className={s.MovieDetailsOverviewHead}>Overview</h3>
              <p className={s.MovieDetailsOverviewText}>{movie.overview}</p>
            </div>
          </div>
        )}
        <hr />
        <div>
          <h2 className={s.MovieDetailsOverviewHead}>Additional Information</h2>
          <NavLink
            to={`/movies/${movieId}/reviews`}
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
            state={location.state}
          >
            <p className={s.MovieDetailsReviews}>Reviews</p>
          </NavLink>

          <NavLink
            to={`/movies/${movieId}/cast`}
            style={({ isActive }) => (isActive ? activeClassName : undefined)}
            state={location.state}
          >
            <p className={s.MovieDetailsCast}>Cast</p>
          </NavLink>
          <hr />
          <Outlet />
        </div>
      </Container>
    </>
  );
}
