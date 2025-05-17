import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  Button,
  Text,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex
} from '@chakra-ui/react';
import { useState } from 'react';
import { createComment } from '../../services';
import { usePublications } from '../../shared/hooks/usePublications.jsx';
import { useParams } from 'react-router-dom';

export const CommentsModal = ({isOpen,onClose, comments = [], title}) => {
    const { getPublications } = usePublications();
    const {id} = useParams();
    const [formData, setFormData] = useState({
        title: title,
        publisher: '',
        text: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.text.trim()) return;

        
        await createComment(formData);
        await getPublications(id);
        // Limpia los campos excepto el título
        setFormData((prev) => ({
            ...prev,
            publisher: '',
            text: '',
        }));
    };

    return(
         <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Comentarios</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <VStack align="stretch" spacing={3} w="100%">
                    {comments.length === 0 ? (
                        <Text>No hay comentarios aún.</Text>
                    ) : (
                        comments.map((c) => (
                        <VStack key={c._id}>
                            <Card w="100%">
                                <CardHeader display="flex" alignItems="center" gap={4}>
                                    <Avatar src='https://bit.ly/broken-link' />
                                    <Heading size='md'> {c.publisher}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>{c.text}</Text>
                                    <Text>
                                        {new Date(c.datePublication).toLocaleDateString("es-ES", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </Text>
                                </CardBody>
                            </Card>
                        </VStack>
                        ))
                    )}
                </VStack>
                
                
                </ModalBody>
                <ModalFooter justifyContent="center" flexDirection="column" gap={3}>
                    <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                        <FormControl>
                        <FormLabel>User (opcional)</FormLabel>
                        <Input
                            name='publisher'
                            placeholder="Your name or vacío"
                            value={formData.publisher}
                            onChange={handleChange}
                        />
                        </FormControl>

                        <FormControl mt={4} isRequired>
                        <FormLabel>Comment</FormLabel>
                        <Input
                            name='text'
                            placeholder="Write a comment"
                            value={formData.text}
                            onChange={handleChange}
                        />
                        </FormControl>

                        <Button
                        mt={4}
                        colorScheme="green"
                        type="submit"
                        width="100%"
                        >
                        Agregar Comentario
                        </Button>
                    </form>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
