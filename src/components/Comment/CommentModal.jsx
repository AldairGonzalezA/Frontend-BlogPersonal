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
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { createComment, updateComment, deleteComment } from '../../services';
  import { usePublications } from '../../shared/hooks/usePublications.jsx';
  import { useParams } from 'react-router-dom';
  
  export const CommentsModal = ({ isOpen, onClose, comments = [], title }) => {
    const { getPublications } = usePublications();
    const { id } = useParams();
    const [formData, setFormData] = useState({
      title: title,
      publisher: '',
      text: ''
    });
  
    const [isEditing, setIsEditing] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
  
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
  
      const commentData = {
        ...formData,
        ...(formData.publisher.trim() === "" && { publisher: undefined }),
      };
  
      try {
        if (isEditing && editCommentId) {
          await updateComment(editCommentId, commentData); // Actualiza
        } else {
          await createComment(commentData); // Crea nuevo
        }
  
        await getPublications(id);
  
        // Reset form
        setFormData({ title: title, publisher: '', text: '' });
        setIsEditing(false);
        setEditCommentId(null);
      } catch (error) {
        console.error("Error al enviar el comentario:", error);
      }
    };
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl" bg="#D6D58E">
        <ModalOverlay />
        <ModalContent bg="#042940" color="white">
          <ModalHeader>Comentarios</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" spacing={3} w="100%">
              {comments.length === 0 ? (
                <Text>No hay comentarios aún.</Text>
              ) : (
                [...comments]
                  .sort((a, b) => new Date(b.datePublication) - new Date(a.datePublication))
                  .map((c) => (
                    <VStack key={c._id}>
                      <Card w="100%" bg="#005C53" color="white">
                        <CardHeader display="flex" alignItems="center" gap={4}>
                          <Avatar src='https://bit.ly/broken-link' />
                          <Heading size='md'>{c.publisher}</Heading>
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

                            <Button
                                mt={2}
                                size="sm"
                                colorScheme="yellow"
                                onClick={() => {
                                setFormData({
                                    title: title,
                                    publisher: c.publisher || '',
                                    text: c.text
                                });
                                setEditCommentId(c._id);
                                setIsEditing(true);
                                }}
                            >
                                Editar
                            </Button>

                            <Button
                                mt={2}
                                ml={2}
                                size="sm"
                                colorScheme="red"
                                onClick={async () => {
                                const confirm = window.confirm("¿Estás seguro de que deseas eliminar este comentario?");
                                if (confirm) {
                                    try {
                                    await deleteComment(c._id);
                                    await getPublications(id);
                                    } catch (err) {
                                    console.error("Error al eliminar comentario:", err);
                                    }
                                }
                                }}
                            >
                                Eliminar
                            </Button>
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
                  placeholder="Tu nombre o vacío"
                  value={formData.publisher}
                  onChange={handleChange}
                  bg="white"
                  color="black"
                />
              </FormControl>
  
              <FormControl mt={4} isRequired>
                <FormLabel>Comentario</FormLabel>
                <Input
                  name='text'
                  placeholder="Escribe un comentario"
                  value={formData.text}
                  onChange={handleChange}
                  bg="white"
                  color="black"
                />
              </FormControl>
  
              <Button
                mt={4}
                colorScheme="green"
                type="submit"
                width="100%"
              >
                {isEditing ? "Actualizar Comentario" : "Agregar Comentario"}
              </Button>
  
              {isEditing && (
                <Button
                  mt={2}
                  colorScheme="red"
                  variant="outline"
                  width="100%"
                  onClick={() => {
                    setFormData({ title: title, publisher: '', text: '' });
                    setIsEditing(false);
                    setEditCommentId(null);
                  }}
                >
                  Cancelar edición
                </Button>
              )}
            </form>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  