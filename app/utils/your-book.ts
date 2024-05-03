// Libraries
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Types
import type {BookPage, YourBook} from '~/schema';

// Constants
import {BOOK_COLORS, BOOK_DIMENSIONS, PREVIEW_BOOK_PAGE_CN} from '~/constants';

export const handleExportYourBookPdf = async () => {
  const previewBookPageEls = document.querySelectorAll(
    `.${PREVIEW_BOOK_PAGE_CN}`,
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

  return pdf;
};

export const mapBookPageBgColor = (yourBook: YourBook): BookPage[] => {
  const {bookColor, bookPages} = yourBook.properties || {};
  const bookColorInfo = BOOK_COLORS.find((color) => color.key === bookColor);

  return bookPages.map((page, pageIdx) => ({
    ...page,
    image:
      bookColorInfo?.backgrounds.find((bg) => bg.indexes.includes(pageIdx + 1))
        ?.image || '',
  }));
};
