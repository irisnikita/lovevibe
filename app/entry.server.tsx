import type {EntryContext} from '@shopify/remix-oxygen';
import createEmotionServer from '@emotion/server/create-instance';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream, renderToString} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import createEmotionCache from './styles/createEmotionCache';
import ServerStyleContext from './styles/server.context';
import {CacheProvider} from '@emotion/react';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    styleSrc: [
      'https://cdn.shopify.com',
      'http://localhost:*',
      'https://fonts.googleapis.com',
    ],
    fontSrc: ['https://fonts.gstatic.com'],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  // if (isbot(request.headers.get('user-agent'))) {
  //   await body.allReady;
  // }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, max-age=0, s-maxage=0',
  );
  // responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
