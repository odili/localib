import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import FrontPage from './pages/FrontPage';
import AddAuthor from './pages/AddAuthor';
import AddBook from './pages/AddBook';
import AddGenre from './pages/AddGenre';
import UpdateBookInstance from './pages/UpdateBookInstance';
import Author from './pages/Author';
import Book from './pages/Book';
import Genre from './pages/Genre';
import Genres from './pages/Genres';
import BookInstance from './pages/BookInstance';
import UpdateAuthor from './pages/UpdateAuthor';
import UpdateGenre from './pages/UpdateGenre';
import UpdateBook from './pages/UpdateBook';
import AddBookInstance from './pages/AddBookInstance';
import Authors from './pages/Authors';
import Books from './pages/Books';
import BookInstances from './pages/BookInstances';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <FrontPage />
          </Route>
          <Route exact path="/author/add">
            <AddAuthor />
          </Route>
          <Route exact path="/author/edit/:id">
            <UpdateAuthor />
          </Route>
          <Route path="/author/:id">
            <Author />
          </Route>
          <Route path="/authors">
            <Authors />
          </Route>

          <Route exact path="/book/add">
            <AddBook />
          </Route>
          <Route exact path="/book/edit/:id">
            <UpdateBook />
          </Route>
          <Route path="/book/:id">
            <Book />
          </Route>
          <Route path="/books">
            <Books />
          </Route>

          <Route exact path="/genre/add">
            <AddGenre />
          </Route>
          <Route exact path="/genre/edit/:id">
            <UpdateGenre />
          </Route>
          <Route path="/genre/:id">
            <Genre />
          </Route>
          <Route path="/genres">
            <Genres />
          </Route>
          <Route exact path="/bookinstance/add">
            <AddBookInstance />
          </Route>
          <Route exact path="/bookinstance/edit/:id">
            <UpdateBookInstance />
          </Route>
          <Route path="/bookinstance/:id">
            <BookInstance />
          </Route>
          <Route path="/bookinstances">
            <BookInstances />
          </Route>
        </Switch>
      </main>
      <footer>{new Date().getFullYear()} &#169; NUBIIT</footer>
    </BrowserRouter>
  );
}
export default App;
