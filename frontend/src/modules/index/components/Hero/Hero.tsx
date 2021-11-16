import React from 'react';
import styles from './Hero.module.scss';
import NextLink from 'next/link';
import { Box, Link } from '@chakra-ui/react';

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.heading}>Apply to HandIJob!</h1>
        <p>Take your career further with HandIJob</p>
        <Box mt='10'>
          <NextLink href='/register' passHref>
            <Link bg='teal.500' color='teal.50' py='4' px='8' rounded='full'>
              Get Started
            </Link>
          </NextLink>
        </Box>
      </div>
      <div className={styles.right}>
        <img src='/landing.svg' alt='landing' />
      </div>
    </div>
  );
};
