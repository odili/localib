import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import DisplayContent from '../components/elements/DisplayContent';
import AuthorList from '../components/AuthorList';

const Authors = () => {
  return (
    <DisplayContent>
      <h1>Authors</h1>
      <div className="head-control">
        <PeopleIcon />
        <Link to="/author/add">
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
      <AuthorList />
    </DisplayContent>
  );
};

export default Authors;
