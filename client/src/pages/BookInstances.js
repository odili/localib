import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DisplayContent from '../components/elements/DisplayContent';
import BookInstanceList from '../components/BookInstanceList';

const BookInstances = () => {
  return (
    <DisplayContent>
      <h1>BookInstances</h1>
      <div className="head-control">
        <EqualizerIcon />
        <Link to="/bookinstance/add">
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
      <BookInstanceList />
    </DisplayContent>
  );
};

export default BookInstances;
