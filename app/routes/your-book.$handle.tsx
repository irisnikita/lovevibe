/* eslint-disable react/no-unknown-property */
// Libraries
import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {json, useLoaderData} from '@remix-run/react';
import {ClientOnly} from 'remix-utils/client-only';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, ScrollControls} from '@react-three/drei';

// Components
import {Empty, Flex} from '~/components/ui';
import {FlipBook} from '~/components/your-book/FlipBook.client';

// Utils
import {safeParseJson} from '~/utils';

// Images
import BlueBook from 'public/images/books/book-blue.png';

import type {YourBook} from '~/schema';
import {DownloadPrintableBtn} from '~/components/your-book/DownloadPrintableBtn';
import {Box} from '~/components/your-book/Box';
import Book from '~/components/your-book/Book';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Your book - Custom your book | LoveVibe',
      content:
        "Explore the universe through the lens of 'Books'. Dive into a celestial journey filled with books, authors, and genres. Discover the wonder of the world and unravel the mysteries of the reading.",
    },
    {
      property: 'og:image',
      content: BlueBook,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:title',
      content: 'Your book - Custom your book | LoveVibe',
    },
    {
      property: 'og:description',
      content: `Explore the universe through the lens of 'Books'. Dive into a celestial journey filled with books, authors, and genres.`,
    },
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {handle} = params;
  const {adminClient} = context;
  const {data} = await adminClient.request(YOUR_BOOK_QUERY, {
    variables: {
      handle: {
        type: 'your_book',
        handle,
      },
    },
  });
  const {id, field} = data?.metaobjectByHandle || {};

  const yourBook: YourBook = {
    id,
    handle,
    properties: safeParseJson(field?.value) as any,
  };

  return json({yourBook});
}

export default function YourBooks() {
  // Hooks
  const {yourBook} = useLoaderData<typeof loader>();
  const {properties} = yourBook || {};

  return (
    <>
      <div id="3d-container" className="fixed top-0 h-screen w-screen">
        <Canvas dpr={[1, 1.5]}>
          <ambientLight intensity={5} />
          {/* <pointLight intensity={1} position={[0, 0, 0]} /> */}
          {/* <ambientLight intensity={0.1} /> */}
          {/* <directionalLight color={'#ffffff'} position={[0, 0, 6]} /> */}
          {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} /> */}
          <ScrollControls pages={20}>
            <Book yourBook={yourBook} />
          </ScrollControls>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      {/* <div className="animate__animated animate__fadeIn animate__delay-2_5s container flex flex-col items-center overflow-hidden pt-[17px] lg:pt-[93px]"> */}
      {/* {properties ? (
        <ClientOnly fallback={null}>
          {() => (
            <>
              <FlipBook yourBook={yourBook} />
              <DownloadPrintableBtn
                type="primary"
                block
                yourBook={yourBook}
                className="mt-6 max-w-[327px] md:max-w-[247px]"
              />
            </>
          )}
        </ClientOnly>
      ) : (
        <Empty
          className="!flex h-[60vh] !flex-col items-center justify-center"
          description="Your book is not found"
        />
      )} */}
      {/* </div> */}
    </>
  );
}

/* GraphQL */
const YOUR_BOOK_QUERY = `#graphql
  query MyQuery ($handle: MetaobjectHandleInput!) {
  metaobjectByHandle(handle: $handle) {
    id
    field(key: "properties") {
      value
    }
    handle
  }
}
`;
