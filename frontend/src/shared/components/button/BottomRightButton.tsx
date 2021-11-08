import { Box, Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

export const BottomRightButton = ({
  children,
  ...buttonProps
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <Box pos='fixed' bottom='20' right='20'>
      <Button {...buttonProps}>{children}</Button>
    </Box>
  );
};
