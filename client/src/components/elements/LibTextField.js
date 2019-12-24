import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';

export const LibTextField = props => {
  const [field, meta] = useField(props.name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      {...field}
      {...props}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
