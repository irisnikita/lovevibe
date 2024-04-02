import styled from '@emotion/styled';
import dayjs from 'dayjs';
import {isEmpty} from 'lodash';
import {useEffect, useMemo} from 'react';
import {MAP_COLORS_KEYS, STAR_STYLE_KEYS} from '~/constants';
import {useDeepCompareMemo} from '~/hooks';
import {Celestial} from '~/lib/celestialv2/celestial';

// Types
import {type StarryMapSettings} from '~/routes/starry-map._index';
import {convertToGPSCoordinatesWithDirections} from '~/utils';

interface CelestialMapProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  values: StarryMapSettings;
  locationDetail: any;
}

const {CONSTELLATIONS, GRATICULE, MILKY_WAY} = STAR_STYLE_KEYS;
const {BLACK, WHITE} = MAP_COLORS_KEYS;

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

const [LAT, LON] = [49.2827, 123.1207];
const FONT = 'Raleway';

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

  projection: 'airy',
  transform: 'equatorial',

  follow: 'zenith',
  geopos: [LAT, LON],

  lines: {
    graticule: {
      show: false,
      color: '#cccccc',
      width: 0.5,
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
    show: false,
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
    show: false,
    style: {fill: '#ffffff', width: 0.5, opacity: 0.2},
  },

  background: {
    fill: STARMAP_COLORS[0].map,
    stroke: '#ffffff',
    opacity: 1,
    width: 2,
  },

  stars: {
    colors: false,
    size: 4,
    limit: 6,
    exponent: -0.28,
    designation: false,

    style: {fill: '#ffffff', opacity: 1},
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

export const StarryMapPoster: React.FC<CelestialMapProps> = (props) => {
  const {values, locationDetail, ...restOfProps} = props;
  const {
    name,
    title,
    date,
    starStyle,
    mapColor,
    showLocationLabel,
    showDateLabel,
    showCoordinates,
  } = values || {};
  const {geometry} = locationDetail || {};

  const [lat, long] = useDeepCompareMemo(() => {
    if (geometry) {
      const {location} = geometry || {};
      return [location.lat(), location.lng()];
    }

    return [0, 0];
  }, [geometry]);

  useEffect(() => {
    setTimeout(() => {
      Celestial.display(celestialConfig);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (Celestial && Celestial.apply) {
        celestialConfig.constellations.lines =
          !!starStyle.includes(CONSTELLATIONS);
        celestialConfig.mw.show = !!starStyle.includes(MILKY_WAY);
        celestialConfig.lines.graticule.show = !!starStyle.includes(GRATICULE);
        celestialConfig.background.fill = mapColor;

        switch (mapColor) {
          case BLACK:
            celestialConfig.constellations.nameStyle.fill = WHITE;
            celestialConfig.lines.graticule.color = WHITE;
            celestialConfig.constellations.lineStyle.stroke = WHITE;
            celestialConfig.background.stroke = WHITE;
            celestialConfig.mw.style.fill = WHITE;
            celestialConfig.stars.style.fill = WHITE;
            break;
          case WHITE:
          default:
            celestialConfig.constellations.nameStyle.fill = BLACK;
            celestialConfig.constellations.lineStyle.stroke = BLACK;
            celestialConfig.background.stroke = BLACK;
            celestialConfig.mw.style.fill = BLACK;
            celestialConfig.stars.style.fill = BLACK;
            break;
        }

        if (date) {
          Celestial.skyview({date: date.toDate()});
        }

        Celestial.apply(celestialConfig);
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, celestialConfig]);

  useEffect(() => {
    if (lat && long) {
      celestialConfig.geopos = [lat, long];
      Celestial.location([lat, long]);
    }
  }, [lat, long]);

  return (
    <StarryMapPosterWrapper
      $backgroundColor={mapColor}
      $color={mapColor === BLACK ? WHITE : BLACK}
      {...restOfProps}
    >
      <div className="frame">
        <MapContainer id="map-container">
          <div id="map" className="map"></div>
          <div className="map-info">
            <div className="map-info__name">{name}</div>
            <div className="map-info__title">{title}</div>
            <div className="map-info__divider"></div>
            <div className="map-info__location">
              <LocationItem $show={showLocationLabel}>
                {locationDetail?.name}
              </LocationItem>
              <LocationItem $show={showCoordinates}>
                {convertToGPSCoordinatesWithDirections(lat, long)}
              </LocationItem>
              <LocationItem $show={showDateLabel}>
                {dayjs(date).isValid ? dayjs(date).format('Do MMM YYYY') : ''}
              </LocationItem>
            </div>
          </div>
        </MapContainer>
      </div>
    </StarryMapPosterWrapper>
  );
};

const StarryMapPosterWrapper = styled.div<{
  $backgroundColor: string;
  $color: string;
}>`
  flex-shrink: 0;
  width: 420px;
  height: 563px;
  border: 3px solid var(--neutrals-5-color);
  padding: 22px;
  background-color: ${({$backgroundColor}) => $backgroundColor};
  transition: all 0.2s ease-in-out;

  .frame {
    width: 100%;
    height: 100%;
    padding: 22px;
    border: 3px solid
      ${({$color}) =>
        $color === MAP_COLORS_KEYS.WHITE
          ? MAP_COLORS_KEYS.BLACK
          : MAP_COLORS_KEYS.WHITE};
  }

  .map {
    width: 296px !important;
    height: 296px !important;

    canvas {
      width: 296px !important;
      height: 296px !important;
    }
  }

  .map-info {
    word-break: break-all;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    letter-spacing: 1.5px;
    color: ${({$color}) => $color || 'white'};

    &__name {
      font-size: 24px;
      font-family: 'Maretha', sans-serif;
      font-weight: 500;
      margin-bottom: 10px;
    }

    &__divider {
      width: 25px;
      height: 2px;
      border-radius: 4px;
      background-color: white;
      margin-bottom: 14px;
    }

    &__title {
      font-family: 'Cambria', sans-serif;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    &__location {
      opacity: 0.8;
      font-family: 'Louis George', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-size: normal;
      gap: 4px;
      font-size: 10px;
    }
  }

  @media screen and (max-width: 768px) {
    width: 279px;
    height: 374px;
    padding: 14px;

    .frame {
      padding: 14px 24px;
    }

    .map {
      width: 197px !important;
      height: 197px !important;

      canvas {
        width: 197px !important;
        height: 197px !important;
      }
    }

    .map-info {
      margin-top: 18px;

      &__name {
        font-size: 18px;
        margin-bottom: 5px;
      }

      &__divider {
        /* width: 25px;
      height: 2px;
      border-radius: 4px;
      background-color: white; */
        margin-bottom: 7px;
      }

      &__title {
        font-size: 10px;
      }

      &__location {
        font-size: 5px;
      }
    }
  }
`;
const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LocationItem = styled.div<{$show: boolean}>`
  display: ${({$show}) => ($show ? 'block' : 'none')};
  transition: opacity 0.2s ease-in-out;
`;
