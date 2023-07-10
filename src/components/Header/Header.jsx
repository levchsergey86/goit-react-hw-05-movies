import s from './Header.module.css';
import Navigation from 'components/Navigation/Navigation';
import Container from 'components/Container/Container';

export default function Header () {
  return (
    <header className={s.header}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
}
