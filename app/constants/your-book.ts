// Images
import WhiteBook from 'public/images/books/book-white.png';
import BlueBook from 'public/images/books/book-blue.png';
import BackBlueBook from 'public/images/books/book-blue-back.png';

const TUTORIALS = [
  'Choose your book color (blue, pink)',
  'Type your messages on 20 pages',
  'Send messages to your partner’s email',
];

const BOOK_COLORS = [
  {
    key: 'blue',
    label: 'Blue book',
    image: BlueBook,
    backImage: BackBlueBook,
  },
  {
    key: 'white',
    label: 'White book',
    image: WhiteBook,
    backImage: BackBlueBook,
  },
];

const BOOK_DIMENSIONS = {
  width: 448,
  height: 328,
};

export {TUTORIALS, BOOK_COLORS, BOOK_DIMENSIONS};
