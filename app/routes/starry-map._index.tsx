/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-template-curly-in-string */
// Libraries
import {Flex, Form} from 'antd';
import styled from '@emotion/styled';
import {
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen';
import {useEffect, useState} from 'react';

// Components
import {Select, Typography, Button} from '~/components/ui';
import {Tabs} from '~/components/lovevibe';

// Constants
import {CHARACTER_GENDER_KEYS} from '~/constants';

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
import {useDebounce} from '~/hooks/useDebounceV2';
import {useAutoComplete, useGetPlaceDetails} from '~/queries';
import {googleServices} from '~/services/google';

export const meta: MetaFunction = () => {
  return [{title: 'Pokemon Card | LoveVibe'}];
};

interface StarryMapSettings {
  starStyle: string[];
  mapColor: string;
  printSize?: string;
  location?: string;
}
type TState = {
  values: StarryMapSettings;
  activeTab: string;
  locationSearch?: string;
};

const INITIAL_STARRY_MAP_SETTINGS: StarryMapSettings = {
  starStyle: [STAR_STYLE_KEYS.CONSTELLATIONS],
  mapColor: MAP_COLORS_KEYS.BLACK,
  printSize: undefined,
  location: undefined,
};

const INITIAL_STATE: TState = {
  values: INITIAL_STARRY_MAP_SETTINGS,
  activeTab: STARRY_MAP_SETTING_TAB_KEYS.CHOOSE_STYLE,
};

// Common
export default function StarryMapPage() {
  // State
  const [state, setState] = useState<TState>(INITIAL_STATE);
  const {activeTab} = state;

  // Form
  const [form] = Form.useForm<StarryMapSettings>();

  // Watches
  const starStyle = Form.useWatch('starStyle', form);
  const location = Form.useWatch('location', form);

  // Hooks
  const debounceLocationSearch = useDebounce(state.locationSearch, 500);

  // // Queries
  // const {data: locationList} = useAutoComplete({
  //   query: debounceLocationSearch || '',
  // });
  // const {data: locationDetail} = useGetPlaceDetails({
  //   placeId: location,
  // });

  // console.log('🚀 ~ StarryMapPage ~ locationDetail:', locationDetail);

  useEffect(() => {
    googleServices.autoComplete(debounceLocationSearch || '').then((values) => {
      console.log('🚀 ~ StarryMapPage ~ values:', values);
    });
  }, [debounceLocationSearch]);

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
      <>
        <Form.Item<StarryMapSettings>
          label="Location"
          name="location"
          rules={[{required: true}]}
        >
          <Select
            showSearch
            placeholder="Type to search and choose your location"
            onSearch={(value) =>
              setState((prev) => ({...prev, locationSearch: value}))
            }
          />
        </Form.Item>
      </>
    );
  };

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

  const renderSteps = () => {
    switch (activeTab) {
      case STARRY_MAP_SETTING_TAB_KEYS.CHOOSE_STYLE:
        return renderStep1();
      case STARRY_MAP_SETTING_TAB_KEYS.GENERATE_STAR_MAP:
        return renderStep2();
      case STARRY_MAP_SETTING_TAB_KEYS.CUSTOMIZE_INFORMATION:
      default:
        return null;
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
      <StarryMapPoster />
    </div>
  );
}

export const StarryMapPoster = styled.div`
  flex-shrink: 0;
  width: 420px;
  height: 563px;
`;
