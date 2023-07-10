import s from './Cast.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMoviesCredits } from 'services/movies-api';

const Cast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const res = await fetchMoviesCredits(movieId);
        setCast(res);
      } catch (error) {
        setError('Ooops. Something went wrong...');
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <>
      {loading && 'Loading...'}
      {error && <div>{error}</div>}
      <ul className={s.castList}>
        {cast.map(castItem => {
          return (
            <li key={castItem.id} className={s.castItem}>
              <img
                src={`https://image.tmdb.org/t/p/w300${castItem.profile_path}`}
                alt={`${castItem.name} portrait`}
                onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'; }}
                className={s.castImg}
              />
              <div>
                <p className={s.castName}>Name: {castItem.name} </p>
                <p className={s.castName}>Character: {castItem.character} </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Cast;
