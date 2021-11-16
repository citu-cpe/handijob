import { Box, Heading, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useGlobalStore } from '../../../stores';

interface SideNavbarLinkProps {
  linkText: string;
  href: string;
}

const SideNavbarLink = ({ linkText, href }: SideNavbarLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <NextLink href={href} passHref>
      <Link textDecoration='none' _hover={{ textDecoration: 'none' }}>
        <Heading
          color='teal'
          mb='4'
          size='md'
          bg={isActive ? 'teal.50' : undefined}
          _hover={{
            bg: 'teal.50',
          }}
          rounded='md'
          py='4'
          px='8'
          transition='background .2s ease-out'
        >
          {linkText}
        </Heading>
      </Link>
    </NextLink>
  );
};

export const SideNavbar = () => {
  const user = useGlobalStore((state) => state.user);

  return (
    <Box pl='10' pos='fixed'>
      <SideNavbarLink linkText='Home' href='/' />
      {user && user.employerId && (
        <SideNavbarLink linkText='My Job Openings' href='/my/job-openings' />
      )}
      {user && user.freelancerId && (
        <SideNavbarLink
          linkText='My Job Applications'
          href='/my/job-applications'
        />
      )}
    </Box>
  );
};
