import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import capitalizeFirstLetter from '../helpers/capitalizeFirstLetter';
import { Guess, selectGuesses } from '../store';

function GuessList() {
  const { guesses } = useSelector(selectGuesses);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: { xs: 0.9, md: 600 },
        rowGap: 2,
      }}
    >
      <Typography variant="h2" fontSize={32} color="white">
        Previous Guesses
      </Typography>
      <Container
        sx={{
          border: '1px solid white',
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: { xs: 0.9, md: 600 },
          minHeight: 300,
          rowGap: 2,
          py: 2,
        }}
      >
        {guesses.map((g: Guess) => (
          <Box
            sx={{
              alignItems: 'center',
              boxSizing: 'border-box',
              columnGap: 2,
              display: 'flex',
            }}
          >
            <Typography>Name: {capitalizeFirstLetter(g.name)}</Typography>
            <Typography>
              Country:{' '}
              {g.nationality.countryCode
                ? g.nationality.countryCode
                : "[ Couldn't guess ]"}
            </Typography>
            <Typography>
              Possibility: {Math.round(g.nationality.probability * 100)}%
            </Typography>
          </Box>
        ))}
      </Container>
    </Container>
  );
}

export default GuessList;
