// Libraries
import React, {useMemo, useState} from 'react';
import type {ButtonProps} from 'antd';
import styled from '@emotion/styled';

// Components
import {Button, Typography} from '~/components/ui';

// Schema
import type {YourBook} from '~/schema';

// Constants
import {BOOK_COLORS, BOOK_DIMENSIONS, PREVIEW_BOOK_PAGE_CN} from '~/constants';

// Utils
import {handleExportYourBookPdf, mapBookPageBgColor} from '~/utils';

interface DownloadPrintableBtnProps extends ButtonProps {
  yourBook: YourBook;
}

const {Text} = Typography;

export const DownloadPrintableBtn: React.FC<DownloadPrintableBtnProps> = (
  props,
) => {
  const {
    children = 'Download printable version',
    yourBook,
    ...restProps
  } = props;
  const {bookColor} = yourBook.properties || {};

  // State
  const [isLoading, setLoading] = useState(false);

  // Memo
  const bookPages = useMemo(() => {
    return mapBookPageBgColor(yourBook);
  }, [yourBook]);

  const bookColorInfo = useMemo(() => {
    return BOOK_COLORS.find((color) => color.key === bookColor);
  }, [bookColor]);

  // Handlers
  const handleDownloadPrintable = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const pdf = await handleExportYourBookPdf();

    pdf.save('your-book.pdf');

    setLoading(false);
  };

  return (
    <>
      <Button
        {...restProps}
        loading={isLoading}
        onClick={() => handleDownloadPrintable()}
      >
        {children}
      </Button>

      <div className="fixed -z-10 opacity-0">
        <PreviewBookPage
          className={PREVIEW_BOOK_PAGE_CN}
          $image={bookColorInfo?.frontCover}
          style={{
            width: BOOK_DIMENSIONS.width * 2,
            height: BOOK_DIMENSIONS.height * 2,
          }}
        />

        {bookPages.map((page) => {
          const {key, contents, quotes, image} = page;

          return (
            <PreviewBookPage
              key={key}
              className={PREVIEW_BOOK_PAGE_CN}
              $image={image}
            >
              <Text>{contents[0]}</Text>
              <Text className="quotes">{quotes}</Text>
              <Text>{contents[1]}</Text>
            </PreviewBookPage>
          );
        })}

        <PreviewBookPage
          $image={bookColorInfo?.backCover}
          className={PREVIEW_BOOK_PAGE_CN}
        />
      </div>
    </>
  );
};

/** Styled */
const PreviewBookPage = styled.div<{$image?: string}>`
  width: ${BOOK_DIMENSIONS.width * 1.5}px;
  height: ${BOOK_DIMENSIONS.height * 1.5}px;
  border-radius: 8px;
  border: 1px solid var(--neutrals-6-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10;
  flex-direction: column;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${({$image}) => $image && `background-image: url(${$image})`};

  * {
    font-size: 21px !important;
  }

  .quotes {
    font-family: 'Dancing Script', cursive !important;
  }
`;
