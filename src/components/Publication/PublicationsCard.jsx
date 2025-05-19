import { Card, CardHeader, CardBody, CardFooter,SimpleGrid, Heading, Button,Text } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { CommentsModal } from '../Comment/CommentModal';

export const PublicationCard = ({title,datePublications,mainText,comments, publicationId}) => {
    const  { isOpen, onOpen, onClose} = useDisclosure(); 
    return (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            <Card maxW='sm' margin={4} bg="#042940" color="white">
                <CardHeader>
                <Heading size='md'>{title}</Heading>
                </CardHeader>
                <CardBody borderTopWidth="1px" p={5}>
                <Text>{mainText}</Text>
                </CardBody>
                <Text>   
                    {new Date(datePublications).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    })}
                </Text>                
                <CardFooter borderTopWidth="1px" p={5}>
                <Button onClick={onOpen} variant='solid' colorScheme='blue'>View comments</Button>

                <CommentsModal
                    isOpen={isOpen}
                    onClose={onClose}
                    comments={comments}
                    publicationId={publicationId}
                    title={title}
                />
                </CardFooter>
            </Card>
        </SimpleGrid>
    )
}
