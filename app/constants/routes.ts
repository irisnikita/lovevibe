// Logos
import LoveVibeVioletLogo from 'public/images/logos/lovevibe-violet-logo.png';
import LoveVibeLogo from 'public/images/logos/lovevibe.png';
import LoveVibeBlueLogo from 'public/images/logos/lovevibe-blue-logo.png';
import LoveVibeOrangeLogo from 'public/images/logos/lovevibe-orange-logo.png';

// Constants
import {BLUE_THEME, THEME, VIOLET_THEME, ORANGE_THEME} from '.';

export const ROUTE_KEYS = {
  POKEMON_CARD: 'POKEMON_CARD',
  STARRY_MAP: 'STARRY_MAP',
  BOOK_DAD: 'BOOK_DAD',
  BOOK_MOM: 'BOOK_MOM',
};
const {POKEMON_CARD, STARRY_MAP, BOOK_DAD, BOOK_MOM} = ROUTE_KEYS;

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
    path: '/books/mom',
    logo: LoveVibeOrangeLogo,
    theme: ORANGE_THEME,
    themeKey: 'orange',
  },
};
