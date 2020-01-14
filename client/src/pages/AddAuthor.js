import React from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Cancel } from '@material-ui/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DisplayContent from '../components/elements/DisplayContent';
import { LibTextField } from '../components/elements/LibTextField';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { LibForm } from '../components/elements/LibForm';

const AddAuthor = () => {
  let history = useHistory();
  const [addAuthor] = useMutation(ADD_AUTHOR, {
    onCompleted: data => history.push(data.addAuthor.url),
    onError: err => console.log(err),
  });

  const cancelEntry = () => {
    history.push('/authors');
  };
  return (
    <DisplayContent>
      <h1>Add New Author</h1>
      <Formik
        initialValues={{
          firstName: '',
          familyName: '',
          dateOfBirth: '',
          dateOfDeath: undefined,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .trim()
            .min(3, 'Must be at least 3 characters')
            .required('Required'),
          familyName: Yup.string()
            .trim()
            .min(3, 'Must be at least 3 characters')
            .required('Required'),
          dateOfBirth: Yup.date().required('Required'),
          dateOfDeath: Yup.date().nullable(true),
        })}
        onSubmit={values => {
          console.log(values);
          addAuthor({
            variables: { input: values },
          });
        }}
      >
        <LibForm>
          <LibTextField name="firstName" label="First Name" variant="filled" />
          <LibTextField
            name="familyName"
            label="Family Name"
            variant="filled"
          />
          <LibTextField
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <LibTextField
            name="dateOfDeath"
            label="Date of Death"
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

export default AddAuthor;

const ADD_AUTHOR = gql`
  mutation AddAuthor($input: AuthorInput!) {
    addAuthor(input: $input) {
      id
      url
    }
  }
`;
