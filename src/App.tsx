import { Typography } from '@mui/material';
import React from 'react';
import './Styles/base.scss';
import NavBar from './Common/Components/NavBar';

function App() {
  return (
      <>
          <NavBar />

          <Typography variant='h1'>Poke API</Typography>
          <Typography variant='h3'>Please select a route from the nav bar.</Typography>
      </>
  );
}

export default App;