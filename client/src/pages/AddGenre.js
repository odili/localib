import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Cancel } from '@material-ui/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import DisplayContent from '../components/elements/DisplayContent';
import { LibTextField } from '../components/elements/LibTextField';
import { LibForm } from '../components/elements/LibForm';

const AddGenre = () => {
  let history = useHistory();
  const [addGenre] = useMutation(GENRE_INPUT, {
    onCompleted: data => history.push(data.addGenre.url),
    onError: err => console.log(err),
  });

  const cancelEntry = () => {
    history.push('/genres');
  };
  return (
    <DisplayContent>
      <h1>Add New Genre</h1>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .trim()
            .min(4, 'Must be at least 4 characters')
            .required('Required'),
        })}
        onSubmit={values => {
          addGenre({
            variables: {
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

export default AddGenre;

const GENRE_INPUT = gql`
  mutation AddGenre($input: GenreInput!) {
    addGenre(input: $input) {
      id
      url
    }
  }
`;
