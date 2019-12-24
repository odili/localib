import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Ul, Li } from './elements/Li';
import { Link } from 'react-router-dom';
import stringSort from '../utils/stringSort';

export default function GenreList() {
  const { loading, error, data } = useQuery(GENRES);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  const genres = data.genres.sort(stringSort).map(genre => {
    return (
      <Li key={genre.id}>
        <Link to={genre.url}>{genre.name} </Link>{' '}
      </Li>
    );
  });

  return <Ul>{genres}</Ul>;
}

const GENRES = gql`
  query {
    genres {
      id
      name
      url
    }
  }
`;
