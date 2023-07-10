import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import s from './MovieList.module.css'

const MovieList = ({ movies, prevLocation }) => {
  return (
    <>
      <ul>
        {movies.map(({ id, original_title }) => (
          <li key={id}>
            <Link className={s.MovieListItem} to={`/movies/${id}`} state={{ from: prevLocation }}>
              {/* <Link to={`/movies/${id}`} state={{ from: location.pathname }}> */}
              <h3>{original_title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieList;
