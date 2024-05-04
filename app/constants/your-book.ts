// Images
/* Blue */
import BlueFrontCover from 'public/images/books/blue-background/front-cover.png';
import BlueBackCover from 'public/images/books/blue-background/back-cover.jpg';
import BlueBackground1 from 'public/images/books/blue-background/1-3-12-16.jpg';
import BlueBackground2 from 'public/images/books/blue-background/2-9-18.jpg';
import BlueBackground3 from 'public/images/books/blue-background/4-7-11-15.jpg';
import BlueBackground4 from 'public/images/books/blue-background/5-8-10-13-17-19.jpg';
import BlueBackground5 from 'public/images/books/blue-background/6-14-20.jpg';

/* Pink */
import PinkFrontCover from 'public/images/books/pink-background/front-cover.png';
import PinkBackground1 from 'public/images/books/pink-background/1-5-11.jpg';
import PinkBackground2 from 'public/images/books/pink-background/2-9-16.jpg';
import PinkBackground3 from 'public/images/books/pink-background/3-12-18.jpg';
import PinkBackground4 from 'public/images/books/pink-background/4-13-15-19.jpg';
import PinkBackground5 from 'public/images/books/pink-background/6-20.jpg';
import PinkBackground6 from 'public/images/books/pink-background/7-14.jpg';
import PinkBackground7 from 'public/images/books/pink-background/8-10-17.jpg';

const TUTORIALS = [
  'Choose your book color (blue, pink)',
  'Type your messages on 20 pages',
  'Send messages to your partner’s email',
];

const BOOK_COLORS = [
  {
    key: 'blue',
    label: 'Blue book',
    frontCover: BlueFrontCover,
    backCover: BlueBackCover,
    backgrounds: [
      {
        indexes: [1, 3, 12, 16],
        image: BlueBackground1,
      },
      {
        indexes: [2, 9, 18],
        image: BlueBackground2,
      },
      {
        indexes: [4, 7, 11, 15],
        image: BlueBackground3,
      },
      {
        indexes: [5, 8, 10, 13, 17, 19],
        image: BlueBackground4,
      },
      {
        indexes: [6, 14, 20],
        image: BlueBackground5,
      },
    ],
  },
  {
    key: 'pink',
    label: 'Pink book',
    frontCover: PinkFrontCover,
    backCover: '',
    backgrounds: [
      {
        indexes: [1, 5, 11],
        image: PinkBackground1,
      },
      {
        indexes: [2, 9, 16],
        image: PinkBackground2,
      },
      {
        indexes: [3, 12, 18],
        image: PinkBackground3,
      },
      {
        indexes: [4, 13, 15, 19],
        image: PinkBackground4,
      },
      {
        indexes: [6, 20],
        image: PinkBackground5,
      },
      {
        indexes: [7, 14],
        image: PinkBackground6,
      },
      {
        indexes: [8, 10, 17],
        image: PinkBackground7,
      },
    ],
  },
];

const BOOK_DIMENSIONS = {
  width: 448,
  height: 328,
};

const PREVIEW_BOOK_PAGE_CN = 'preview-book-page';

export {TUTORIALS, BOOK_COLORS, BOOK_DIMENSIONS, PREVIEW_BOOK_PAGE_CN};
