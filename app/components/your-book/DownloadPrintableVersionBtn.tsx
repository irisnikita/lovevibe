// Libraries
import React, {useMemo, useState} from 'react';
import type {ButtonProps} from 'antd';
import html2canvas from 'html2canvas';
import styled from '@emotion/styled';
import jsPDF from 'jspdf';

// Components
import {Button, Typography} from '~/components/ui';

// Schema
import type {YourBook} from '~/schema';

// Constants
import {BOOK_COLORS, BOOK_DIMENSIONS} from '~/constants';

interface DownloadPrintableVersionBtnProps extends ButtonProps {
  yourBook: YourBook;
}

const {Text} = Typography;

const PREVIEW_PAGE_CLASS_NAME = 'preview-book-page';

export const DownloadPrintableVersionBtn: React.FC<
  DownloadPrintableVersionBtnProps
> = (props) => {
  const {
    children = 'Download printable version',
    yourBook,
    ...restProps
  } = props;
  const {bookColor, bookPages} = yourBook.properties || {};

  // State
  const [isLoading, setLoading] = useState(false);

  // Memo
  const bookColorInfo = useMemo(() => {
    return BOOK_COLORS.find((color) => color.key === bookColor);
  }, [bookColor]);

  // Handlers
  const handleDownloadPrintable = async () => {
    setLoading(true);

    const previewBookPageEls = document.querySelectorAll(
      `.${PREVIEW_PAGE_CLASS_NAME}`,
    );
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [BOOK_DIMENSIONS.width, BOOK_DIMENSIONS.height],
      putOnlyUsedFonts: true,
    });

    for (let index = 0; index < previewBookPageEls.length; index++) {
      const element = previewBookPageEls[index];

      const canvas = await html2canvas(element as HTMLElement, {
        allowTaint: true,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
      });

      const dataUrl = canvas?.toDataURL('png', 1);

      pdf.addImage(
        dataUrl,
        'PNG',
        0,
        0,
        BOOK_DIMENSIONS.width,
        BOOK_DIMENSIONS.height,
      );

      if (index !== previewBookPageEls.length - 1) {
        pdf.addPage();
      }
    }

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
          className={PREVIEW_PAGE_CLASS_NAME}
          style={{backgroundImage: `url(${bookColorInfo?.image})`}}
        />

        {bookPages.map((page) => {
          const {key, contents, quotes} = page;

          return (
            <PreviewBookPage key={key} className={PREVIEW_PAGE_CLASS_NAME}>
              <Text>{contents[0]}</Text>
              <Text className="quotes">{quotes}</Text>
              <Text>{contents[1]}</Text>
            </PreviewBookPage>
          );
        })}

        <PreviewBookPage
          className={PREVIEW_PAGE_CLASS_NAME}
          style={{backgroundImage: `url(${bookColorInfo?.backImage})`}}
        />
      </div>
    </>
  );
};

/** Styled */

const PreviewBookPage = styled.div`
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

  * {
    font-size: 24px !important;
  }

  quotes {
    font-family: 'Dancing Script', cursive;
  }
`;
