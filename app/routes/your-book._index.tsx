// Libraries
import React, {useEffect, useMemo, useState} from 'react';
import {Form, json, useActionData, useSubmit} from '@remix-run/react';
import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import styled from '@emotion/styled';
import {clone, set} from 'lodash';
import copy from 'copy-to-clipboard';
import {resend} from '~/resend-client';

// Components
import {
  Alert,
  Flex,
  Typography,
  Divider,
  Input,
  Button,
  Card,
} from '~/components/ui';
import {Checkbox, EmailSubmitCard} from '~/components/lovevibe';
import {DownloadPrintableVersionBtn} from '~/components/your-book/DownloadPrintableVersionBtn';

// Utils
import {numberTwoDigits} from '~/utils';

// Constants
import {BOOK_COLORS, BOOK_DIMENSIONS, TUTORIALS} from '~/constants';

// Graphql queries
import {YOUR_BOOK_CREATE_MUTATION} from '~/graphql/your-book';

// Images
import BlueBook from 'public/images/books/book-blue.png';

// Icons
import {Success} from '~/icons';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Your book | LoveVibe',
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
  const {storefront} = context;

  return {storefront};
}

export async function action({request, context}: LoaderFunctionArgs) {
  const {adminClient, resend} = context;
  const formData = await request.formData();
  const {properties, email} = Object.fromEntries(formData) || {};

  const actionData = {
    createBookResponse: null,
    sendMailResponse: null,
  };

  // Create your book with properties
  if (properties) {
    actionData.createBookResponse = await adminClient.request(
      YOUR_BOOK_CREATE_MUTATION,
      {
        variables: {
          metaobject: {
            type: 'your_book',
            fields: [
              {
                key: 'properties',
                value: properties,
              },
            ],
          },
        },
      },
    );
  }

  // Send email
  if (email) {
    const sendMailResponse = await resend.emails.send({
      from: 'LoveVibe <support@lovevibe.co>',
      to: email as string,
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    });

    console.log(JSON.stringify(sendMailResponse));
  }

  return json(actionData);
}

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
const LIMIT = 8;

