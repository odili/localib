import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams, Link } from 'react-router-dom';
import { Ul, Li } from '../components/elements/Li';
import Small from '../components/elements/Small';
import DisplayContent from '../components/elements/DisplayContent';
import SmallTitle from '../components/elements/SmallTitle';
import EntityControl from '../components/EntityControl';
import DeleteBook from '../components/DeleteBook';
import styled from 'styled-components';

const AuthorSpan = styled.span`
  display: inline-block;
  margin-left: 1rem;
`;
const Book = () => {
  const [showDelete, setShowDelete] = React.useState(false);

  let { id } = useParams();
  let { loading, error, data } = useQuery(BOOK_DETAILS, {
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
  const copies = data.bookInstances.filter(fx => fx.book.id === data.book.id);
  return (
    <DisplayContent>
      <EntityControl
        onClick={handleDeleteClick}
        url={`/book/edit/${data.book.id}`}
      />
      <header>
        <SmallTitle>title</SmallTitle>
        <h1>{data.book.title}</h1>
        <p>
          <strong>Author(s):</strong>
          {data.book.authors.map(author => (
            <AuthorSpan key={author.id} className="author-list">
              <Link to={author.url}>{author.name}</Link>
            </AuthorSpan>
          ))}
        </p>
        <p>
          <strong>Genre:</strong>
          {data.book.genres.map(genre => (
            <AuthorSpan key={genre.id}>
              <Link to={genre.url}>{genre.name}</Link>
            </AuthorSpan>
          ))}
        </p>
      </header>
      <section className="body">
        <SmallTitle>summary</SmallTitle>
        <p>{data.book.summary}</p>
      </section>
      <section className="copies">
        <SmallTitle>Copies</SmallTitle>
        {copies.length > 0 ? (
          <Ul>
            {copies.map(copy => (
              <Li key={copy.id}>
                {copy.imprint}
                <br />
                <Small status={copy.status}>{copy.status}</Small>
              </Li>
            ))}
          </Ul>
        ) : (
          <p>No copy of this book is available in our library yet</p>
        )}
      </section>
      {showDelete && (
        <DeleteBook
          id={data.book.id}
          open={showDelete}
          onClose={() => {
            setShowDelete(!showDelete);
          }}
        />
      )}
    </DisplayContent>
  );
};

export default Book;

const BOOK_DETAILS = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      title
      summary
      authors {
        id
        name
        url
      }
      genres {
        id
        name
        url
      }
    }
    bookInstances {
      id
      status
      imprint
      book {
        id
      }
    }
  }
`;
