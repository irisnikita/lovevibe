/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-template-curly-in-string */
// Libraries
import {Flex, Form, AutoComplete, DatePicker, Switch} from 'antd';
import styled from '@emotion/styled';
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen';
import React, {useEffect, useState} from 'react';
import * as d3 from 'd3';

// Components
import {Select, Typography, Button, Spin, Input} from '~/components/ui';
import {Tabs} from '~/components/lovevibe';

// Constants
import {API_SECRET_KEY, CHARACTER_GENDER_KEYS} from '~/constants';

// Styled
import {FormWrapper} from '~/styled';

import {Checkbox} from '~/components/lovevibe/Checkbox';
import {
  MAP_COLORS,
  MAP_COLORS_KEYS,
  PRINT_SIZE,
  STARRY_MAP_SETTING_TABS,
  STARRY_MAP_SETTING_TAB_KEYS,
  STAR_STYLE,
  STAR_STYLE_KEYS,
} from '~/constants/starry-map';
import {ArrowRight} from '~/icons';

// Hooks
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import {css} from '@emotion/css';

export const meta: MetaFunction = () => {
  return [{title: 'Pokemon Card | LoveVibe'}];
};

interface StarryMapSettings {
  starStyle: string[];
  mapColor: string;
  printSize?: string;
  location?: string;
  date?: Date;
  name: string;
  title: string;
  showLocationLabel: boolean;
  showDateLabel: boolean;
  showCoordinates: boolean;
}

type TState = {
  values: StarryMapSettings;
  activeTab: string;
  locationSearch?: string;
  locationDetail?: any;
};

interface CelestialMapProps {
  values: StarryMapSettings;
  locationDetail?: TState['locationDetail'];
}

const INITIAL_STARRY_MAP_SETTINGS: StarryMapSettings = {
  starStyle: [STAR_STYLE_KEYS.CONSTELLATIONS],
  mapColor: MAP_COLORS_KEYS.BLACK,
  printSize: undefined,
  location: undefined,
  name: '',
  title: '',
  showCoordinates: true,
  showDateLabel: true,
  showLocationLabel: true,
  date: undefined,
};

const INITIAL_STATE: TState = {
  values: INITIAL_STARRY_MAP_SETTINGS,
  activeTab: STARRY_MAP_SETTING_TAB_KEYS.CHOOSE_STYLE,
};

// Components
const CelestialMap: React.FC<CelestialMapProps> = (props) => {
  const {values, locationDetail} = props;
  const {geometry} = locationDetail?.geometry || {};
  const {lat: LAT, lng: LON} = locationDetail || {};

  console.log(LAT, LON);

  const celestialMapRef = React.useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // console.log(Celestial);
    }
    // const d3Cles = require('d3-celestial');
    // console.log('🚀 ~ useEffect ~ d3Cles:', d3Cles);
    // const fontString = `10px Roboto, sans-serif`;
    // const config = {
    //   container: 'map',
    //   width: 500,
    //   formFields: {download: true},
    //   datapath: 'https://ofrohn.github.io/data/',
    //   form: false,
    //   advanced: false,
    //   interactive: false,
    //   disableAnimations: false,
    //   zoomlevel: null,
    //   zoomextend: 1,
    //   projection: 'airy',
    //   transform: 'equatorial',
    //   follow: 'zenith',
    //   geopos: [LAT, LON],
    //   lines: {
    //     graticule: {
    //       show: true,
    //       color: '#cccccc',
    //       width: 0.3,
    //       opacity: 0.5,
    //     },
    //     equatorial: {show: false},
    //     ecliptic: {show: false},
    //     galactic: {show: false},
    //     supergalactic: {show: false},
    //   },
    //   planets: {
    //     show: false,
    //     // List of all objects to show
    //     which: [
    //       'sol',
    //       'mer',
    //       'ven',
    //       'ter',
    //       'lun',
    //       'mar',
    //       'jup',
    //       'sat',
    //       'ura',
    //       'nep',
    //     ],
    //     names: false, // Show name in nameType language next to symbol
    //     nameStyle: {
    //       fill: '#00ccff',
    //       font: "14px 'Lucida Sans Unicode', Consolas, sans-serif",
    //       align: 'right',
    //       baseline: 'top',
    //     },
    //     namesType: 'desig',
    //   },
    //   dsos: {
    //     show: false,
    //     names: false,
    //   },
    //   constellations: {
    //     names: false,
    //     namesType: 'iau',
    //     nameStyle: {
    //       fill: '#ffffff',
    //       align: 'center',
    //       baseline: 'middle',
    //       font: [fontString, `0px Roboto, sans-serif`],
    //     },
    //     lines: true,
    //     lineStyle: {stroke: '#ffffff', width: 0.4, opacity: 1},
    //   },
    //   mw: {
    //     show: true,
    //     style: {fill: '#ffffff', width: 0.5, opacity: 0.2},
    //   },
    //   background: {
    //     fill: values.mapColor,
    //     stroke: '#ffffff',
    //     opacity: 1,
    //     width: 1,
    //   },
    //   stars: {
    //     colors: false,
    //     size: 4,
    //     limit: 6,
    //     exponent: -0.28,
    //     designation: false,
    //     propername: false,
    //     propernameType: 'name',
    //     propernameStyle: {
    //       fill: '#ffffff',
    //       font: fontString,
    //       align: 'right',
    //       baseline: 'center',
    //     },
    //     propernameLimit: 2.0,
    //   },
    // };
    // const celestial = Celestial(config)(d3.select(celestialMapRef.current));
    // return () => {
    //   celestial.stop();
    // };
  }, [values]);

  return <div ref={celestialMapRef}>Map</div>;
};

