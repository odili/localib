import React from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Pitch from '../components/elements/Pitch';
import DisplayContent from '../components/elements/DisplayContent';
import CountDisplay from '../components/elements/CountDisplay';
import SearchBar from '../components/SearchBar';
import BookListIndex from '../components/BookListIndex';
import IndexCount from '../components/elements/IndexCount';

export default function FrontPage() {
  const { loading, error, data } = useQuery(INDEX);

  if (loading) {
    return <DisplayContent>Loading...</DisplayContent>;
  }
  if (error) {
    return <DisplayContent>Error: {error}</DisplayContent>;
  }
  return (
    <>
      <Pitch>
        Welcome to LocalLibrary, a very basic Express and GraphQL (Apollo)
        backend, React and Apollo Frontend powered site developed as a tutorial
        on the Mozilla Developer Network
      </Pitch>
      <SearchBar />
      <IndexCount className="resource-count">
        <Link to="/authors">
          <CountDisplay count={data.authors.length} title="authors" />
        </Link>
        <Link to="/books">
          <CountDisplay count={data.books.length} title="books" />
        </Link>
        <Link to="/bookinstances">
          <CountDisplay
            count={data.bookInstances.length}
            title="book instances"
          />
        </Link>
        <Link to="/bookinstances">
          <CountDisplay
            count={
              data.bookInstances.filter(avil => avil.status === 'AVAILABLE')
                .length
            }
            title="books available"
          />
        </Link>
        <Link to="/genres">
          <CountDisplay count={data.genres.length} title="genres" />
        </Link>
      </IndexCount>

      <section className="book-list">
        <BookListIndex />
      </section>
    </>
  );
}

const INDEX = gql`
  query {
    authors {
      name
    }
    books {
      title
    }
    bookInstances {
      status
    }
    genres {
      name
    }
  }
`;
