// Libraries
import {type UseQueryOptions, useQuery} from '@tanstack/react-query';

// Constants
import {QUERY_KEYS} from '~/constants/queries';

// Services
import {googleServices} from '~/services/google';

type UseAutoCompleteProps<T> = {
  query: string;
  options?: UseQueryOptions<any[], unknown, T, any[]>;
};

type useGetPlaceDetailsProps<T> = {
  placeId?: string;
  options?: UseQueryOptions<any[], unknown, T, any[]>;
};

export const useAutoComplete = <T>(props: UseAutoCompleteProps<T>) => {
  const {query, options} = props || {};

  return useQuery({
    queryKey: [QUERY_KEYS.AUTOCOMPLETE, query],
    queryFn: () => googleServices.autoComplete(query || ''),
    enabled: !!query,
    ...options,
  });
};

export const useGetPlaceDetails = <T>(props: useGetPlaceDetailsProps<T>) => {
  const {placeId, options} = props || {};

  return useQuery({
    queryKey: [QUERY_KEYS.PLACE_DETAILS, placeId],
    queryFn: () => googleServices.autoComplete(placeId || ''),
    enabled: !!placeId,
    ...options,
  });
};
