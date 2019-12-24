import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { Ul, Li } from './elements/Li';
import SmallTitle from './elements/SmallTitle';

export default function DeleteAuthor(props) {
  let history = useHistory();
  const { data } = useQuery(AUTHOR_DETAILS, {
    variables: { id: props.id },
  });
  const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
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
      <DialogTitle id="confirmation-dialog-title">Delete Author</DialogTitle>
      <DialogContent dividers>
        <h2>{data.author.name}</h2>
        {data.author.books.length > 0 ? (
          <>
            <p>{`Delete the following books before deleting Author`}</p>
            <SmallTitle>books</SmallTitle>
            <Ul>
              {data.author.books.map(book => (
                <Li key={book.id}>{book.title}</Li>
              ))}
            </Ul>
          </>
        ) : (
          `Are you sure you want to Delete Author`
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        {data.author.books.length > 0 ? (
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

const AUTHOR_DETAILS = gql`
  query Author($id: ID!) {
    author(id: $id) {
      id
      name
      books {
        id
        title
      }
      url
    }
  }
`;

const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
      url
    }
  }
`;
