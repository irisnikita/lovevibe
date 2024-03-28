// Cards
import AnniversaryCard from 'public/images/pokemon/cards/anniversary-card.png';
import BirthdayCard from 'public/images/pokemon/cards/birthday-card.png';
import HolidayCard from 'public/images/pokemon/cards/holiday-card.png';
import ValentineCard from 'public/images/pokemon/cards/valentine-card.png';
import WeddingCard from 'public/images/pokemon/cards/wedding-card.png';

// Backgrounds
import AnniversaryBackground from 'public/images/pokemon/background-cards/1.png';
import BirthdayBackground from 'public/images/pokemon/background-cards/2.png';
import HolidayBackground from 'public/images/pokemon/background-cards/3.png';
import ValentineBackground from 'public/images/pokemon/background-cards/4.png';
import WeddingBackground from 'public/images/pokemon/background-cards/5.png';

// Hairs
import MaleHair1 from 'public/images/pokemon/hairs/male-hair-1.png';
import MaleHair2 from 'public/images/pokemon/hairs/male-hair-2.png';
import MaleHair3 from 'public/images/pokemon/hairs/male-hair-3.png';
import FemaleHair1 from 'public/images/pokemon/hairs/female-hair-1.png';
import FemaleHair2 from 'public/images/pokemon/hairs/female-hair-2.png';
import FemaleHair3 from 'public/images/pokemon/hairs/female-hair-3.png';
import FemaleHair4 from 'public/images/pokemon/hairs/female-hair-4.png';

// Skins
import MaleSkin1 from 'public/images/pokemon/skins/male-1.png';
import MaleSkin2 from 'public/images/pokemon/skins/male-2.png';
import FemaleSkin1 from 'public/images/pokemon/skins/female-1.png';
import FemaleSkin2 from 'public/images/pokemon/skins/female-2.png';

// Pokemons
import Pokemon1 from 'public/images/pokemon/pokemons/pokemon-1.png';
import Pokemon2 from 'public/images/pokemon/pokemons/pokemon-2.png';
import Pokemon3 from 'public/images/pokemon/pokemons/pokemon-3.png';
import Pokemon4 from 'public/images/pokemon/pokemons/pokemon-4.png';
import Pokemon5 from 'public/images/pokemon/pokemons/pokemon-5.png';
import Pokemon6 from 'public/images/pokemon/pokemons/pokemon-6.png';
import Pokemon7 from 'public/images/pokemon/pokemons/pokemon-7.png';
import Pokemon8 from 'public/images/pokemon/pokemons/pokemon-8.png';
import Pokemon9 from 'public/images/pokemon/pokemons/pokemon-9.png';
import Pokemon10 from 'public/images/pokemon/pokemons/pokemon-10.png';
import Pokemon11 from 'public/images/pokemon/pokemons/pokemon-11.png';
import Pokemon12 from 'public/images/pokemon/pokemons/pokemon-12.png';
import Pokemon13 from 'public/images/pokemon/pokemons/pokemon-13.png';
import Pokemon14 from 'public/images/pokemon/pokemons/pokemon-14.png';
import Pokemon15 from 'public/images/pokemon/pokemons/pokemon-15.png';
import Pokemon16 from 'public/images/pokemon/pokemons/pokemon-16.png';

// Hats
import Hat1 from 'public/images/pokemon/hats/hat-1.png';
import Hat2 from 'public/images/pokemon/hats/hat-2.png';
import NoelHat from 'public/images/pokemon/hats/noel-hat.png';

// Clothes
import GirlDress1 from 'public/images/pokemon/clothes/girl-dress-1.png';
import GirlDress2 from 'public/images/pokemon/clothes/girl-dress-2.png';
import MaleCloth1 from 'public/images/pokemon/clothes/male-cloth-1.png';
import MaleClothe2 from 'public/images/pokemon/clothes/man-cloth-2.png';

// Mockups
import Mockup1 from 'public/images/pokemon/mockup/mk1.jpg';
import Mockup2 from 'public/images/pokemon/mockup/mk2.jpg';
import Mockup3 from 'public/images/pokemon/mockup/mk3.jpg';

