import { useEffect, useState } from "react";
import { IFilmDetail } from "shared/types";
import { getFilmDetail } from 'services/api';
import {localStorageFn} from 'shared/helpers';

const useFilmDetail = ( film? : IFilmDetail) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<any>()
    const [error, setError] = useState<string>()
    

    useEffect(() => {

      const fetchFilmDetail = async (film : IFilmDetail) => {
        try {
          const {title, release_date } = film
          const res = await getFilmDetail({title,release_date})
          setData(res);
          localStorageFn.setItem(`${film.title} - ${film.release_date}`, res)
 
        } catch (error : any ) {
          setError(error.message);
        }
        setIsLoading(false);
      };

      
      if(film) {
          const item = localStorageFn.getItem(`${film.title} - ${film.release_date}`)
          if(item) {
            setData(item)
          } else
          fetchFilmDetail(film);
      }
      
    }, [film]);


    const responseData = {
      ratings: data?.Ratings || [],
      poster: data?.Poster || '',
    };

    return { isLoading, data : responseData, error };
  };
  
  export default useFilmDetail;