import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams } from 'react-router-dom';
import { Ul, Li } from '../components/elements/Li';
import DisplayContent from '../components/elements/DisplayContent';
import SmallTitle from '../components/elements/SmallTitle';
import DeleteAuthor from '../components/DeleteAuthor';
import EntityControl from '../components/EntityControl';

const Author = () => {
  const [showDelete, setShowDelete] = React.useState(false);
  let { id } = useParams();
  let { loading, error, data } = useQuery(AUTHOR_DETAILS, {
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
        url={`/author/edit/${data.author.id}`}
      />
      <SmallTitle>author</SmallTitle>
      <h1>{data.author.name}</h1>
      <p>
        {`${data.author.lifespan} --- ${data.author.dateOfDeath || 'today'}`}
      </p>
      <section className="body">
        <SmallTitle>Books</SmallTitle>
        {data.author.books.length > 0 ? (
          <Ul>
            {data.author.books.map(book => (
              <Li key={book.id}>{book.title}</Li>
            ))}
          </Ul>
        ) : (
          <p>This Author has no books yet in our Library</p>
        )}
      </section>
      {showDelete && (
        <DeleteAuthor
          id={data.author.id}
          open={showDelete}
          onClose={() => {
            setShowDelete(!showDelete);
          }}
        />
      )}
    </DisplayContent>
  );
};

export default Author;

const AUTHOR_DETAILS = gql`
  query Author($id: ID!) {
    author(id: $id) {
      id
      name
      lifespan
      books {
        id
        title
      }
      url
    }
  }
`;
