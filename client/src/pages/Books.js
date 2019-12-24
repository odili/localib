import React from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import DisplayContent from '../components/elements/DisplayContent';
import BookList from '../components/BookList';

const Books = () => {
  return (
    <DisplayContent>
      <h1>Books</h1>
      <div className="head-control">
        <LibraryBooksIcon />
        <Link to="/book/add">
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </div>
      <BookList />
    </DisplayContent>
  );
};

export default Books;
