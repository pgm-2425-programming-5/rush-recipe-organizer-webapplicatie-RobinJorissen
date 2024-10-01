import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Organiseer je favoriete recepten!</h1>
      <p className={styles.subheading}>
        Voeg je favoriete gerechten toe, beheer ze en vind snel je volgende maaltijdideeën.
      </p>
      <Link href="/recipes" className={styles.button}>
        Start met organiseren
      </Link>
    </div>
  );
}
