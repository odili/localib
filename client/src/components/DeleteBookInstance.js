import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

export default function DeleteBookInstance(props) {
  let history = useHistory();
  const { data } = useQuery(BOOK_INSTANCE_DETAILS, {
    variables: { id: props.id },
  });
  const [deleteBookInstance] = useMutation(DELETE_BOOK_INSTANCE, {
    onCompleted: () => history.push('/'),
    onError: err => console.log(err),
  });

  const handleCancel = () => {
    props.onClose();
  };

  const handleOk = () => {
    deleteBookInstance({
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
      <DialogTitle id="confirmation-dialog-title">Delete Book</DialogTitle>
      <DialogContent dividers>
        <h2>{data.bookInstance.imprint}</h2>
        Are you sure you want to Delete Book Copy?
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>

        <Button onClick={handleOk} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>,
    document.getElementById('delete-portal')
  );
}

const BOOK_INSTANCE_DETAILS = gql`
  query BookInstance($id: ID!) {
    bookInstance(id: $id) {
      id
      imprint
      url
    }
  }
`;

const DELETE_BOOK_INSTANCE = gql`
  mutation DeleteBookInstance($id: ID!) {
    deleteBookInstance(id: $id) {
      url
    }
  }
`;
