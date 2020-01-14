import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Ul, Li } from './elements/Li';
import Small from './elements/Small';
import { Link } from 'react-router-dom';

export default function BookInstanceList() {
  const { loading, error, data } = useQuery(BOOK_INSTANCES);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Ul>
      {data.bookInstances.map(bx => (
        <Li key={bx.id}>
          <Link to={bx.url}>{bx.book.title}</Link>
          <br />
          <Small status={bx.status}> {bx.status}</Small>
        </Li>
      ))}
    </Ul>
  );
}

const BOOK_INSTANCES = gql`
  query {
    bookInstances {
      id
      status
      url
      book {
        title
      }
    }
  }
`;
