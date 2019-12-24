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
import Small from './elements/Small';

export default function DeleteBook(props) {
  let history = useHistory();
  const { data } = useQuery(BOOK_DETAILS, {
    variables: { id: props.id },
  });
  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: () => history.push('/'),
    onError: err => console.log(err),
  });

  const handleCancel = () => {
    props.onClose();
  };

  const handleOk = () => {
    deleteBook({
      variables: { id: props.id },
    });
  };

  const copies = data.bookInstances.filter(fx => fx.book.id === data.book.id);

  return ReactDOM.createPortal(
    <Dialog
      disableBackdropClick
      onEscapeKeyDown={handleCancel}
      maxWidth="md"
      aria-labelledby="confirmation-dialog-title"
      {...props}
    >
      <DialogTitle id="confirmation-dialog-title">Delete Book</DialogTitle>
      <DialogContent dividers>
        <h2>{data.book.title}</h2>
        {copies.length > 0 ? (
          <>
            <p>{`Delete the following copies of the book before deleting`}</p>
            <SmallTitle>Copies</SmallTitle>
            <Ul>
              {copies.map(ins => (
                <Li key={ins.id}>
                  {ins.imprint}
                  <br />
                  <Small status={ins.status}>{ins.status}</Small>
                </Li>
              ))}
            </Ul>
          </>
        ) : (
          `Are you sure you want to Delete Book?`
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        {copies.length > 0 ? (
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

const BOOK_DETAILS = gql`
  query Book($id: ID!) {
    book(id: $id) {
      id
      title
      url
    }
    bookInstances {
      id
      imprint
      status
      book {
        id
      }
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      url
    }
  }
`;
