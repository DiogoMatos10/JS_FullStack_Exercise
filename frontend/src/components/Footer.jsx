import React from 'react';
import { Typography, Box } from '@mui/material';
import './Footer.css';

function Footer() {
  return (
    <Box className="footer-container">
      <Typography variant="body2" className="footer-text">
        This website was made by Diogo Matos at the request of Engine IA for their Code Challenge.
      </Typography>
    </Box>
  );
}

export default Footer;
