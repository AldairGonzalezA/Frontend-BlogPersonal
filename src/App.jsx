import { useCourses } from './shared/hooks/useCourses.jsx';
import Menu from './components/Dashboard/TabsMenu';
import { Route,Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Courses } from './components/Course/Course.jsx';
import { Publications } from './components/Publication/Publications.jsx';
import { Box } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" bg="gray.200" p={4} textAlign="center">
      <Text fontSize="sm">© 2025 Mi Sitio. Todos los derechos reservados.</Text>
    </Box>
  );
}
function App() {

  const { getCourses,allCourses} = useCourses();

  useEffect(() => {
    getCourses();
  },[])

  return (
    <>
      <Box>
      <Menu />
      <Routes>
        <Route
          path="/"
          element={
            allCourses ? (
              <Courses courses={allCourses} />
            ) : (
              <p>Loading courses...</p>
            )
          }
        />
        <Route path="/publications/:id" element={<Publications />} />
      </Routes>
    </Box>
  </>
  )
}

export default App
