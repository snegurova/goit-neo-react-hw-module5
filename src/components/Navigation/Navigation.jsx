import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import clsx from 'clsx';

const Navigation = () => {
  const buildLinkClass = ({ isActive }) =>
    clsx(styles.link, { [styles.active]: isActive });
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
