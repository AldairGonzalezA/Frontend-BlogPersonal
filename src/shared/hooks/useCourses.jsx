import { useState } from "react";
import { getCourses as getCoursesRequest } from "../../services";
import toast from 'react-hot-toast';

export const useCourses = () => {
    const [courses, setCourses] = useState(null);

    const getCourses = async () => {
        const coursesData = await getCoursesRequest();
        if(coursesData.error){
            return toast.error(
                coursesData.e?.response?.data || 'Error to show the products'
            )
        }
        
        setCourses({
            courses: coursesData.data.courses
        })

    }

    return {
        getCourses,
        allCourses: courses?.courses
    }
}