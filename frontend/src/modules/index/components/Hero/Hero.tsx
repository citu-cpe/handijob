import React from 'react';
import styles from './Hero.module.scss';
import NextLink from 'next/link';
import { AiFillFormatPainter } from 'react-icons/ai';
import { MdOutlineComputer, MdPhonelink } from 'react-icons/md';
import { Box, Link, Divider, Center } from '@chakra-ui/react';
import { GiPencilBrush } from 'react-icons/gi';
import { ImBook, ImFileVideo } from 'react-icons/im';
import { Category } from './Category';

export const Hero = () => {
  return (
    <div>
      <div>
        <div className={styles.hero}>
          <div className={styles.left}>
            <div className={styles.imgContainer}>
              <img
                src='/logo-icon.png'
                style={{ width: '12rem', textAlign: 'center' }}
              />
            </div>
            <h1 className={styles.heading}>Apply to HandIJob!</h1>
            <p>Take your career further with HandIJob</p>
            <Box mt='10'>
              <NextLink href='/register' passHref>
                <Link
                  bg='teal.500'
                  color='teal.50'
                  py='4'
                  px='8'
                  rounded='full'
                >
                  Get Started
                </Link>
              </NextLink>
            </Box>
          </div>
          <div className={styles.right}>
            <img src='/landing.svg' alt='landing' />
          </div>
        </div>
      </div>
      <Divider mt='200px' />
      <Center h='100px' mt='15px' mb='80px'>
        <h1 className={styles.heading}>Explore our marketplace!</h1>
      </Center>
      <div className={styles.categoryContainer}>
        <Category type={MdOutlineComputer} text='IT' />
        <Category type={GiPencilBrush} text='Graphics & Art' />
        <Category type={MdPhonelink} text='Gadget Repair' />
        <Category type={ImBook} text='Literature' />
      </div>
      <div className={styles.categoryContainer}>
        <Category type={ImFileVideo} text='Video Editing' />
        <Category type={AiFillFormatPainter} text='Skilled Trades' />
      </div>
    </div>
  );
};
