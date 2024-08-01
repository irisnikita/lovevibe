// Logos
import LoveVibeVioletLogo from 'public/images/logos/lovevibe-violet-logo.png';
import LoveVibeLogo from 'public/images/logos/lovevibe.png';
import LoveVibeBlueLogo from 'public/images/logos/lovevibe-blue-logo.png';
import LoveVibeOrangeLogo from 'public/images/logos/lovevibe-orange-logo.png';
import LoveVibeYellowLogo from 'public/images/logos/lovevibe-yellow-logo.png';
import LoveVibePinkLogo from 'public/images/logos/lovevibe-pink-logo.png';

// Constants
import {
  BLUE_THEME,
  THEME,
  VIOLET_THEME,
  ORANGE_THEME,
  PINK_THEME,
  YELLOW_THEME,
  PARENT_KEYS,
} from '.';

export const ROUTE_KEYS = {
  POKEMON_CARD: 'POKEMON_CARD',
  STARRY_MAP: 'STARRY_MAP',
  BOOK_DAD: 'BOOK_DAD',
  BOOK_MOM: 'BOOK_MOM',
  BOOK_BESTIE: 'BOOK_BESTIE',
  BOOK_YOU: 'BOOK_YOU',
  BOOK_GRANDMA: 'BOOK_GRANDMA',
};
const {
  POKEMON_CARD,
  STARRY_MAP,
  BOOK_DAD,
  BOOK_MOM,
  BOOK_BESTIE,
  BOOK_GRANDMA,
  BOOK_YOU,
} = ROUTE_KEYS;

export const ROUTES = {
  [POKEMON_CARD]: {
    key: POKEMON_CARD,
    label: 'Pokemon Card',
    path: '/pokemon-card',
    logo: LoveVibeLogo,
    theme: THEME,
    themeKey: '',
  },
  [STARRY_MAP]: {
    key: STARRY_MAP,
    label: 'Starry Map',
    path: '/starry-map',
    logo: LoveVibeVioletLogo,
    theme: VIOLET_THEME,
    themeKey: 'violet',
  },
  [BOOK_DAD]: {
    key: BOOK_DAD,
    label: 'Book Dad',
    path: '/books/dad',
    logo: LoveVibeBlueLogo,
    theme: BLUE_THEME,
    themeKey: 'blue',
  },
  [BOOK_MOM]: {
    key: BOOK_MOM,
    label: 'Book Mom',
    path: `/books/${PARENT_KEYS.MOM}`,
    logo: LoveVibeOrangeLogo,
    theme: ORANGE_THEME,
    themeKey: 'orange',
  },
  [BOOK_YOU]: {
    key: BOOK_YOU,
    label: 'Book You',
    path: `/books/${PARENT_KEYS.COUPLE_YOU}`,
    logo: LoveVibeYellowLogo,
    theme: YELLOW_THEME,
    themeKey: 'yellow',
  },
  [BOOK_BESTIE]: {
    key: BOOK_BESTIE,
    label: 'Book Bestie',
    path: `/books/${PARENT_KEYS.BESTIE}`,
    logo: LoveVibePinkLogo,
    theme: PINK_THEME,
    themeKey: 'pink',
  },
  [BOOK_GRANDMA]: {
    key: BOOK_GRANDMA,
    label: 'Book Grandma',
    path: `/books/${PARENT_KEYS.GRANDMA}`,
    logo: LoveVibeOrangeLogo,
    theme: ORANGE_THEME,
    themeKey: 'orange',
  },
};
