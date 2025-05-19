import { Card, Button,Text, CardBody,Image, CardFooter,Stack, Heading,Divider, ButtonGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const CourseCard = ({ id, course, description, image }) => {

    const navigate = useNavigate();

    const handleNavigatePublications = () => {
        navigate(`/publications/${id}`)
    } 

    return (
        <Card maxW='sm' margin={4} backgroundColor="#042940" color='white'>
            <CardBody >
                <Image
                src={image}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{course}</Heading>
                <Text>
                    {description}
                </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='blue' onClick={handleNavigatePublications}>
                    View Publications
                </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}