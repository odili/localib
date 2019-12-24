import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import DisplayContent from '../components/elements/DisplayContent';
import GenreList from '../components/GenreList';

const Genres = () => {
  return (
    <DisplayContent>
      <h1>Genres</h1>
      <div className="head-control">
        <CollectionsBookmarkIcon />
        <Link to="/genre/add">
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
      <GenreList />
    </DisplayContent>
  );
};

export default Genres;
