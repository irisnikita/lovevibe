// Libraries
import {useMemo, useState} from 'react';
import {useLoaderData} from '@remix-run/react';
import {json, defer} from '@shopify/remix-oxygen';
import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import styled from '@emotion/styled';

// Components
import type {CollapseProps} from '~/components/ui';
import {Alert, Collapse, Flex, Typography, Empty} from '~/components/ui';

// Icons
import {ArrowDown, ArrowRight} from '~/icons';

// Constants
import {ITEM_ORDER_COLORS, PARENT_KEYS, PARENT_OPTIONS} from '~/constants';

// Utils
import {safeParseJson} from '~/utils';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Books | LoveVibe',
      content:
        "Explore the universe through the lens of 'Books'. Dive into a celestial journey filled with books, authors, and genres. Discover the wonder of the world and unravel the mysteries of the reading.",
    },
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {parent} = params;
  const {storefront} = context;

  const {metaobjects} = await storefront.query(BOOK_QUERY);
  const books = metaobjects?.edges || [];

  return defer({
    parent,
    books,
  });
}

export default function Books() {
  // Loader
  const {parent, books} = useLoaderData<typeof loader>();

  // Memo
  const bookItems: CollapseProps['items'] = useMemo(() => {
    if (books) {
      return books
        .map((book, index) => {
          const {fields, id} = book.node || {};
          const objectBook = fields.reduce((acc, field) => {
            return {
              ...acc,
              [field.key]: field.value,
            };
          }, {});
          const {content, order, parent_type, title} = (objectBook ||
            {}) as any;
          const parseContent = safeParseJson(content || '[]');
          const colorIdx = index % ITEM_ORDER_COLORS.length;

          // Check if parent type is equal parent params then return value
          if (parent_type === parent) {
            return {
              key: id,
              label: (
                <Flex align="center" gap={8}>
                  <div
                    className="collapse__order shrink-0"
                    style={{backgroundColor: ITEM_ORDER_COLORS[colorIdx]}}
                  >
                    {order}
                  </div>
                  <Typography.Text strong>{title}</Typography.Text>
                </Flex>
              ),
              children: (
                <ul className="collapse__content-list">
                  {!!parseContent?.length &&
                    parseContent.map((item, idx) => (
                      <li key={item + idx}>{item}</li>
                    ))}
                </ul>
              ),
            };
          }

          return undefined;
        })
        ?.filter(Boolean) as CollapseProps['items'];
    }

    return [];
  }, [books, parent]);

  const parentInfo = useMemo(() => {
    return PARENT_OPTIONS[parent] || PARENT_OPTIONS[PARENT_KEYS.DAD];
  }, [parent]);

  return (
    <div className="animate__animated animate__fadeIn animate__delay-2_5s container mb-[60px] mt-8 flex justify-center md:mb-[100px] md:mt-10">
      <div className="w-full max-w-[736px]">
        <div className="flex flex-col">
          <Typography.Title className="!text-[32px] !font-semibold !text-primary md:!text-[40px]">
            {parentInfo.title}
          </Typography.Title>

          <Alert
            showIcon
            type="info"
            message="Click on each row to see the fill-in-the-blank suggestions."
            className="w-fit"
          />
        </div>

        <Container className="mt-10">
          {bookItems.length ? (
            <StyledCollapse
              items={bookItems}
              bordered={false}
              className="!bg-transparent"
              expandIconPosition="end"
              expandIcon={({isActive}) => (
                <ArrowRight
                  className={`!text-neutrals-4 transition-transform ${
                    isActive ? '-rotate-90' : 'rotate-90'
                  }`}
                />
              )}
            />
          ) : (
            <Empty className="flex min-h-[50vh] flex-col items-center justify-center" />
          )}
        </Container>
      </div>
    </div>
  );
}

/* Styled Components */
const Container = styled.div`
  border-radius: 20px;
  border: 1px solid var(--neutrals-7-color, #f4f5f6);
  background: var(--neutrals-8-color, #fcfcfd);
  box-shadow: 0px 12px 24px -20px rgba(15, 15, 15, 0.06);
  padding: 0px 24px;
`;

const StyledCollapse = styled(Collapse)`
  .collapse__order {
    display: flex;
    width: 30px;
    height: 26px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px; /* 144.444% */
    border-radius: 4px;
  }

  .ant-collapse-header {
    padding: 20px 0px !important;
  }
  .ant-collapse-item {
    border-color: #b1b5c3 !important;
  }
  .collapse__content-list {
    li {
      display: flex;
      align-items: center;
      &::before {
        content: '';
        height: 3px;
        width: 3px;
        border-radius: 100%;
        background-color: black;
        margin-left: 3px;
        margin-right: 20px;
      }
    }
  }
  .ant-collapse-content-box {
  }
`;

/* GraphQL */
const BOOK_QUERY = `#graphql
  query Books {
    metaobjects(type: "parent_book", first: 200, sortKey: "order") {
      edges {
        node {
          id
          fields {
            value
            key
          }
        }
      }
    }
  }
`;
