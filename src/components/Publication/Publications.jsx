import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Input, IconButton, HStack } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import { usePublications } from '../../shared/hooks/usePublications.jsx';
import { PublicationCard } from './PublicationsCard.jsx';

export const Publications = () => {
    const { id } = useParams();
    const { publications, getPublications } = usePublications();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (id) {
        getPublications(id);
        }
    }, [id, getPublications]);

    const handleBack = () => {
        navigate('/');
    }

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        setSearchQuery(searchTerm);
    };

    const filteredPublications = searchQuery.trim()
        ? publications.filter(pub =>
            pub.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : publications;

    return (
        <Box>
            <HStack spacing={4} mb="20px" justifyContent="center">
                <Input
                variant="outline"
                placeholder="Buscar publicación"
                value={searchTerm}
                onChange={handleSearchTermChange}
                maxWidth="500px"
                border="1px"
                backgroundColor="white"
                />
                <IconButton
                aria-label="Buscar publicaciones"
                icon={<SearchIcon />}
                maxW="30px"
                onClick={handleSearch}
                />
                <IconButton
                icon={<CloseIcon/>}
                onClick={handleBack}
                aria-label='Cerrar'
                />
            </HStack>

            <Box>
                {filteredPublications.length === 0 ? (
                <Box textAlign="center" mt="20px" color="gray.500">
                No posts found.
                </Box>
                ) : (
                filteredPublications.map(pub => (
                    <PublicationCard
                    key={pub._id}
                    title={pub.title}
                    course={pub.course}
                    mainText={pub.mainText}
                    comments={pub.comments}
                    publicationId={pub._id}
                    />
                ))
                )}
            </Box>
        </Box>
    );
};
