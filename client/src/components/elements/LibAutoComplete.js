import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import Chip from '@material-ui/core/Chip';
import { useField } from 'formik';

// const LibTextField = props => {
//   const [field, meta] = useField(props.name);
//   const errorText = meta.error && meta.touched ? meta.error : '';
//   return (
//     <TextField
//       {...field}
//       {...props}
//       helperText={errorText}
//       error={!!errorText}
//     />
//   );
// };

export const LibAutoComplete = props => {
  const [field, meta] = useField(props.name);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <Autocomplete
      multiple={props.multiple}
      name={props.name}
      options={props.options}
      getOptionLabel={option => option.name}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={params => (
        <TextField
          name={props.name}
          {...field}
          label={props.label}
          {...params}
          variant="filled"
          helperText={errorText}
          error={!!errorText}
          fullWidth
        />
      )}
    />
  );
};
