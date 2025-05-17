import { Card, CardHeader, CardBody, CardFooter,SimpleGrid, Heading, Button,Text } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { CommentsModal } from '../Comment/CommentModal';

export const PublicationCard = ({title,datePublication,mainText,comments, publicationId}) => {
    const  { isOpen, onOpen, onClose} = useDisclosure(); 
    return (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            <Card>
                <CardHeader>
                <Heading size='md'>{title}</Heading>
                </CardHeader>
                <CardBody>
                <Text>{mainText}</Text>
                </CardBody>
                <Text>
                    {new Date(datePublication).toLocaleDateString("es-ES",{
                        day: "2-digit",
                        month: 'long',
                        year: 'numeric'
                    })}
                </Text>
                <CardFooter>
                <Button onClick={onOpen}>View comments</Button>

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
