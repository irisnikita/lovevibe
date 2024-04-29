// Libraries
import React, {useMemo} from 'react';
import HTMLFlipBook from 'react-pageflip';
import styled from '@emotion/styled';

// Schema
import type {YourBook} from '~/schema';
import {BOOK_COLORS} from '~/constants';

// Components
import {Flex, Typography} from '~/components/ui';

interface FlipBookProps {
  yourBook: YourBook;
}

export const FlipBook: React.FC<FlipBookProps> = (props) => {
  const {yourBook} = props;
  const {bookColor, bookPages} = yourBook.properties || {};

  // Memo
  const bookColorInfo = useMemo(() => {
    const {properties} = yourBook;
    const {bookColor} = properties;

    return BOOK_COLORS.find(({key}) => key === bookColor) || BOOK_COLORS[0];
  }, [yourBook]);

  console.log('🚀 ~ bookColorInfo ~ bookColorInfo:', bookColorInfo);

  return (
    <HTMLFlipBook
      width={448}
      height={328}
      size="fixed"
      showCover={true}
      mobileScrollSupport={true}
      drawShadow={false}
      usePortrait
      // onFlip={this.onPage}
      // onChangeOrientation={this.onChangeOrientation}
      // onChangeState={this.onChangeState}
      className="demo-book mt-[93px] !bg-contain !bg-left"
      style={{
        background: `url(${bookColorInfo.image}) no-repeat`,
      }}
      // ref={(el) => (this.flipBook = el)}
    >
      <BookPage
        className="back-page !border-none"
        $image={bookColorInfo.backImage}
      ></BookPage>
      {bookPages?.map((page, index) => {
        const {contents = [], quotes} = page || {};

        return (
          <BookPage key={index} className="demoPage">
            <Flex vertical align="center" justify="center" className="h-full">
              <Typography.Text>{contents[0]}</Typography.Text>
              <Typography.Text>{quotes}</Typography.Text>
              <Typography.Text>{contents[1]}</Typography.Text>
            </Flex>
          </BookPage>
        );
      })}

      <BookPage
        className="back-page !border-none"
        $image={bookColorInfo.backImage}
      ></BookPage>
    </HTMLFlipBook>
  );
};

const BookPage = styled.div<{$image?: string}>`
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  border: 1px solid var(--neutrals-6-color);

  ${({$image}) => $image && `background-image: url(${$image})`};
`;
