import React from 'react';
import './Styles/base.scss';
import PokemonInformation from './Information/PokemonInformation';
import SearchBar from './Search/SearchBar';

function App() {
  return (
      <>
        <SearchBar />
        <PokemonInformation />
      </>
  );
}

export default App;