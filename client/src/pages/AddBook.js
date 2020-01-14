import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Cancel } from '@material-ui/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DisplayContent from '../components/elements/DisplayContent';
import { LibTextField } from '../components/elements/LibTextField';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { LibForm } from '../components/elements/LibForm';
import { Autocomplete } from '@material-ui/lab';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

const AddBook = () => {
  let history = useHistory();
  const { loading, error, data } = useQuery(GET_AUTHORS_GENRES);
  let [addBook] = useMutation(ADD_BOOK, {
    onCompleted: data => history.push(data.addBook.url),
    onError: err => console.log(err),
  });

  const cancelEntry = () => {
    history.push('/books');
  };

  if (loading) {
    return <DisplayContent>Loading...</DisplayContent>;
  }
  if (error) {
    return <DisplayContent>Error: {error}</DisplayContent>;
  }

  return (
    <DisplayContent>
      <h1>Add New Book</h1>
      <Formik
        initialValues={{
          title: '',
          summary: '',
          isbn: '',
          genres: [],
          authors: [],
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .min(7, 'Must be at least 7 characters')
            .required('Required'),
          summary: Yup.string()
            .min(20, 'Must be at least 20 characters')
            .required('Required'),
          isbn: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .required('Required'),
          genres: Yup.array().of(
            Yup.string()
              .required('Required')
              .min(1, 'Must have at least 1 Author')
          ),
          authors: Yup.array().of(
            Yup.string()
              .required('Required')
              .min(1, 'Must have at least 1 Author')
          ),
        })}
        onSubmit={values => {
          addBook({
            variables: {
              input: values,
            },
          });
        }}
      >
        {({ values, setFieldValue }) => (
          <>
            <LibForm>
              <LibTextField name="title" label="Book Title" variant="filled" />
              <LibTextField
                name="summary"
                label="Book Summary"
                multiline
                rows="5"
                variant="filled"
              />
              <LibTextField name="isbn" label="Book ISBN" variant="filled" />

              <Autocomplete
                multiple
                name="genres"
                onChange={(e, value) => {
                  let genresInput = [];
                  for (let obj of value) {
                    genresInput.push({ id: obj.id });
                  }
                  setFieldValue('genres', genresInput);
                }}
                options={data.genres}
                getOptionLabel={option => option.name}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.name}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    name="genres"
                    label="Book Genre(s)"
                    {...params}
                    variant="filled"
                    fullWidth
                  />
                )}
              />
              <Autocomplete
                multiple
                name="authors"
                onChange={(e, value) => {
                  let authorsInput = [];
                  for (let obj of value) {
                    authorsInput.push({ id: obj.id });
                  }
                  setFieldValue('authors', authorsInput);
                }}
                options={data.authors}
                getOptionLabel={option => option.name}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.name}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    name="authors"
                    label="Book Author(s)"
                    {...params}
                    variant="filled"
                    fullWidth
                  />
                )}
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
            {/* <pre>{JSON.stringify(values, 2, null)}</pre> */}
          </>
        )}
      </Formik>
    </DisplayContent>
  );
};

export default AddBook;

const ADD_BOOK = gql`
  mutation AddBook($input: BookInput!) {
    addBook(input: $input) {
      id
      url
    }
  }
`;

const GET_AUTHORS_GENRES = gql`
  query GetAuthorsGenres {
    authors {
      id
      name
    }
    genres {
      id
      name
    }
  }
`;
