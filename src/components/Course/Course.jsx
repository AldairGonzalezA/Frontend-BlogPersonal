import { Input, Box, IconButton,HStack, } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { CourseCard } from './CourseCard.jsx';

export const Courses = ({courses}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = () => {
        setSearchQuery(searchTerm);
    }

    const filteredCourses = searchQuery?.trim()
    ? courses?.filter((prov) => 
        prov.course.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : courses;
    return(
        <Box bg="#005C53" 
        minH="100vh" 
        w="100vw" 
        p={4} 
        boxSizing="border-box"
        overflow='hidden'
        >
            <HStack spacing={4}>
                <Input variant='outline'
                     placeholder='Search Course'
                     value={searchTerm}
                     onChange={handleSearchTermChange}
                     ml="27%"
                     maxWidth="500px"
                     border="1px"
                     backgroundColor="white"
                     mt="20px"
                     color='black'
                    />
                    <IconButton aria-label='Search database' icon={<SearchIcon />} maxW="30px"
                        onClick={handleSearch}
                    />
            </HStack>
            <Box display="flex" m={4} p={5}>
                {filteredCourses.map((c) => (
                    <CourseCard
                    key={c._id}
                    id={c._id}
                    course={c.course}
                    description={c.description}
                    image={c.image}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default Courses;