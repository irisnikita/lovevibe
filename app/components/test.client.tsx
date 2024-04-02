import styled from '@emotion/styled';
import {useEffect} from 'react';
// import {Celestial} from '~/lib/celestialv2/celestial';

export const Hello = () => {
  const [LAT, LON] = [49.2827, 123.1207];
  const FONT = 'Raleway';

  const DATA = {
    font: {
      family: 'Roboto, sans-serif',
      size: '10px',
    },
  };
  const {font} = DATA;
  const fontString = `${font.size} ${font.family}`;
  const STARMAP_COLORS = [
    {
      background: '#000000',
      map: '#000000',
    },
    {
      background: '#4d4d5a',
      map: '#4d4d5a',
    },
    {
      background: '#171f3b',
      map: '#171f3b',
    },
    {
      background: '#005c74',
      map: '#005c74',
    },
  ];

  const celestialConfig = {
    container: 'map',
    width: 500,
    formFields: {download: true},

    datapath: 'https://ofrohn.github.io/data/',

    form: false,
    advanced: false,
    interactive: false,
    disableAnimations: false,

    zoomlevel: null,
    zoomextend: 1,

    projection: 'geoAiryRaw',
    transform: 'equatorial',

    follow: 'zenith',
    geopos: [LAT, LON],

    lines: {
      graticule: {
        show: true,
        color: '#cccccc',
        width: 0.3,
        opacity: 0.5,
      },
      equatorial: {show: false},
      ecliptic: {show: false},
      galactic: {show: false},
      supergalactic: {show: false},
    },

    planets: {
      show: false,
      // List of all objects to show
      which: [
        'sol',
        'mer',
        'ven',
        'ter',
        'lun',
        'mar',
        'jup',
        'sat',
        'ura',
        'nep',
      ],
      names: false, // Show name in nameType language next to symbol
      nameStyle: {
        fill: '#00ccff',
        font: "14px 'Lucida Sans Unicode', Consolas, sans-serif",
        align: 'right',
        baseline: 'top',
      },
      namesType: 'desig',
    },

    dsos: {
      show: false,
      names: false,
    },

    constellations: {
      names: false,
      namesType: 'iau',
      nameStyle: {
        fill: '#ffffff',
        align: 'center',
        baseline: 'middle',
        font: [fontString, `0px ${FONT}`],
      },
      lines: true,
      lineStyle: {stroke: '#ffffff', width: 0.4, opacity: 1},
    },

    mw: {
      show: true,
      style: {fill: '#ffffff', width: 0.5, opacity: 0.2},
    },

    background: {
      fill: STARMAP_COLORS[0].map,
      stroke: '#ffffff',
      opacity: 1,
      width: 1,
    },

    stars: {
      colors: false,
      size: 4,
      limit: 6,
      exponent: -0.28,
      designation: false,

      propername: false,
      propernameType: 'name',
      propernameStyle: {
        fill: '#ffffff',
        font: fontString,
        align: 'right',
        baseline: 'center',
      },
      propernameLimit: 2.0,
    },
  };

  useEffect(() => {
    setTimeout(() => {
      const {Celestial} = require('~/lib/celestialv2/celestial');

      console.log('hello', Celestial);
      // Celestial.display(celestialConfig);
    }, 1000);
  }, []);

  return (
    <MapContainer id="map-container">
      <div id="map" className="map"></div>
      <div id="celestial-form"></div>
    </MapContainer>
  );
};

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;

  .map {
    width: 300px;
    height: 300px;
  }
`;
