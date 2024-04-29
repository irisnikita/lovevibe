// Libraries
import {useMemo, useState} from 'react';
import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {clone, set} from 'lodash';

// Components
import {Flex, Typography, Button, Card, Empty} from '~/components/ui';
import {Checkbox, EmailSubmitCard} from '~/components/lovevibe';

// Utils
import {numberTwoDigits, safeParseJson} from '~/utils';

// Images
import WhiteBook from 'public/images/books/book-white.png';
import BlueBook from 'public/images/books/book-blue.png';
import {Form, json, useActionData, useLoaderData} from '@remix-run/react';
import {YOUR_BOOK_CREATE_MUTATION} from '~/graphql/your-book';
import {Success} from '~/icons';
import type {YourBook} from '~/schema';
import {FlipBook} from '~/components/your-book/FlipBook.client';
import {ClientOnly} from 'remix-utils/client-only';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Your book | LoveVibe',
      content:
        "Explore the universe through the lens of 'Books'. Dive into a celestial journey filled with books, authors, and genres. Discover the wonder of the world and unravel the mysteries of the reading.",
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

const BOOK_COLORS = [
  {
    key: 'blue',
    label: 'Blue book',
    image: BlueBook,
  },
  {
    key: 'white',
    label: 'White book',
    image: WhiteBook,
  },
];

const INITIAL_STATE = {
  bookColor: BOOK_COLORS[0].key,
  bookPages: Array.from({length: 20}, (_, index) => ({
    key: index + 1,
    label: `Page ${index + 1}`,
    quotes: '',
    contents: [
      index % 2 !== 0 ? 'You are my favorite' : 'I love your',
      index % 2 !== 0 ? 'in the word' : '',
    ],
  })),
  currentPage: 0,

  // Share link
  isLoadingShareLink: false,
  isCopyLink: false,
};

export default function YourBooks() {
  // Hooks
  const {yourBook} = useLoaderData<typeof loader>();
  const {properties} = yourBook || {};

  return (
    <div className="animate__animated animate__fadeIn animate__delay-2_5s container mt-8 flex flex-col items-center overflow-hidden pb-[60px] md:mt-10 md:pb-[100px]">
      {properties ? (
        <ClientOnly fallback={null}>
          {() => <FlipBook yourBook={yourBook} />}
        </ClientOnly>
      ) : (
        <Empty
          className="!flex h-[60vh] !flex-col items-center justify-center"
          description="Your book is not found"
        />
      )}
    </div>
  );
}

/* Styled Components */

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
