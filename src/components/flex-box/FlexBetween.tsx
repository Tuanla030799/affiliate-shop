import { Box, BoxProps } from '@mui/material';
import React from 'react';

const FlexBetween = ({ children, ...props }: BoxProps) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" {...props}>
    {children}
  </Box>
);

export default FlexBetween;
