import { useState } from "react";
import { updateComment as updateCommentService } from "../../services";
import toast from 'react-hot-toast';

export const useCourses = () => {
    const [courses, setCourses] = useState(null);


    const updateCourseComment = async (commentId, newComment) => {
        try {
            const response = await updateCommentService(commentId, newComment);
            toast.success("Comentario actualizado correctamente");

            await getCourses();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "Error al actualizar el comentario"
            );
        }
    }

    return {
        getCourses,
        updateCourseComment,
        allCourses: courses?.courses
    };
}
