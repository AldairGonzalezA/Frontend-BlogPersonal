import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
  Text,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  MoonIcon,
  SunIcon,
  SearchIcon,
  ChevronDownIcon
} from '@chakra-ui/icons';
import { FaHeart, FaGithub } from 'react-icons/fa';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} maxW="100%" w="100%">
        {/* Logo + Links */}
        <HStack spacing={8} alignItems={'center'}>
          <Box fontWeight="bold" fontSize="xl">chakra</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link href="#">Trending</Link>
            <Link href="#">Playground</Link>
            <Link href="#">Guides</Link>
            <Link href="#">Blog</Link>
          </HStack>
        </HStack>

        {/* Right side items */}
        <Flex alignItems={'center'} gap={4}>
          <HStack>
            <FaHeart color="red" />
            <Text fontWeight="bold">Sponsor</Text>
          </HStack>

          <Menu>
            <MenuButton as={Button} size="sm" rightIcon={<ChevronDownIcon />}>
              3.18.0
            </MenuButton>
            <MenuList>
              <MenuItem>3.18.0</MenuItem>
              <MenuItem>3.17.1</MenuItem>
              <MenuItem>3.16.0</MenuItem>
            </MenuList>
          </Menu>

          <Flex
            align="center"
            bg={useColorModeValue('gray.200', 'gray.700')}
            px={2}
            py={1}
            borderRadius="md"
          >
            <SearchIcon mr={2} />
            <Input
              variant="unstyled"
              placeholder="Search..."
              w="120px"
              _placeholder={{ color: 'gray.400' }}
            />
          </Flex>

          <IconButton
            icon={<FaGithub />}
            variant="ghost"
            aria-label="GitHub"
          />

          <IconButton
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle Theme"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
