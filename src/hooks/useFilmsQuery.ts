import {
    useQuery,
  } from '@tanstack/react-query'
  
import { films } from '../services/api'

export const useFilmsQuery = () => {
    const results = useQuery({ queryKey: ['films'], queryFn: films })
    return results;
};