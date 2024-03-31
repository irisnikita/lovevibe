import {createWithCache, CacheLong, type WithCache} from '@shopify/hydrogen';
import {googleServices} from '~/services/google';
type AllCacheOptions = Parameters<WithCache>[1];

export function createGoogleClient({
  cache,
  waitUntil,
}: {
  cache: Cache;
  waitUntil: ExecutionContext['waitUntil'];
}) {
  const withCache = createWithCache({cache, waitUntil});

  async function query<T = any>(
    query: string,
    options: {
      variables?: object;
      cache: AllCacheOptions;
    } = {variables: {}, cache: CacheLong()},
  ) {
    return withCache(
      ['r&m', query, JSON.stringify(options.variables)],
      options.cache,
      async function () {
        // call to the API
        // const response = await fetch('https://rickandmortyapi.com/graphql', {
        //   method: 'POST',
        //   headers: {
        //     'Content-type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     query,
        //     variables: options.variables,
        //   }),
        // });

        const data = await googleServices.autoComplete(query || '');
        console.log('🚀 ~ data:', data);

        // if (!response.ok) {
        //   throw new Error(
        //     `Error fetching from rick and morty api: ${response.statusText}`,
        //   );
        // }

        // const json = await response.json<{data: T; error: string}>();

        return data;
      },
    );
  }

  return {query};
}
