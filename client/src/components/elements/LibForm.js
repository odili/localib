import { Form } from 'formik';
import styled from 'styled-components';

export const LibForm = styled(Form)`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-gap: 2rem;
  & .buttom-actions {
    text-align: center;
  }
  button[type='submit'] {
    margin-left: 1.5rem;
  }
`;
