import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

export default function BookList() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(BOOK_LIST);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">author</TableCell>
            <TableCell align="right">genre</TableCell>
            <TableCell align="right">isbn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.books.map(book => (
            <TableRow key={book.id}>
              <TableCell component="th" scope="row">
                <Link to={book.url}>{book.title}</Link>
              </TableCell>
              <TableCell align="right">
                {book.authors.map(author => (
                  <span style={{ display: 'block' }} key={author.id}>
                    {author.name}
                  </span>
                ))}
              </TableCell>
              <TableCell align="right">
                {book.genres.map(genre => (
                  <span style={{ display: 'block' }} key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </TableCell>
              <TableCell align="right">{book.isbn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

const BOOK_LIST = gql`
  query {
    books {
      id
      title
      isbn
      url
      authors {
        id
        name
      }
      genres {
        id
        name
      }
    }
  }
`;
