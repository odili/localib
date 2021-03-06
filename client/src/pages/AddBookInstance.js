import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Cancel } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DisplayContent from '../components/elements/DisplayContent';
import { LibTextField } from '../components/elements/LibTextField';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { LibForm } from '../components/elements/LibForm';

const AddBookInstance = () => {
  let history = useHistory();
  const { loading, error, data } = useQuery(BOOKS);
  const [addBookCopies] = useMutation(ADD_BOOK_INSTANCE, {
    onCompleted: data => {
      history.push(data.addBookInstance.url);
    },
    onError: err => console.log(err),
  });
  const status = ['AVAILABLE', 'MAINTENANCE', 'LOANED', 'RESERVED'];

  const cancelEntry = () => {
    history.push('/bookinstances');
  };

  if (loading) {
    return <DisplayContent>Loading...</DisplayContent>;
  }
  if (error) {
    return <DisplayContent>Error: {error}</DisplayContent>;
  }

  return (
    <DisplayContent>
      <h1>Add Book Copies </h1>
      <Formik
        initialValues={{
          book: { id: '' },
          imprint: '',
          status: '',
          dueBack: undefined,
        }}
        validationSchema={Yup.object({
          book: Yup.object({
            id: Yup.string().required('Required'),
          }).required('Required'),
          imprint: Yup.string()
            .required('Required')
            .trim()
            .min(10, 'Must be at least 10 Characters'),
          status: Yup.string().required('Required'),
          dueBack: Yup.date(),
        })}
        onSubmit={values => {
          addBookCopies({
            variables: { input: values },
          });
        }}
      >
        <LibForm>
          <LibTextField
            name="book.id"
            label="Book Title"
            select
            helperText="Select Title"
            variant="filled"
          >
            {data.books.map(book => (
              <MenuItem key={book.id} value={book.id}>
                {book.title}
              </MenuItem>
            ))}
          </LibTextField>
          <LibTextField
            name="imprint"
            label="Book Publisher"
            variant="filled"
          />
          <LibTextField
            name="status"
            label="Status"
            select
            helperText="Select Availability"
            variant="filled"
          >
            {status.sort().map(avail => (
              <MenuItem key={avail} value={avail}>
                {avail}
              </MenuItem>
            ))}
          </LibTextField>

          <LibTextField
            name="dueBack"
            label="Date of Availability"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="buttom-actions">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              type="button"
              onClick={cancelEntry}
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </div>
        </LibForm>
      </Formik>
    </DisplayContent>
  );
};

export default AddBookInstance;

const BOOKS = gql`
  query Books {
    books {
      id
      title
    }
  }
`;

const ADD_BOOK_INSTANCE = gql`
  mutation AddBookInstance($input: BookInstanceInput!) {
    addBookInstance(input: $input) {
      id
      url
    }
  }
`;
