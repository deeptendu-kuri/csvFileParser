import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

// Custom styled components for unique styling
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F0F4F8', // Very light blue, soothing
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#2C3E50', // Dark blue for contrast
  color: '#ECF0F1', // Light text color for better readability
  '&:hover': {
    backgroundColor: '#34495E', // Slightly darker on hover
  },
  borderRadius: '8px',
  padding: theme.spacing(1, 4),
  marginTop: theme.spacing(2),
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'Admin' && password === 'Admin123') {
      enqueueSnackbar('Login Successful', { variant: 'success' });
      navigate('/dashboard');
    } else {
      enqueueSnackbar('Invalid Credentials', { variant: 'error' });
    }
  };

  return (
    // Full viewport height container with background color
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#D6EAF8', /* Light blue background */
      width: '100vw' 
    }}>
      <StyledPaper elevation={3}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ color: '#2C3E50', mb: 3 }}>
            Sign in
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#34495E',
                },
                '&:hover fieldset': {
                  borderColor: '#2C3E50',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2C3E50',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#34495E',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#34495E',
                },
                '&:hover fieldset': {
                  borderColor: '#2C3E50',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#2C3E50',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#34495E',
              },
            }}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleLogin}
          >
            Sign In
          </StyledButton>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default Login;