export default function YourBooks() {
  // Hooks
  const actionData = useActionData<typeof action>();
  const [state, setState] = useState(INITIAL_STATE);
  const {bookColor, bookPages, currentPage, isLoadingShareLink, isCopyLink} =
    state;
  const submit = useSubmit();

  // Effects
  useEffect(() => {
    if (actionData && actionData.createBookResponse) {
      const {data} = actionData.createBookResponse || {};
      const {handle} = data?.metaobjectCreate?.metaobject || {};

      /**
       * Set button share link loading is false
       * Set button share link status is copy link
       */
      setState((prev) => ({
        ...prev,
        isLoadingShareLink: false,
        isCopyLink: true,
      }));

      /**
       * Save handle to clipboard
       */
      copy(`${window.location.host}/your-book/${handle}`);
      // copyValueToClipboard(`${window.location.host}/your-book/${handle}`);

      /**
       * Reset isCopyLink to false
       */
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isCopyLink: false,
        }));
      }, 10000);
    }
  }, [actionData]);

  // Memos
  const pageTotal = useMemo(() => {
    return Math.ceil(bookPages.length / LIMIT);
  }, [bookPages]);

  const currentPageData = useMemo(() => {
    return bookPages.slice(currentPage * LIMIT, (currentPage + 1) * LIMIT);
  }, [bookPages, currentPage]);

  const bookColorInfo = useMemo(() => {
    return BOOK_COLORS.find((color) => color.key === bookColor);
  }, [bookColor]);

  // Handlers
  const onChangeBookPage = ({key, quotes}: {key: number; quotes: string}) => {
    const cloneBookPages = clone(bookPages);
    const pageIdx = cloneBookPages.findIndex((page) => page.key === key);

    set(cloneBookPages, `[${pageIdx}].quotes`, quotes);

    setState((prev) => ({
      ...prev,
      bookPages: cloneBookPages,
    }));
  };

  const onClickContinue = () => {
    if (currentPage < pageTotal - 1) {
      setState((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const onClickShareLink = () => {
    setState((prev) => ({...prev, isLoadingShareLink: true}));
  };

  const onSubmitEmail = (values: any) => {
    const formData = new FormData();

    formData.append('email', values.email);

    submit(formData, {
      method: 'POST',
    });
  };

  const renderFooter = () => {
    if (currentPage === pageTotal - 1) {
      return (
        <Flex vertical gap={24} align="center" className="w-full md:w-fit">
          <EmailSubmitCard
            buttonProps={{children: 'Send book via email'}}
            inputProps={{
              placeholder: 'Enter Your Partner’s Email',
            }}
            onSubmit={onSubmitEmail}
          />
          <Typography.Text className="!text-lg !font-semibold">
            OR
          </Typography.Text>

          <Card classNames={{body: 'md:!py-10 md:!px-6'}} className="w-full">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <DownloadPrintableVersionBtn
                yourBook={{properties: {bookColor, bookPages}}}
              />

              <Form method="post">
                <input
                  className="hidden"
                  name="properties"
                  readOnly
                  value={JSON.stringify({
                    bookColor,
                    bookPages,
                  })}
                />
                <Button
                  className={`${
                    isCopyLink
                      ? '!pointer-events-none !border-success !bg-success !text-white'
                      : ''
                  }`}
                  loading={isLoadingShareLink}
                  htmlType="submit"
                  block
                  onClick={() => onClickShareLink()}
                >
                  {isCopyLink ? (
                    <Flex align="center" justify="center" gap={8}>
                      Copied Link
                      <Success />
                    </Flex>
                  ) : (
                    'Share book via link'
                  )}
                </Button>
              </Form>
            </div>
          </Card>
        </Flex>
      );
    }

    return (
      <Button
        type="primary"
        className="w-[300px]"
        onClick={() => onClickContinue()}
      >
        Continue
      </Button>
    );
  };

  return (
    <div className="animate__animated animate__fadeIn animate__delay-2_5s container mb-[60px] mt-8 flex flex-col items-center md:mb-[100px] md:mt-10">
      <div className="flex w-full max-w-[544px] flex-col items-center gap-4 md:gap-10">
        <Typography.Title className="!mb-0 !text-2xl !font-semibold !text-primary md:!text-[32px] xl:!text-[40px]">
          What I love about U book 💖
        </Typography.Title>

        <Alert
          type="info"
          message={
            <Flex className="flex-col gap-x-[52px] gap-y-1 md:!flex-row">
              <Typography.Text className="!text-lg !font-semibold md:max-w-[157px] md:!text-2xl">
                How to create your book
              </Typography.Text>
              <Flex vertical>
                {TUTORIALS.map((tutorial, index) => (
                  <div key={tutorial}>{`${index + 1}. ${tutorial}`}</div>
                ))}
              </Flex>
            </Flex>
          }
          className="w-full"
        />

        <CusDivider className="!hidden md:!block" />
        <Typography.Title
          level={2}
          className="!m-0 !text-lg !font-semibold md:!text-[32px]"
        >
          🎨 Book Color
        </Typography.Title>

        <Checkbox
          value={bookColor}
          items={BOOK_COLORS}
          itemProps={{
            className:
              'xl:!w-[256px] xl:!h-[188px] md:!w-[178px] md:!h-[132px] !w-[167.5px] !h-[120px] !bg-cover',
          }}
          justify="center"
          className="w-full gap-5 xl:!gap-8"
          onChange={(value) =>
            setState((prev) => ({...prev, bookColor: value as string}))
          }
        />
        <CusDivider />

        <Typography.Text className="!text-lg !font-semibold md:!text-[32px]">{`📖 ${bookPages.length} Pages`}</Typography.Text>
      </div>

      <Pagination
        align="center"
        justify="space-between"
        gap={10}
        className="my-10 w-full max-w-[700px]"
      >
        {Array.from({length: pageTotal}, (_, index) => {
          return (
            <React.Fragment key={index}>
              <div
                className={`__item text-white ${
                  index === currentPage ? 'active' : ''
                }`}
                onClick={() =>
                  setState((prev) => ({...prev, currentPage: index}))
                }
                aria-hidden="true"
              >
                <Typography.Text className="!text-lg !font-semibold !text-white md:!text-[24px]">
                  {index * LIMIT + 1} -{' '}
                  {Math.min((index + 1) * LIMIT, bookPages.length)}
                </Typography.Text>
              </div>
              {index !== pageTotal - 1 && <div className="paginate__divider" />}
            </React.Fragment>
          );
        })}
      </Pagination>

      <div className="mb-10 grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-5 md:gap-y-10 xl:gap-x-12 xl:gap-y-10">
        {currentPageData.map((page, index) => {
          const {key, label, quotes, contents} = page;

          return (
            <BookCard key={key} gap={8}>
              <div
                className="card__left"
                style={{backgroundImage: `url(${bookColorInfo?.image})`}}
              >
                <Typography.Text className="z-20 !text-5xl !font-bold !italic">
                  {numberTwoDigits(key)}
                </Typography.Text>
              </div>
              <Flex vertical gap={10} className="card__right">
                <Typography.Text>{contents[0]}</Typography.Text>
                <Input
                  value={quotes}
                  max={24}
                  size="small"
                  placeholder="Enter your quotes..."
                  onChange={({target}) =>
                    onChangeBookPage({key, quotes: target.value})
                  }
                />
                <Typography.Text>{contents[1]}</Typography.Text>
              </Flex>
            </BookCard>
          );
        })}
      </div>

      {renderFooter()}
    </div>
  );
}

/* Styled Components */
const CusDivider = styled(Divider)`
  margin: 0 !important;
`;

const Pagination = styled(Flex)`
  .__item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    height: 42px;
    width: 68px;
    background-color: var(--neutrals-5-color);
    transition: all 200ms linear;
    cursor: pointer;

    &.active {
      background-color: var(--primary-color);
    }

    @media screen and (min-width: 768px) {
      height: 80px;
      width: 114px;
    }
  }

  .paginate__divider {
    position: relative;
    display: flex;
    align-items: center;
    border-bottom: 1px dashed var(--neutrals-5-color);
    width: 30px;

    &::after {
      content: '';
      position: absolute;
      right: -15px;
      height: 12px;
      width: 12px;
      border-radius: 100%;
      border: 2px solid var(--neutrals-5-color);
      box-sizing: border-box;
    }

    &::before {
      content: '';
      position: absolute;
      left: -15px;
      height: 12px;
      width: 12px;
      border-radius: 100%;
      border: 2px solid var(--neutrals-5-color);
      box-sizing: border-box;
    }

    @media screen and (min-width: 768px) {
      width: 123px;
    }
  }
`;

const BookCard = styled(Flex)`
  .card__left,
  .card__right {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid var(--neutrals-6-color);
    overflow: hidden;
    height: 133px;
    width: 264px;

    @media screen and (min-width: 1024px) {
      height: 197px;
      width: 264px;
    }
  }

  .card__left {
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      opacity: 0.9;
    }
  }

  .card__right {
    padding: 16px;
  }
`;
