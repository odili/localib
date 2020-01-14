import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Ul, Li } from './elements/Li';
import { Link } from 'react-router-dom';

export default function AuthorList() {
  const { loading, error, data } = useQuery(AUTHORS);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const authors = data.authors.map(author => {
    return (
      <Li key={author.id}>
        <Link to={author.url}> {author.name}</Link>{' '}
      </Li>
    );
  });

  return <Ul> {authors}</Ul>;
}

const AUTHORS = gql`
  query {
    authors {
      id
      name
      url
    }
  }
`;
