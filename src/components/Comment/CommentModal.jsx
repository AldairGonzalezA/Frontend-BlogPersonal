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
  Text
} from '@chakra-ui/react';
import { useState } from 'react';

export const CommentsModal = ({isOpen,onClose, comments = [], publicationId}) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = async () => {
        if (newComment.trim() === "") return;

        try {
        // Aquí va la lógica de tu POST al backend
        const response = await fetch(`/api/comments/${publicationId}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: newComment }),
        });

        if (!response.ok) throw new Error("Error al agregar el comentario");

        setNewComment(""); // limpiar campo
        // Opcional: puedes recargar comentarios si el backend lo devuelve
        } catch (err) {
        console.error(err.message);
        }
    }

    return(
         <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Comentarios</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <VStack align="start" spacing={3}>
                    {comments.length === 0 ? (
                        <Text>No hay comentarios aún.</Text>
                    ) : (
                        comments.map((c) => (
                        <VStack key={c._id}>
                            <Text key={c._id}>• {c.text}</Text>
                            <Text key={c.publisher}>{c.publisher} </Text>
                        </VStack>
                        ))
                    )}
                </VStack>

                <Input
                    mt={5}
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                </ModalBody>
                <ModalFooter>
                <Button colorScheme="green" onClick={handleAddComment}>
                    Agregar Comentario
                </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
