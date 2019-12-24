import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DisplayContent from '../components/elements/DisplayContent';
import { LibTextField } from '../components/elements/LibTextField';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { LibForm } from '../components/elements/LibForm';
import { libArrayObjectSort } from '../utils/libArrayObjectSort';
// import stringSort from '../utils/stringSort';

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
            {data.books.sort(libArrayObjectSort('title')).map(book => (
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Add
          </Button>
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
