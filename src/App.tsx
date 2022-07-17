import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import GuessForm from './components/GuessForm';
import GuessList from './components/GuessList';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1" fontSize={48} my={4}>
          Let us guess who you are
        </Typography>
      </header>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 4,
        }}
      >
        <GuessList />
        <GuessForm />
      </Container>
    </div>
  );
}

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
