import {
  Box,
  Button,
  Container,
  FormLabel,
  Snackbar,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addGuess } from '../store';

function GuessForm() {
  const [guess, setGuess] = React.useState<string>();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(false);
  const [snackbarText, setSnackbarText] = React.useState<string>();

  const dispatch = useDispatch();

  const handleGuessChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setGuess(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!guess) {
      setSnackbarOpen(true);
      setSnackbarText('Please enter a name in English');
      setIsSubmitting(false);
      return;
    }

    if (!/^[A-Za-z]*$/.test(guess)) {
      console.log('first');
      setSnackbarOpen(true);
      setSnackbarText('Name must be in English');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await axios({
        method: 'GET',
        url: 'http://localhost:5000/whoami',
        params: { name: guess },
      });

      dispatch(
        addGuess({
          ...result.data,
          name: guess,
        })
      );
    } catch (err) {
      console.log(err);
      setSnackbarOpen(true);
      setSnackbarText('Somthing went wrong');
    }

    setIsSubmitting(false);
  };

  return (
    <Container
      id="guess-form"
      sx={{
        width: { xs: 0.9, md: 600 },
      }}
    >
      <FormLabel
        htmlFor="guess"
        sx={{
          alignItems: 'flex-start',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 12,
          mb: 1,
        }}
      >
        Enter Name:
      </FormLabel>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 4,
          width: 1,
        }}
      >
        <TextField
          name="guess"
          id="guess"
          type="text"
          value={guess}
          onChange={handleGuessChange}
          sx={{
            width: 1,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiOutlinedInput-root ': {
              color: 'white',
              maxHeight: 40,
            },
          }}
        />

        <Button
          id="submit-btn"
          type="submit"
          variant="outlined"
          disabled={isSubmitting || !guess}
          sx={{
            color: 'white',
            borderColor: 'white',
          }}
        >
          Guess
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarText}
      />
    </Container>
  );
}

export default GuessForm;
