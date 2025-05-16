import { useState, useCallback } from "react";
import { getPublications as getPublicationsRequest } from "../../services";
import toast from 'react-hot-toast';

export const usePublications = () => {
  const [publications, setPublications] = useState([]);

  const getPublications = useCallback(async (coursePublication) => {
    try {
      const response = await getPublicationsRequest(coursePublication);
      if (response.error) {
        toast.error(response.e?.response?.data || 'Error to show publications');
        return;
      }

      setPublications(response.data.publications);
    } catch (e) {
      toast.error('Error al mostrar las publicaciones');
    }
  }, []);


  const updatePublications = (updatedPublications) => {
    setPublications(updatedPublications);
  };

  return {
    publications,
    getPublications,
    updatePublications
  };
};