// Common
export default function StarryMapPage() {
  // State
  const [state, setState] = useState<TState>(INITIAL_STATE);
  const {activeTab, values} = state;

  // Form
  const [form] = Form.useForm<StarryMapSettings>();

  // Watches
  const formValues = Form.useWatch([], form);
  const {starStyle, location, mapColor} = formValues || {};

  // Hooks
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: API_SECRET_KEY,
  });

  const predictionOptions = placePredictions.map((p) => ({
    value: p.place_id,
    label: p.description,
  }));

  // Handlers
  const onFinishSubmit = (values: StarryMapSettings) => {
    const currentTabIdx = STARRY_MAP_SETTING_TABS.findIndex(
      (tab) => tab.key === activeTab,
    );
    if (currentTabIdx + 1 < STARRY_MAP_SETTING_TABS.length) {
      setState((prev) => ({
        ...prev,
        activeTab: STARRY_MAP_SETTING_TABS[currentTabIdx + 1].key,
      }));
    }

    console.log('🚀 ~ onFinishSubmit ~ values:', values);
  };

  const onChangeTabs = async (key: string) => {
    const tabIdx = STARRY_MAP_SETTING_TABS.findIndex((tab) => tab.key === key);
    const currentTabIdx = STARRY_MAP_SETTING_TABS.findIndex(
      (tab) => tab.key === activeTab,
    );

    if (tabIdx < currentTabIdx) {
      setState((prev) => ({
        ...prev,
        activeTab: key,
      }));
    } else if (tabIdx === currentTabIdx + 1) {
      form.submit();
    }
  };

  const onSelectLocation = (value: string) => {
    form.setFieldValue('location', value);
    placesService?.getDetails(
      {
        placeId: placePredictions[0].place_id,
      },
      (placeDetails: any) => {
        setState((prev) => ({
          ...prev,
          locationDetail: placeDetails,
        }));
      },
    );
  };

  const renderStep1 = () => {
    return (
      <>
        <Flex gap={60}>
          <div>
            <Form.Item<StarryMapSettings>
              label="Star Style"
              name={'starStyle'}
              rules={[{required: true}]}
            >
              <div>
                <Checkbox
                  multiple
                  value={starStyle}
                  items={Object.values(STAR_STYLE)}
                  itemStyle={{width: 105}}
                  onChange={(starStyle) => {
                    if (starStyle.length !== 0) {
                      form.setFieldsValue({
                        starStyle:
                          typeof starStyle === 'string'
                            ? [starStyle]
                            : starStyle,
                      });
                    }
                  }}
                />
              </div>
            </Form.Item>
            <Form.Item<StarryMapSettings>
              label="Print Size"
              name="printSize"
              rules={[{required: true}]}
            >
              <Select
                placeholder="Choose Your Print Size"
                options={PRINT_SIZE.map(({label, value}) => ({value, label}))}
              />
            </Form.Item>
          </div>
          <Form.Item<StarryMapSettings>
            label="Map Color"
            name="mapColor"
            rules={[{required: true}]}
          >
            <Checkbox
              value={form.getFieldValue('starStyle')}
              items={Object.values(MAP_COLORS)}
              onChange={(mapColor) =>
                form.setFieldsValue({
                  mapColor: mapColor as string,
                })
              }
            />
          </Form.Item>
        </Flex>
      </>
    );
  };

  const renderStep2 = () => {
    return (
      <Flex vertical className="w-[356px]">
        <Form.Item
          name={'location'}
          label="Location"
          rules={[{required: true}]}
        >
          <div>
            <AutoComplete
              labelRender={(props) => props.label}
              options={predictionOptions}
              dropdownRender={(node) => (
                <Spin spinning={isPlacePredictionsLoading}>{node}</Spin>
              )}
              value={predictionOptions.find((p) => p.value === location)?.label}
              placeholder="Type to search and choose your location"
              onSelect={onSelectLocation}
              onSearch={(value) => {
                getPlacePredictions({input: value});
              }}
            />
          </div>
        </Form.Item>
        <Form.Item<StarryMapSettings>
          name={'date'}
          label="Date"
          rules={[{required: true}]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
      </Flex>
    );
  };

  const renderStep3 = () => {
    return (
      <>
        <div className="grid grid-cols-2 gap-x-10">
          <Form.Item<StarryMapSettings>
            name="name"
            label="Names"
            rules={[{required: true}]}
          >
            <Input className="" placeholder="Type your names" />
          </Form.Item>
          <Form.Item<StarryMapSettings>
            name="name"
            label="Title"
            rules={[{required: true}]}
          >
            <Input className="" placeholder="Type your title" />
          </Form.Item>
        </div>

        <Form.Item<StarryMapSettings> label="Choose the information you want to display">
          <div
            className={`grid grid-cols-3 px-10 py-6 w-full border border-neutrals-5 rounded-xl ${css`
              .ant-form-item-label {
                font-weight: 500;
              }
            `}`}
          >
            <Form.Item<StarryMapSettings>
              name="showLocationLabel"
              label="Location"
            >
              <Switch />
            </Form.Item>
            <Form.Item<StarryMapSettings> name="showDateLabel" label="Date">
              <Switch />
            </Form.Item>
            <Form.Item<StarryMapSettings>
              name="showCoordinates"
              label="Coordinates"
            >
              <Switch />
            </Form.Item>
          </div>
        </Form.Item>
      </>
    );
  };

  const renderSteps = () => {
    switch (activeTab) {
      case STARRY_MAP_SETTING_TAB_KEYS.CHOOSE_STYLE:
        return renderStep1();
      case STARRY_MAP_SETTING_TAB_KEYS.GENERATE_STAR_MAP:
        return renderStep2();
      case STARRY_MAP_SETTING_TAB_KEYS.CUSTOMIZE_INFORMATION:
      default:
        return renderStep3();
    }
  };

  return (
    <div className="container mt-[60px] flex gap-[88px]">
      <div className="flex-1">
        <Typography.Title className="!text-[40px] !font-semibold !text-primary !mb-[60px]">
          COUPLE STAR MAP
        </Typography.Title>

        <Tabs
          activeKey={activeTab}
          items={STARRY_MAP_SETTING_TABS.map((item, idx) => ({
            ...item,
            label: `${idx + 1}. ${item.label}`,
          }))}
          onChange={onChangeTabs}
        />

        <FormWrapper className="mt-6">
          <Form<StarryMapSettings>
            name="starry-map"
            form={form}
            layout="vertical"
            initialValues={INITIAL_STARRY_MAP_SETTINGS}
            validateMessages={{
              required: 'Required field',
            }}
            onValuesChange={(_, values) =>
              setState((prev) => ({...prev, values}))
            }
            onFinish={onFinishSubmit}
          >
            {renderSteps()}
            <Form.Item noStyle>
              <Button
                type="primary"
                htmlType="submit"
                className="!flex items-center justify-center gap-3 !w-[300px] mt-5"
              >
                Continue
                <ArrowRight />
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>
      </div>
      <StarryMapPoster $color={values.mapColor}>
        <div className="frame">
          <CelestialMap values={values} locationDetail={state.locationDetail} />
        </div>
      </StarryMapPoster>
    </div>
  );
}

export const StarryMapPoster = styled.div<{$color: string}>`
  flex-shrink: 0;
  width: 420px;
  height: 563px;
  border: 3px solid var(--neutrals-5-color);
  padding: 22px;
  background-color: ${({$color}) => $color};
  transition: all 0.2s ease-in-out;

  .frame {
    width: 100%;
    height: 100%;
    border: 3px solid
      ${({$color}) =>
        $color === MAP_COLORS_KEYS.WHITE
          ? MAP_COLORS_KEYS.BLACK
          : MAP_COLORS_KEYS.WHITE};
  }
`;
