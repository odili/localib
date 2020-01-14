import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { Ul, Li } from '../components/elements/Li';
import DisplayContent from '../components/elements/DisplayContent';
import SmallTitle from '../components/elements/SmallTitle';
import EntityControl from '../components/EntityControl';
import DeleteGenre from '../components/DeleteGenre';

const Genre = () => {
  const [showDelete, setShowDelete] = React.useState(false);

  let { id } = useParams();
  let { loading, error, data } = useQuery(GENRE_DETAILS, {
    variables: { id },
  });
  const handleDeleteClick = () => {
    setShowDelete(!showDelete);
  };

  if (loading) {
    return <DisplayContent>Loading...</DisplayContent>;
  }
  if (error) {
    return <DisplayContent>Error: {error}</DisplayContent>;
  }
  return (
    <DisplayContent>
      <EntityControl
        onClick={handleDeleteClick}
        url={`/genre/edit/${data.genre.id}`}
      />
      <SmallTitle>genre</SmallTitle>
      <h1>{data.genre.name}</h1>

      <section className="body">
        <SmallTitle>Books</SmallTitle>
        {data.genre.books.length > 0 ? (
          <Ul>
            {data.genre.books.map(book => (
              <Li key={book.id}>
                <Link to={book.url}>{book.title}</Link>
                <p>{book.summary}</p>
              </Li>
            ))}
          </Ul>
        ) : (
          <p>This genre has no books yet in our Library</p>
        )}
      </section>
      {showDelete && (
        <DeleteGenre
          id={data.genre.id}
          open={showDelete}
          onClose={() => {
            setShowDelete(!showDelete);
          }}
        />
      )}
    </DisplayContent>
  );
};

export default Genre;

const GENRE_DETAILS = gql`
  query Genre($id: ID!) {
    genre(id: $id) {
      id
      name
      books {
        id
        title
        summary
        url
      }
      url
    }
  }
`;
