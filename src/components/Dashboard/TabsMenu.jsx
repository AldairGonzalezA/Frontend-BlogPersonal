import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
} from '@chakra-ui/react';
import { FaHeart, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box bg="#042940" color="white" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} maxW="100%" w="100%">
        <HStack spacing={8} alignItems={'center'}>
          <Box fontWeight="bold" fontSize="xl">Personal Blog</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link onClick={()=> navigate('/')}>Blog</Link>
          </HStack>
        </HStack>

        {/* Right side items */}
        <Flex alignItems={'center'} gap={4}>
          <HStack>
            <FaHeart color="red" />
          </HStack>

          <IconButton
            as="a"
            href='https://github.com/AldairGonzalezA'
            icon={<FaGithub />}
            variant="ghost"
            aria-label="GitHub"
            color="white"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
