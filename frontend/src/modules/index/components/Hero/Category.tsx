import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import styles from './Hero.module.scss';

export const Category = (props: any) => {
  const Type = props.type;
  return (
    <Box>
      <div className={styles.icon}>
        <Center>
          <Type size='5em' color='teal' />
        </Center>
      </div>
      <div className={styles.maincateg}>
        <p id={styles.categoryText}>{props.text}</p>
        <div id={styles.line}></div>
      </div>
    </Box>
  );
};
