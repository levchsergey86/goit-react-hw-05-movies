import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <h1>
      Not found :( Go to <Link to="/">Home page</Link>{' '}
    </h1>
  );
}
