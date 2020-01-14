import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import DisplayContent from '../components/elements/DisplayContent';
import SmallTitle from '../components/elements/SmallTitle';
import Small from '../components/elements/Small';
import EntityControl from '../components/EntityControl';
import DeleteBookInstance from '../components/DeleteBookInstance';

const BookInstance = () => {
  const [showDelete, setShowDelete] = React.useState(false);
  let { id } = useParams();
  let { loading, error, data } = useQuery(BOOKCOPY_DETAILS, {
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
        url={`/bookinstance/edit/${data.bookInstance.id}`}
      />
      <SmallTitle>book instance</SmallTitle>
      <h1>{data.bookInstance.imprint}</h1>
      <p>
        <strong>Title:</strong> {data.bookInstance.book.title}
      </p>
      <p>
        <strong>ID:</strong> {data.bookInstance.id}
      </p>
      <p>
        <strong>Status:</strong>{' '}
        <Small status={data.bookInstance.status}>
          {data.bookInstance.status}
        </Small>
      </p>

      <section className="body">
        <SmallTitle>actions</SmallTitle>
      </section>
      {showDelete && (
        <DeleteBookInstance
          id={data.bookInstance.id}
          open={showDelete}
          onClose={() => {
            setShowDelete(!showDelete);
          }}
        />
      )}
    </DisplayContent>
  );
};

export default BookInstance;

const BOOKCOPY_DETAILS = gql`
  query BookInstance($id: ID!) {
    bookInstance(id: $id) {
      id
      book {
        title
      }
      imprint
      status
      url
    }
  }
`;
