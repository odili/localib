import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Ul, Li } from './elements/Li';
import { Link } from 'react-router-dom';
import stringSort from '../utils/stringSort';

export default function AuthorList() {
  const { loading, error, data } = useQuery(AUTHORS);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  const authors = data.authors.sort(stringSort).map(author => {
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
