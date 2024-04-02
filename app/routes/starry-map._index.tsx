/* eslint-disable eslint-comments/disable-enable-pair */
// Libraries
import {useState} from 'react';
import {Flex, Form, AutoComplete, DatePicker, Switch} from 'antd';
import {type MetaFunction} from '@shopify/remix-oxygen';
import {type Dayjs} from 'dayjs';
import styled from '@emotion/styled';

// Components
import {Select, Typography, Button, Spin, Input, Modal} from '~/components/ui';
import {Tabs} from '~/components/lovevibe';
// Constants

import {API_SECRET_KEY} from '~/constants';
import {StarryMapPoster} from '~/components/starry-map/StarryMapPoster.client';

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
import {ClientOnly} from 'remix-utils/client-only';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const meta: MetaFunction = () => {
  return [{title: 'Starry Map | LoveVibe'}];
};

export interface StarryMapSettings {
  starStyle: string[];
  mapColor: string;
  printSize?: string;
  location?: string;
  date?: Dayjs;
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
  showModal: boolean;
  previewImage?: string;
  isLoading?: boolean;
};

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
  showModal: false,
  previewImage: '',
  isLoading: false,
};

// Common
export default function StarryMapPage() {
  // State
  const [state, setState] = useState<TState>(INITIAL_STATE);
  const {activeTab, values, locationDetail, showModal, isLoading} = state;

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
  const onFinishSubmit = async (values: StarryMapSettings) => {
    const currentTabIdx = STARRY_MAP_SETTING_TABS.findIndex(
      (tab) => tab.key === activeTab,
    );
    if (currentTabIdx + 1 < STARRY_MAP_SETTING_TABS.length) {
      setState((prev) => ({
        ...prev,
        activeTab: STARRY_MAP_SETTING_TABS[currentTabIdx + 1].key,
      }));
    }

    // Last step
    if (currentTabIdx + 1 === STARRY_MAP_SETTING_TABS.length) {
      setState((prev) => ({...prev, showModal: true, isLoading: true}));
      const {printSize} = state.values;

      const starryMapPosterEl = document.querySelector(
        '#starry-map-poster',
      ) as HTMLElement;
      const canvas = await html2canvas(starryMapPosterEl, {
        scale: 3,
        allowTaint: true,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
      });
      canvas.id = 'starry-map-preview-canvas';

      const previewStarryMapEl = document.querySelector('#starry-map-preview');

      previewStarryMapEl.appendChild(canvas);

      setState((prev) => ({...prev, isLoading: false}));

      // const {width, height} =
      //   PRINT_SIZE.find((size) => size.value === printSize) || {};

      // const pdf = new jsPDF({
      //   orientation: 'p',
      //   unit: 'cm',
      //   format: [width, height],
      //   putOnlyUsedFonts: true,
      // });

      // pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);

      // pdf.save('starry-map.pdf')
    }
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
    handleChangeValues({
      location: value,
    });
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
        <div className="flex flex-col gap-x-[60px] md:flex-row">
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
                    handleChangeValues({
                      starStyle: starStyle as string[],
                    });

                    form.setFieldsValue({
                      starStyle:
                        typeof starStyle === 'string' ? [starStyle] : starStyle,
                    });
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
        </div>
      </>
    );
  };

  const renderStep2 = () => {
    return (
      <Flex vertical className="w-full md:w-[356px]">
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
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
          <Form.Item<StarryMapSettings>
            name="name"
            label="Names"
            rules={[{required: true}]}
          >
            <Input className="" placeholder="Type your names" />
          </Form.Item>
          <Form.Item<StarryMapSettings>
            name="title"
            label="Title"
            rules={[{required: true}]}
          >
            <Input className="" placeholder="Type your title" />
          </Form.Item>
        </div>

        <Form.Item<StarryMapSettings> label="Choose the information you want to display">
          <div
            className={`grid w-full grid-cols-3 rounded-xl border border-neutrals-5 px-10 py-6 ${css`
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

  const handleChangeValues = (values: Partial<StarryMapSettings>) => {
    setState((prev) => ({
      ...prev,
      values: {...prev.values, ...values},
    }));
  };

  const handleExportStarryMap = async () => {
    const canvas = document.querySelector(
      '#starry-map-preview-canvas',
    ) as HTMLCanvasElement;
    const dataUrl = canvas?.toDataURL('png', 1.0);

    const {width, height} =
      PRINT_SIZE.find((size) => size.value === values.printSize) || {};

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'cm',
      format: [width, height],
      putOnlyUsedFonts: true,
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);

    pdf.save('starry-map.pdf');
  };

  return (
    <>
      <div className="container mb-10 mt-2 flex flex-col-reverse items-center gap-x-[88px] gap-y-2 md:mt-[60px] md:flex-row md:items-start">
        <div className="w-full flex-1">
          <Typography.Title className="!mb-[16px] text-center !text-2xl !font-semibold !text-primary md:!mb-[60px] md:text-left md:!text-[40px]">
            COUPLE STAR MAP
          </Typography.Title>

          <Tabs
            moreIcon={undefined}
            activeKey={activeTab}
            items={STARRY_MAP_SETTING_TABS.map((item, idx) => ({
              ...item,
              label: `${idx + 1}. ${item.label}`,
            }))}
            className="border-b border-neutrals-6 md:border-none"
            onChange={onChangeTabs}
          />

          <FormWrapper className="mt-4 md:mt-6">
            <Form<StarryMapSettings>
              name="starry-map"
              form={form}
              layout="vertical"
              initialValues={INITIAL_STARRY_MAP_SETTINGS}
              validateMessages={{
                required: 'Required field',
              }}
              onValuesChange={(changedValues) => {
                handleChangeValues(changedValues);
              }}
              onFinish={onFinishSubmit}
            >
              {renderSteps()}
              <Form.Item noStyle>
                <Button
                  loading={isLoading}
                  type="primary"
                  htmlType="submit"
                  className="mt-5 !flex !w-full items-center justify-center gap-3 md:!w-[300px]"
                >
                  {activeTab ===
                  STARRY_MAP_SETTING_TAB_KEYS.CUSTOMIZE_INFORMATION
                    ? 'Download Preview Image'
                    : 'Continue'}
                  <ArrowRight
                    style={{
                      transform:
                        activeTab ===
                        STARRY_MAP_SETTING_TAB_KEYS.CUSTOMIZE_INFORMATION
                          ? 'rotate(90deg)'
                          : '',
                    }}
                  />
                </Button>
              </Form.Item>
            </Form>
          </FormWrapper>
        </div>
        <ClientOnly fallback={null}>
          {() => (
            <div className="top-0 flex w-full justify-center bg-white md:w-fit">
              <StarryMapPoster
                id="starry-map-poster"
                values={values}
                locationDetail={locationDetail}
              />
            </div>
          )}
        </ClientOnly>
      </div>
      <Modal
        destroyOnClose
        centered
        // className="md:!w-[518px] !w-[80vw]"
        open={showModal}
        onCancel={() => setState((prev) => ({...prev, showModal: false}))}
        onOk={() => setState((prev) => ({...prev, showModal: false}))}
        footer={null}
        classNames={{
          body: 'flex flex-col items-center gap-6',
          // wrapper: 'bg-slate-500',
        }}
      >
        <Typography.Text className="!text-[24px] font-semibold md:!text-[32px]">
          Review Your Image
        </Typography.Text>
        {/* <StyledPokemonCard values={settings} /> */}
        <StarryMapPreview id="starry-map-preview" />
        <Button
          block
          type="primary"
          className="mb-3 !flex !max-w-[243px] items-center justify-center gap-2 md:!max-w-[420px]"
          loading={false}
          onClick={() => handleExportStarryMap()}
        >
          Download Image
          <ArrowRight style={{transform: 'rotate(90deg)'}} />
        </Button>
      </Modal>
    </>
  );
}

const StarryMapPreview = styled.div`
  width: 420px;

  canvas {
    width: 420px !important;
    height: 586px !important;
  }

  @media screen and (max-width: 768px) {
    width: 243px;

    canvas {
      width: 243px !important;
      height: 330px !important;
    }
  }
`;
