// Libraries
import {chunk} from 'lodash';
import {FlippingPages} from 'flipping-pages';
import React, {useMemo, useRef, useState} from 'react';
import styled from '@emotion/styled';
import {Image} from '@shopify/hydrogen';
import 'flipping-pages/dist/style.css';

// Images
import DragDropHereImg from 'public/images/books/drag-drop-book.png';

// Schema
import type {YourBook} from '~/schema';
import {BOOK_COLORS} from '~/constants';

// Components
import {Flex, Typography} from '~/components/ui';
import {mapBookPageBgColor} from '~/utils';

interface FlipBookProps {
  yourBook: YourBook;
}

const BOOK_DIMENSIONS = {
  width: 448,
  height: 676,
};

const MOBILE_BOOK_DIMENSIONS = {
  width: 327,
  height: 495,
};

export const FlipBook: React.FC<FlipBookProps> = (props) => {
  const {yourBook} = props;
  const {bookColor} = yourBook.properties || {};
  const [selected, setSelected] = useState(0);

  // Ref
  const containerRef = useRef<HTMLDivElement>(null);

  // Memo
  const bookPages = useMemo(() => {
    return mapBookPageBgColor(yourBook);
  }, [yourBook]);

  const bookColorInfo = useMemo(() => {
    return BOOK_COLORS.find(({key}) => key === bookColor) || BOOK_COLORS[0];
  }, [bookColor]);

  const groupPages = useMemo(() => {
    return chunk(bookPages, 2);
  }, [bookPages]);

  // Handlers
  const back = () => {
    setSelected((selected) => Math.max(selected - 1, 0));
  };

  const next = () => {
    setSelected((selected) => Math.min(selected + 1, groupPages.length));
  };

  return (
    <div className="relative">
      <DragDropHere>
        <Typography.Text strong className="text-center lg:text-right">
          Click or drag to <br />
          flip the page 💖
        </Typography.Text>
        <Image src={DragDropHereImg} fetchPriority="high" width={119} />
      </DragDropHere>
      <BookWrapper>
        <FlippingPages
          containerRef={(ref) => (containerRef.current = ref)}
          direction="bottom-to-top"
          onSwipeEnd={setSelected}
          selected={selected}
          shadowBackground="transparent"
          containerProps={{
            onClick: (e) => {
              const {top} = e.currentTarget.getBoundingClientRect();
              const mouseY = e.clientY - top;

              const childPageEl = containerRef.current.querySelector('div');

              /**
               * Check if drag page then stopping next or back page
               */
              if (!childPageEl.className.includes('fullPage')) {
                return;
              }

              /**
               * Check if mouseY > pageHeight/2 then go to next page else go back
               */
              if (mouseY > BOOK_DIMENSIONS.height / 2) {
                next();
              } else {
                back();
              }
            },
          }}
        >
          <div className="page">
            <BookPage $image={bookColorInfo.frontCover} />
            <BookPage $image={bookColorInfo.backCover} />
          </div>
          {groupPages?.map((pages, index) => {
            return (
              <div key={index} className="page">
                {pages.map(({contents, quotes, image}, pageIdx) => (
                  <BookPage className="book-page" key={pageIdx} $image={image}>
                    <Flex
                      vertical
                      align="center"
                      justify="center"
                      className="h-full"
                      gap={10}
                    >
                      <Typography.Text>{contents?.[0]}</Typography.Text>
                      <Typography.Text className="book__quotes">
                        {quotes}
                      </Typography.Text>
                      <Typography.Text>{contents?.[1]}</Typography.Text>
                    </Flex>
                  </BookPage>
                ))}
              </div>
            );
          })}
        </FlippingPages>
      </BookWrapper>
    </div>
  );
};

/* Styled */
const BookWrapper = styled.div`
  position: relative;
  width: ${MOBILE_BOOK_DIMENSIONS.width}px;
  height: ${MOBILE_BOOK_DIMENSIONS.height}px;

  .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    user-select: none;
    touch-action: none;
  }

  @media screen and (min-width: 1024px) {
    width: ${BOOK_DIMENSIONS.width}px;
    height: ${BOOK_DIMENSIONS.height}px;
  }
`;

const BookPage = styled.div<{$image?: string}>`
  position: relative;
  width: 100%;
  height: 239px;
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  border: 1px solid var(--neutrals-6-color);
  background-color: #fff;

  ${({$image}) => $image && `background-image: url(${$image})`};

  .book__quotes {
    font-family: 'Dancing Script', cursive;
  }

  @media screen and (min-width: 1024px) {
    height: 328px;
  }
`;

const DragDropHere = styled.div`
  position: relative;
  width: 120px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;

  img {
    margin-top: 10px;
    width: 46px;
    transform: rotate(-25deg);
  }

  @media screen and (min-width: 1024px) {
    position: absolute;
    width: 171px;
    right: -200px;
    top: 119px;
    align-items: unset;
    padding-bottom: 0px;

    img {
      margin-top: 0px;
      width: 119px;
      transform: rotate(0deg);
    }
  }
`;
