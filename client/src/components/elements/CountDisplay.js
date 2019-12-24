import React from 'react';
import { Paper, Typography } from '@material-ui/core';
// import styled from 'styled-components';

export default function CountDisplay({ count, title }) {
  return (
    <Paper className="show-count">
      <Typography variant="h4" component="span">
        {count}
      </Typography>
      <Typography component="p">{title}</Typography>
    </Paper>
  );
}

// const CountDisplay = styled(Count)`
//   text-align: center;
//   padding: 1.5rem 0;

//   p {
//     text-transform: uppercase;
//     font-size: 0.75rem;
//   }
// `;

// export default CountDisplay;
