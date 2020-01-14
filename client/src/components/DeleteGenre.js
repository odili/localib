import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Ul, Li } from './elements/Li';
import SmallTitle from './elements/SmallTitle';

export default function DeleteGenre(props) {
  let history = useHistory();
  const { data } = useQuery(GET_GENRE, {
    variables: { id: props.id },
  });
  const [deleteAuthor] = useMutation(DELETE_GENRE, {
    onCompleted: () => history.push('/'),
    onError: err => console.log(err),
  });

  const handleCancel = () => {
    props.onClose();
  };

  const handleOk = () => {
    deleteAuthor({
      variables: { id: props.id },
    });
  };

  return ReactDOM.createPortal(
    <Dialog
      disableBackdropClick
      onEscapeKeyDown={handleCancel}
      maxWidth="md"
      aria-labelledby="confirmation-dialog-title"
      {...props}
    >
      <DialogTitle id="confirmation-dialog-title">Delete Genre</DialogTitle>
      <DialogContent dividers>
        <h2>{data.genre.name}</h2>
        {data.genre.books.length > 0 ? (
          <>
            <p>{`Delete the following books before deleting Genre`}</p>
            <SmallTitle>books</SmallTitle>
            <Ul>
              {data.genre.books.map(book => (
                <Li key={book.id}>{book.title}</Li>
              ))}
            </Ul>
          </>
        ) : (
          `Are you sure you want to Delete Genre`
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        {data.genre.books.length > 0 ? (
          ''
        ) : (
          <Button onClick={handleOk} color="secondary">
            Delete
          </Button>
        )}
      </DialogActions>
    </Dialog>,
    document.getElementById('delete-portal')
  );
}

const GET_GENRE = gql`
  query Genre($id: ID!) {
    genre(id: $id) {
      id
      name
      books {
        id
        title
      }
    }
  }
`;

const DELETE_GENRE = gql`
  mutation DeleteGenre($id: ID!) {
    deleteGenre(id: $id) {
      url
    }
  }
`;
