import Image from "next/image";

const CharacterByIdPage = ({ character }) => {
  return (
    <div>
      <h2>{character.name}</h2>
      <Image
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
      />
    </div>
  );
}

export default CharacterByIdPage;

export const getServerSideProps = async ({ params }) => { // The complete object of params is context (context.params or context.query)
  const response = await fetch(`https://rickandmortyapi.com/api/character/${params.exampleById}`);
  const data = await response.json();

  return {
    props: {
      character: data,
    }
  }
}