export const POKEMON_SETTING_TAB_KEYS = {
  DESIGN: 'design',
  MESSAGE: 'message',
};
export const POKEMON_STYLE_KEYS = {
  ANNIVERSARY: 'anniversary',
  BIRTHDAY: 'birthday',
  HOLIDAY: 'holiday',
  VALENTINE: 'valentine',
  WEDDING: 'wedding',
};
export const CHARACTER_GENDER_KEYS = {
  MALE: 'male',
  FEMALE: 'female',
} as const;
const {DESIGN, MESSAGE} = POKEMON_SETTING_TAB_KEYS;
const {ANNIVERSARY, BIRTHDAY, HOLIDAY, VALENTINE, WEDDING} = POKEMON_STYLE_KEYS;
const {FEMALE, MALE} = CHARACTER_GENDER_KEYS;

export const POKEMON_SETTING_TABS = [
  {
    key: DESIGN,
    label: 'Design',
  },
  {
    key: MESSAGE,
    label: 'Message',
  },
];

export const POKEMON_STYLES = [
  {
    key: ANNIVERSARY,
    label: 'Anniversary',
    background: AnniversaryBackground,
    backgroundCard: AnniversaryCard,
    hats: {
      [MALE]: '',
      [FEMALE]: '',
    },
    clothes: {
      [MALE]: MaleCloth1,
      [FEMALE]: GirlDress1,
    },
    quoteTitles: ['Happy Anniversary!'],
    quoteOptions: [
      'Every love story is beautiful, but ours is favorite',
      'Every moment of love is precious, and our story is the most beautiful melody to me',
      'A lifetime of memories together, a special love that will last forever.',
      'If I had my life to live over again, I would find you sooner so that I could love longer.',
    ],
  },
  {
    key: BIRTHDAY,
    label: 'Birthday',
    background: BirthdayBackground,
    backgroundCard: BirthdayCard,
    hats: {
      [MALE]: Hat2,
      [FEMALE]: Hat1,
    },
    clothes: {
      [MALE]: MaleCloth1,
      [FEMALE]: GirlDress1,
    },
    quoteTitles: [`Happy Birthday, dear!`, `Birthday Wish:`],
    quoteOptions: [
      `Sometime you forget that you're awesome, so this is your reminder`,
      `
      May all your wish come true and enjoy your special day
      `,
      `
      Life isn't about what you can hold in your hands. It's about what you hold in your heart.
      `,
      `May your day be filled with sunshine and smile, laughter, love, and cheer...`,
      `Birthdays come only once a year, but a person like you brings life to hundreds every single day!`,
    ],
  },
  {
    key: HOLIDAY,
    label: 'Holiday',
    background: HolidayBackground,
    backgroundCard: HolidayCard,
    hats: {
      [MALE]: NoelHat,
      [FEMALE]: NoelHat,
    },
    clothes: {
      [MALE]: MaleCloth1,
      [FEMALE]: GirlDress1,
    },
    quoteTitles: [`Merry Christmas to my one and only:`, `Merry Christmas!`],
    quoteOptions: [
      `Our love is a treasure. May Christmas sparkle with the magic of our journey.`,
      `
      Wishing you a Christmas filled with joy, and a year overflowing with happiness.
      `,
      `
      May your Christmas shine with warmth, family love, and the joy of friendship.
      `,
      `Sending prayers and warm wishes. May God's blessings be yours this Christmas!`,
      `
        May you be happy and blessed, <br />
        Not just on Christmas day, but throughout of the year!
      `,
    ],
  },
  {
    key: VALENTINE,
    label: 'Valentine',
    background: ValentineBackground,
    backgroundCard: ValentineCard,
    hats: {
      [MALE]: '',
      [FEMALE]: '',
    },
    clothes: {
      [MALE]: MaleCloth1,
      [FEMALE]: GirlDress1,
    },
    quoteTitles: [`Happy Valentine's Day!`],
    quoteOptions: [
      'Every love story is beautiful, but ours is favorite',
      `
        Roses are red, <br />
        Violets are blue, <br />
        I love you more than I can say...
      `,
      `
        The Day I Met You I found my missing piece. <br />
        I love you forever & always 
      `,
      `You're The Only One I Want To Annoy For The Rest Of My Life`,
    ],
  },
  {
    key: WEDDING,
    label: 'Wedding',
    background: WeddingBackground,
    backgroundCard: WeddingCard,
    hats: {
      [MALE]: '',
      [FEMALE]: '',
    },
    clothes: {
      [MALE]: MaleClothe2,
      [FEMALE]: GirlDress2,
    },
    quoteTitles: [`My Dear:`],
    quoteOptions: [
      `Together, we face life's challenges, evolving our love into something stronger and more joyful each day.`,
      `Love is a timeless treasure to value more each year, a wealth of golden memories`,
      `A lifetime of memories together, a special love that will last forever.`,
      `Every love story is beautiful, but ours is favorite`,
      `
        The Day I Met You I found my missing piece. <br />
        I love you forever & always
      `,
    ],
  },
];

