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
import { useHistory, useParams } from 'react-router-dom';
import { LibForm } from '../components/elements/LibForm';

const AddBookInstance = () => {
  let { id } = useParams();
  let history = useHistory();
  const { loading, error, data } = useQuery(BOOK_INSTANCE_DETAILS, {
    variables: { id },
  });
  const [updateBookCopies] = useMutation(UPDATE_BOOK_INSTANCE, {
    onCompleted: data => {
      history.push(data.updateBookInstance.url);
    },
    onError: err => console.log(err),
  });
  const status = ['AVAILABLE', 'MAINTENANCE', 'LOANED', 'RESERVED'];

  const cancelUpdate = () => {
    history.push(data.bookInstance.url);
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
          book: { id: data.bookInstance.book.id },
          imprint: data.bookInstance.imprint,
          status: data.bookInstance.status,
          dueBack: data.bookInstance.dueBackInput || undefined,
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
          console.log(values);
          updateBookCopies({
            variables: {
              id,
              input: {
                ...values,
                imprint: values.imprint.trim(),
              },
            },
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
              onClick={cancelUpdate}
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
              add
            </Button>
          </div>
        </LibForm>
      </Formik>
    </DisplayContent>
  );
};

export default AddBookInstance;

const BOOK_INSTANCE_DETAILS = gql`
  query BookInstanceDetails($id: ID!) {
    bookInstance(id: $id) {
      id
      status
      imprint
      dueBack
      url
      book {
        id
        title
      }
    }
    books {
      id
      title
    }
  }
`;

const UPDATE_BOOK_INSTANCE = gql`
  mutation UpdateBookInstance($id: ID!, $input: UpdateBookInstanceInput!) {
    updateBookInstance(id: $id, input: $input) {
      id
      url
    }
  }
`;
