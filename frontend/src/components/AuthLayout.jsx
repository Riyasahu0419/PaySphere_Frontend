import React from 'react';
import { Container, Paper, Box, Typography } from '@mui/material';

const AuthLayout = ({ children, title }) => {
  return (
    <Container maxWidth="sm" className="py-8">
      <Paper elevation={3} className="p-8">
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            School Payments Dashboard
          </Typography>
          <Typography variant="h5" component="h2" color="textSecondary">
            {title}
          </Typography>
        </Box>
        {children}
      </Paper>
    </Container>
  );
};

export default AuthLayout;