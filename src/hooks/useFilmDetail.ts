import { useEffect, useState } from "react";
import { IFilmDetail } from "../shared/types";

const useFilmDetail = ( film? : IFilmDetail) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<any>()
    const [error, setError] = useState<string>()

    useEffect(() => {
      const fetchFilmDetail = async (film : IFilmDetail) => {
        try {
          const [year] = film.release_date.split('-');
          const response = await fetch(`http://www.omdbapi.com/?apikey=b9a5e69d&t=${film.title}&y=${year}&plot=full`);
          const res = await response.json();
          if (!response.ok) {
            setError(res.message);
            setIsLoading(false);
            return;
          }
          setData(res);
          setIsLoading(false);
        } catch (error : any ) {
          setError(error.message);
          setIsLoading(false);
        }
      };
      if(film) {
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