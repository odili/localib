import React from 'react';
import { InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

const SearchBar = () => {
  return (
    <SearchWrapper>
      <Paper>
        <InputBase
          autoFocus={true}
          type="search"
          color="primary"
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
        <div>
          <SearchIcon />
        </div>
      </Paper>
    </SearchWrapper>
  );
};

export default SearchBar;

const SearchWrapper = styled.section`
  width: 100%;
  max-width: 960px;
  margin: 5rem auto;
  padding: 0 2rem;
  > div {
    background-color: lavender;
    padding: 1rem 1.5rem;
    display: grid;
    grid-template-columns: 1fr auto;
  }
  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;
