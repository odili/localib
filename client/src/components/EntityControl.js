import React from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

export default function EntityControl({ onClick, url }) {
  return (
    <div className="control">
      <IconButton aria-label="delete" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
      <Link to={url}>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </Link>
    </div>
  );
}
