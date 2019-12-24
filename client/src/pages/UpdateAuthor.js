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

const UpdateAuthor = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_AUTHOR, {
    variables: { id },
  });
  let history = useHistory();
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    onCompleted: data => history.push(data.updateAuthor.url),
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
      <h1>Update Author</h1>
      <Formik
        initialValues={{
          firstName: data.author.firstName,
          familyName: data.author.familyName,
          dateOfBirth: data.author.dobInput,
          dateOfDeath: data.author.dodInput || undefined,
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
          updateAuthor({
            variables: { id, input: values },
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            startIcon={<SaveIcon />}
          >
            update
          </Button>
        </LibForm>
      </Formik>
    </DisplayContent>
  );
};

export default UpdateAuthor;

const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($id: ID!, $input: AuthorUpdateInput!) {
    updateAuthor(id: $id, input: $input) {
      id
      url
    }
  }
`;

const GET_AUTHOR = gql`
  query Author($id: ID!) {
    author(id: $id) {
      id
      firstName
      familyName
      dobInput
      dodInput
    }
  }
`;
