import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DisplayContent from '../components/elements/DisplayContent';
import { LibTextField } from '../components/elements/LibTextField';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';
import { LibForm } from '../components/elements/LibForm';
import { TextField, Chip } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const UpdateBook = () => {
  let { id } = useParams();
  let history = useHistory();
  const { loading, error, data } = useQuery(BOOK_DETAILS, {
    variables: { id },
  });
  let [updateBook] = useMutation(UPDATE_BOOK, {
    onCompleted: data => {
      history.push(data.updateBook.url);
    },
    onError: err => console.log(err),
  });

  if (loading) {
    return <DisplayContent>Loading...</DisplayContent>;
  }
  if (error) {
    return <DisplayContent>Error: {error}</DisplayContent>;
  }

  return (
    <DisplayContent>
      <h1>Update Book</h1>
      <Formik
        initialValues={{
          title: data.book.title,
          summary: data.book.summary,
          isbn: data.book.isbn,
          genres: data.book.genres.map(ids => ({ id: ids.id })),
          authors: data.book.authors.map(ids => ({ id: ids.id })),
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
          updateBook({
            variables: {
              id,
              input: values,
            },
          });
        }}
      >
        {({ values, setFieldValue }) => (
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

                setFieldValue('authors', authorsInput, true);
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

            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </LibForm>
        )}
      </Formik>
    </DisplayContent>
  );
};

export default UpdateBook;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
      id
      url
    }
  }
`;

const BOOK_DETAILS = gql`
  query BookDetails($id: ID!) {
    book(id: $id) {
      id
      title
      isbn
      summary
      authors {
        id
        name
      }
      genres {
        id
        name
      }
    }
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
