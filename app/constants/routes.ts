// Logos
import LoveVibeVioletLogo from 'public/images/logos/lovevibe-violet-logo.png';
import LoveVibeLogo from 'public/images/logos/lovevibe.png';
import {THEME, VIOLET_THEME} from '.';

export const ROUTE_KEYS = {
  POKEMON_CARD: 'POKEMON_CARD',
  STARRY_MAP: 'STARRY_MAP',
};
const {POKEMON_CARD, STARRY_MAP} = ROUTE_KEYS;

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
};
