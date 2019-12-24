import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useHistory, useParams } from 'react-router-dom';
import DisplayContent from '../components/elements/DisplayContent';
import { LibTextField } from '../components/elements/LibTextField';
import { LibForm } from '../components/elements/LibForm';

const UpdateGenre = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_GENRE, {
    variables: { id },
  });
  let history = useHistory();
  const [updateGenre] = useMutation(UPDATE_GENRE_INPUT, {
    onCompleted: data => history.push(data.updateGenre.url),
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
      <h1>Update Genre</h1>
      <Formik
        initialValues={{
          name: data.genre.name,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .trim()
            .min(4, 'Must be at least 4 characters')
            .required('Required'),
        })}
        onSubmit={values => {
          updateGenre({
            variables: {
              id,
              input: values,
            },
          });
        }}
      >
        <LibForm>
          <LibTextField
            name="name"
            label="Genre Name"
            type="text"
            variant="filled"
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
      </Formik>
    </DisplayContent>
  );
};

export default UpdateGenre;

const UPDATE_GENRE_INPUT = gql`
  mutation UpdateGenre($id: ID!, $input: UpdateGenreInput!) {
    updateGenre(id: $id, input: $input) {
      id
      url
    }
  }
`;

const GET_GENRE = gql`
  query Genre($id: ID!) {
    genre(id: $id) {
      id
      name
    }
  }
`;
