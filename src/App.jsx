import { useCourses } from './shared/hooks/useCourses.jsx';
import Menu from './components/Dashboard/TabsMenu';
import { Route,Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Courses } from './components/Course/Course.jsx';
import { Publications } from './components/Publication/Publications.jsx';
import './App.css'

function App() {

  const { getCourses,allCourses} = useCourses();

  useEffect(() => {
    getCourses();
  },[])

  return (
    <>
      <Menu/>
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
  </>
  )
}

export default App