export const CHARACTER_GENDERS = [
  {
    key: MALE,
    label: 'Male',
  },
  {
    key: FEMALE,
    label: 'Female',
  },
];

export const CHARACTER_HAIRS = [
  {
    key: 'male-hair-1',
    label: 'Male Hair 1',
    image: MaleHair1,
    gender: MALE,
  },
  {
    key: 'male-hair-2',
    label: 'Male Hair 2',
    image: MaleHair2,
    gender: MALE,
  },
  {
    key: 'male-hair-3',
    label: 'Male Hair 3',
    image: MaleHair3,
    gender: MALE,
  },
  {
    key: 'female-hair-1',
    label: 'Female Hair 1',
    image: FemaleHair1,
    gender: FEMALE,
  },
  {
    key: 'female-hair-2',
    label: 'Female Hair 2',
    image: FemaleHair2,
    gender: FEMALE,
  },
  {
    key: 'female-hair-3',
    label: 'Female Hair 3',
    image: FemaleHair3,
    gender: FEMALE,
  },
  {
    key: 'female-hair-4',
    label: 'Female Hair 3',
    image: FemaleHair4,
    gender: FEMALE,
  },
] as const;

export const CHARACTER_SKINS = [
  {
    key: 'male-skin-1',
    label: 'Male Skin 1',
    image: MaleSkin1,
    gender: MALE,
  },
  {
    key: 'male-skin-2',
    label: 'Female Skin 2',
    image: MaleSkin2,
    gender: MALE,
  },
  {
    key: 'female-skin-1',
    label: 'Female Skin 1',
    image: FemaleSkin1,
    gender: FEMALE,
  },
  {
    key: 'female-skin-2',
    label: 'Female Skin 2',
    image: FemaleSkin2,
    gender: FEMALE,
  },
] as const;

export const POKEMONS = [
  {
    key: '1',
    label: 'Pikachu',
    image: Pokemon1,
  },
  {
    key: '2',
    label: 'Mew',
    image: Pokemon2,
  },
  {
    key: '3',
    label: 'Squirtle',
    image: Pokemon3,
  },
  {
    key: '4',
    label: 'Eevee',
    image: Pokemon4,
  },
  {
    key: '5',
    label: 'Bulbassaur',
    image: Pokemon5,
  },
  {
    key: '6',
    label: 'Jiggky Puff',
    image: Pokemon6,
  },
  {
    key: '7',
    label: 'Charmander',
    image: Pokemon7,
  },
  {
    key: '8',
    label: 'Chariard',
    image: Pokemon8,
  },
  {
    key: '9',
    label: 'Gengar',
    image: Pokemon9,
  },
  {
    key: '10',
    label: 'Umbreon',
    image: Pokemon10,
  },
  {
    key: '11',
    label: 'Cubone',
    image: Pokemon11,
  },
  {
    key: '12',
    label: 'Snorlax',
    image: Pokemon12,
  },
  {
    key: '13',
    label: 'Dragonite',
    image: Pokemon13,
  },
  {
    key: '14',
    label: 'Arcanine',
    image: Pokemon14,
  },
  {
    key: '15',
    label: 'Fuecoco',
    image: Pokemon15,
  },
  {
    key: '16',
    label: 'Quaxly',
    image: Pokemon16,
  },
];

export const MOCKUP_IMAGES = [
  {
    key: 1,
    label: 'Mockup 1',
    image: Mockup1,
  },
  {
    key: 2,
    label: 'Mockup 2',
    image: Mockup2,
  },
  {
    key: 3,
    label: 'Mockup 3',
    image: Mockup3,
  },
];
