import Image from 'next/image';
import Link from 'next/link';
import styles from './example.module.css';

const ExamplePage = ({ characters }) => {

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.h1}>
        Esta es la página de ejemplo
      </h1>
      {
        characters.map((character) => {
          return (
            <Link href={`/example/${character.id}`}>
              <div key={character.id}>
                <h2 className={styles.h2}>{character.name}</h2>
                <Image
                  // layout='responsive'
                  src={character.image}
                  alt={character.name}
                  width={300}
                  height={300}
                />
              </div>
            </Link>
          )
        })
      }
    </div>
  );
}

export default ExamplePage;

export const getServerSideProps = async () => {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const data = await response.json();

  return {
    props: {
      characters: data.results,
    }
  }
}