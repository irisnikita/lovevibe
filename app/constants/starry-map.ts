export const STARRY_MAP_SETTING_TAB_KEYS = {
  CHOOSE_STYLE: 'choose_style',
  GENERATE_STAR_MAP: 'generate_star_map',
  CUSTOMIZE_INFORMATION: 'customize',
};
export const STAR_STYLE_KEYS = {
  CONSTELLATIONS: 'constellations',
  GRATICULE: 'graticule',
  MILKY_WAY: 'milky_way',
};
export const MAP_COLORS_KEYS = {
  WHITE: 'white',
  BLACK: 'black',
};

const {CHOOSE_STYLE, CUSTOMIZE_INFORMATION, GENERATE_STAR_MAP} =
  STARRY_MAP_SETTING_TAB_KEYS;
const {CONSTELLATIONS, GRATICULE, MILKY_WAY} = STAR_STYLE_KEYS;
const {BLACK, WHITE} = MAP_COLORS_KEYS;

export const STARRY_MAP_SETTING_TABS = [
  {
    key: CHOOSE_STYLE,
    label: 'Choose Style',
  },
  {
    key: GENERATE_STAR_MAP,
    label: 'Generate Star Map',
  },
  {
    key: CUSTOMIZE_INFORMATION,
    label: 'Customize Information',
  },
];

export const STAR_STYLE = {
  [CONSTELLATIONS]: {
    key: CONSTELLATIONS,
    label: 'Constellations',
  },
  [GRATICULE]: {
    key: GRATICULE,
    label: 'Graticule',
  },
  [MILKY_WAY]: {
    key: MILKY_WAY,
    label: 'Milk Way',
  },
};

export const MAP_COLORS = {
  [BLACK]: {
    key: BLACK,
    label: 'Black',
    color: '#000000',
  },
  [WHITE]: {
    key: WHITE,
    label: 'White',
    color: '#FFFFFF',
  },
};

export const PRINT_SIZE = [
  {
    value: '1',
    label: '30 x 40 cm',
    width: 30,
    height: 40,
  },
  {
    value: '2',
    label: '45 x 60 cm',
    width: 45,
    height: 60,
  },
  {
    value: '3',
    label: '50 x 70 cm',
    width: 50,
    height: 70,
  },
  {
    value: '4',
    label: '60 x 80 cm',
    width: 60,
    height: 80,
  },
];
