import {
  Text,
  Flex,
  Box,
  Link,
  Container,
  Button,
  Img,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogout } from '../../../../modules/index/hooks/useLogout';
import { BellIcon } from '@chakra-ui/icons';
import { Notifications } from '../Notifications/Notifications';
import { useGetNotifications } from '../../../hooks/useGetNotifications';

interface NavbarProps {
  positionFixed?: boolean;
  loggedIn?: boolean;
}

export const Navbar = ({ positionFixed, loggedIn }: NavbarProps) => {
  const { mutate: logout, isLoading: logoutIsLoading } = useLogout();
  const { notificationsDTO, isLoading: notificationsIsLoading } =
    useGetNotifications();

  return (
    <Box
      as='nav'
      position={positionFixed ? 'fixed' : 'relative'}
      top='0'
      left='0'
      w='100%'
      bgColor='white'
      shadow='md'
      zIndex='100'
    >
      <Container maxW='container.xl'>
        <Flex justifyContent='space-between' alignItems='center' paddingY='4'>
          <Box>
            <NextLink href='/' passHref>
              <Link>
                <Img src='/logo-text.png' w='25%' />
              </Link>
            </NextLink>
          </Box>
          <Box>
            {loggedIn ? (
              <>
                <Popover>
                  <PopoverTrigger>
                    <Box pos='relative' display='inline'>
                      <IconButton
                        colorScheme='teal'
                        icon={<BellIcon />}
                        aria-label='notifications'
                        variant='ghost'
                        size='lg'
                        mr='4'
                      />
                      {notificationsDTO && notificationsDTO.numUnread > 0 && (
                        <Flex
                          justifyContent='center'
                          alignItems='center'
                          display='inline-flex'
                          pos='absolute'
                          top='-12px'
                          right='15px'
                          bgColor='red'
                          color='white'
                          rounded='full'
                          h='5'
                          w='5'
                          textAlign='center'
                          p='2'
                          cursor='pointer'
                          fontSize='xs'
                        >
                          <Text>{notificationsDTO?.numUnread}</Text>
                        </Flex>
                      )}
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader color='teal' fontWeight='bold'>
                      Notifications
                    </PopoverHeader>
                    <PopoverBody p='0'>
                      <Notifications
                        notifications={notificationsDTO?.notifications || []}
                        isLoading={notificationsIsLoading}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                <Button
                  mr='4'
                  colorScheme='teal'
                  variant='ghost'
                  py='4'
                  px='8'
                  rounded='full'
                  onClick={() => logout()}
                  isLoading={logoutIsLoading}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <NextLink href='/login' passHref>
                  <Link
                    mr='4'
                    bg='teal.50'
                    color='teal.500'
                    py='4'
                    px='8'
                    rounded='full'
                  >
                    Log In
                  </Link>
                </NextLink>
                <NextLink href='/register' passHref>
                  <Link
                    mr='4'
                    bg='teal.500'
                    color='teal.50'
                    py='4'
                    px='8'
                    rounded='full'
                  >
                    Register
                  </Link>
                </NextLink>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
