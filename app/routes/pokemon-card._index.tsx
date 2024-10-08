/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-template-curly-in-string */
// Libraries
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from '@emotion/styled';
import {jsPDF} from 'jspdf';
import {convert} from 'html-to-text';
import {Layer, Stage, Text, Image as KonvaImage, Group} from 'react-konva';
import {type MetaFunction} from '@shopify/remix-oxygen';

// Images
import BacksideCard from 'public/images/pokemon/backside-card.png';

// Components
import {
  Typography,
  Divider,
  Select,
  Input,
  InputNumber,
  Button,
  Modal,
  Flex,
  Form,
} from '~/components/ui';
import {Tabs} from '~/components/lovevibe/Tabs';

// Constants
import {
  CHARACTER_GENDER_KEYS,
  CHARACTER_GENDERS,
  CHARACTER_HAIRS,
  POKEMON_SETTING_TABS,
  POKEMON_SETTING_TAB_KEYS,
  POKEMON_STYLES,
  CHARACTER_SKINS,
  POKEMONS,
  MOCKUP_IMAGES,
  POKEMON_STYLE_KEYS,
} from '~/constants';

// Styled
import {FormWrapper} from '~/styled';
import {ArrowRight, RadioCheck} from '~/icons';
import {Image as HydrogenImage} from '@shopify/hydrogen';

// Preview
import PreviewCard from 'public/images/pokemon/preview.png';

// Hooks
import {useDeepCompareEffect} from '~/hooks';
import useImage from 'use-image';
import {Checkbox} from '~/components/lovevibe/Checkbox';

const {FEMALE, MALE} = CHARACTER_GENDER_KEYS;

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Pokemon Card | LoveVibe',
      content: `Immerse yourself in the world of Pokemon with "Pokemon Card Design." Unleash your creativity as you craft unique and captivating designs for your very own Pokemon cards. Whether you're a seasoned trainer or a budding artist, "Pokemon Card Design" offers endless possibilities to showcase your favorite Pokemon and create memorable collectibles. Join the community of Pokemon enthusiasts and embark on a journey to design, share, and trade your custom Pokemon cards. Let your imagination run wild with "Pokemon Card Design"!`,
    },
  ];
};

/* Types */
type TGender = 'male' | 'female';
type TCharacter = {
  gender: TGender;
  name: string;
  hair: string;
  skin: string;
};
type PokemonSettings = {
  style: string;
  characters: TCharacter[];
  pokemons: (string | number | undefined)[];
  cardTitle: string;
  cardYear: string;
  quoteTitle?: string;
  quote?: string;
};
type TState = {
  settings: PokemonSettings;
  activeTab: string;
  selectedMockup: number;
  isLoadingExport: boolean;
  isCustomQuote: boolean;
  isCustomQuoteTitle: boolean;
  showModal?: boolean;
};
interface DesignSettingProps {
  values: PokemonSettings;
  onChange?: (values: Partial<PokemonSettings>) => void;
  onFinishSubmit: (values: Partial<PokemonSettings>) => void;
}
interface MessageSettingProps extends DesignSettingProps {
  isLoadingExport?: boolean;
  isCustomQuote?: boolean;
  isCustomQuoteTitle?: boolean;
  setPokemonState?: React.Dispatch<React.SetStateAction<TState>>;
}
interface PokemonCardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  values: PokemonSettings;
  width?: number;
  height?: number;
}
type SettingFormType = PokemonSettings;

const INITIAL_STATE: TState = {
  settings: {
    style: 'anniversary',
    characters: [
      {
        gender: MALE,
        hair: CHARACTER_HAIRS.filter(({gender}) => gender == MALE)?.[0].key,
        name: '',
        skin: CHARACTER_SKINS.filter(({gender}) => gender == MALE)?.[0].key,
      },
      {
        gender: FEMALE,
        hair: CHARACTER_HAIRS.filter(({gender}) => gender == FEMALE)?.[0].key,
        name: '',
        skin: CHARACTER_SKINS.filter(({gender}) => gender == FEMALE)?.[0].key,
      },
    ],
    pokemons: [POKEMONS[0]?.key, POKEMONS[1]?.key],
    cardTitle: '',
    cardYear: '',
    quote: undefined,
    quoteTitle: undefined,
  },
  activeTab: POKEMON_SETTING_TAB_KEYS.DESIGN,
  selectedMockup: -1,
  isLoadingExport: false,
  isCustomQuote: false,
  isCustomQuoteTitle: false,
  showModal: false,
};
const POKEMON_DIMENSION = {
  width: 744,
  height: 1039,
};

/* Components */
const PokemonCard = React.forwardRef<any, PokemonCardProps>((props, ref) => {
  const {width, height, values, ...restOfProps} = props || {};
  const {cardTitle, cardYear, characters, pokemons, style, quote, quoteTitle} =
    values;
  const styleInfo = POKEMON_STYLES.find((s) => s.key === style);

  // Konva
  const [backgroundImage] = useImage(styleInfo?.backgroundCard || '');

  if (backgroundImage) {
    backgroundImage.crossOrigin = 'anonymous';
    backgroundImage.width = POKEMON_DIMENSION.width;
    backgroundImage.width = POKEMON_DIMENSION.height;
  }

  return (
    <PokemonCardWrapper width={width} height={height} {...restOfProps}>
      <Stage
        className="canvas-pokemon-card"
        width={744}
        height={1039}
        ref={ref}
      >
        <Layer>
          {/* <Image width={420} height={586} src={PreviewCard} /> */}
          <KonvaImage image={backgroundImage} width={744} height={1039} />
          {characters.map((character, idx) => {
            const {gender, hair, skin} = character;
            const skinInfo = CHARACTER_SKINS.find(({key}) => key === skin);
            const hairInfo = CHARACTER_HAIRS.find(({key}) => key === hair);
            const hatImage = styleInfo?.hats[gender] || '';
            const clothImage = styleInfo?.clothes[gender] || '';
            const skinData: any = {
              image: '',
              x: 234,
              y: 295,
            };
            const hairData: any = {
              image: '',
              width: 144,
              height: 83,
              x: 220,
              y: 277,
            };
            const hatData: any = {
              image: '',
              width: 56,
              height: 69,
              x: 262,
              y: 233,
            };
            const clothData: any = {
              image: '',
              width: 94,
              height: 94,
              x: 252,
              y: 399,
            };

            switch (style) {
              case POKEMON_STYLE_KEYS.HOLIDAY: {
                hatData.y = 240;
                hatData.width = 93;
                hatData.height = 65;
                break;
              }

              default:
                break;
            }

            switch (idx) {
              case 0: {
                if (gender === FEMALE) {
                  hairData.x = 226;
                  clothData.x = 259;
                } else {
                  //
                }

                if (style === POKEMON_STYLE_KEYS.HOLIDAY) {
                  hatData.x = 230;
                }

                break;
              }

              case 1:
              default: {
                skinData.x = 390;
                hatData.x = 482;
                if (gender === FEMALE) {
                  hairData.x = 383;
                  clothData.x = 415;
                } else if (gender === MALE) {
                  clothData.x = 408;
                  hairData.x = 376;
                }

                if (style === POKEMON_STYLE_KEYS.HOLIDAY) {
                  hatData.x = 520;
                }
                break;
              }
            }

            switch (gender) {
              case MALE: {
                if (style === POKEMON_STYLE_KEYS.WEDDING) {
                  clothData.width = 122;
                  clothData.height = 94;

                  if (idx === 0) {
                    clothData.x = 237;
                  } else {
                    clothData.x = 394;
                  }
                }

                break;
              }

              case FEMALE:
              default: {
                hairData.height = 147.3;
                hairData.y = 282;
                hatData.y = 240;
                clothData.y = 408;
                clothData.width = 80;
                clothData.height = 82;

                if (style === POKEMON_STYLE_KEYS.WEDDING) {
                  clothData.width = 140;
                  clothData.height = 90;

                  if (idx === 0) {
                    clothData.x = 208;
                  } else {
                    clothData.x = 365;
                  }
                }

                if (style === POKEMON_STYLE_KEYS.HOLIDAY) {
                  hatData.y = 250;
                }
                break;
              }
            }

            if (typeof window !== 'undefined') {
              skinData.image = new Image();
              skinData.image.src = skinInfo?.image || '';
              skinData.image.crossOrigin = 'anonymous';

              hairData.image = new Image();
              hairData.image.src = hairInfo?.image || '';
              hairData.image.crossOrigin = 'anonymous';

              hatData.image = new Image();
              hatData.image.src = hatImage || '';
              hatData.image.crossOrigin = 'anonymous';

              clothData.image = new Image();
              clothData.image.src = clothImage || '';
              clothData.image.crossOrigin = 'anonymous';
            }

            return (
              <React.Fragment key={idx}>
                <KonvaImage
                  image={skinData.image}
                  y={skinData.y}
                  x={skinData.x}
                  width={130}
                  height={198}
                />
                <KonvaImage
                  image={hairData.image}
                  y={hairData.y}
                  x={hairData.x}
                  width={hairData.width}
                  height={hairData.height}
                />
                <KonvaImage
                  image={hatData.image}
                  y={hatData.y}
                  x={hatData.x}
                  width={hatData.width}
                  height={hatData.height}
                  scale={{x: idx === 1 ? -1 : 1, y: 1}}
                />
                <KonvaImage
                  image={clothData.image}
                  y={clothData.y}
                  x={clothData.x}
                  width={clothData.width}
                  height={clothData.height}
                />
              </React.Fragment>
            );
          })}
          {pokemons.map((pokemon, idx) => {
            const pokemonInfo = POKEMONS.find(({key}) => key === pokemon);

            const positions = {
              y: 415,
              x: idx === 0 ? 205 : 540,
            };
            let pokemonImage: HTMLImageElement | undefined;

            if (typeof window !== 'undefined') {
              pokemonImage = new Image();
              pokemonImage.src = pokemonInfo?.image || '';
              pokemonImage.crossOrigin = 'anonymous';
            }

            return (
              <KonvaImage
                key={`${pokemon} - ${idx}`}
                image={pokemonImage}
                width={120}
                height={120}
                scaleX={idx === 0 ? -1 : 1}
                x={positions.x}
                y={positions.y}
              />
            );
          })}

          <Text
            fontFamily="TGL"
            fontSize={45}
            width={410}
            text={cardTitle.slice(0, 17)}
            x={60}
            y={60}
          />
          <Text
            fontFamily="TGL"
            fontSize={45}
            width={200}
            align="right"
            ellipsis
            text={`${cardYear || ''} HP`}
            fill="#D00303"
            x={420}
            y={60}
          />
          <Text
            fontFamily="Urbanist"
            fontStyle="italic 600"
            fontSize={25}
            width={744}
            align="center"
            ellipsis
            text={characters.map((char) => char.name).join(' and ')}
            x={0}
            y={571}
          />
          <Group y={638} x={193} width={485}>
            <Text
              fontFamily="TGL"
              fontSize={40}
              text={quoteTitle?.slice(0, 20) || ''}
            />
            <Text
              fontFamily="Urbanist"
              fontSize={25}
              width={485}
              lineHeight={1.2}
              y={55}
              ellipsis
              text={convert(quote || '').slice(0, 115)}
            />
          </Group>
        </Layer>
      </Stage>
    </PokemonCardWrapper>
  );
});

export default function PokemonCardPage() {
  // State
  const [state, setState] = useState<TState>(INITIAL_STATE);
  const {style} = state.settings;
  const {
    selectedMockup,
    isLoadingExport,
    isCustomQuote,
    isCustomQuoteTitle,
    showModal,
  } = state;
  const selectedMockupImage = MOCKUP_IMAGES.find(
    (mockup) => mockup.key === selectedMockup,
  )?.image;
  const styleInfo = POKEMON_STYLES.find((s) => s.key === style);

  // Refs
  const canvasRef = useRef<any>(null);

  // Konva
  const [backgroundImage] = useImage(styleInfo?.backgroundCard || '');

  if (backgroundImage) {
    backgroundImage.crossOrigin = 'anonymous';
    backgroundImage.width = 744;
    backgroundImage.width = 1039;
  }

  const handleUpdateSettings = (values: Partial<PokemonSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: {...prev.settings, ...values},
    }));

    setState((prev) => ({...prev, selectedMockup: -1}));
  };

  // Handlers
  const handleExportPokemonCard = async () => {
    if (canvasRef && canvasRef.current) {
      setState((prev) => ({...prev, isLoadingExport: true}));

      const stage = canvasRef.current;
      const dataURL = await stage.toDataURL();
      const [width, height] = [420, 586];

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: [width, height],
        putOnlyUsedFonts: true,
      });

      pdf.addImage(dataURL, 'PNG', 0, 0, width, height);
      pdf.addPage();
      pdf.addImage(BacksideCard, 'PNG', 0, 0, width, height);

      pdf.save('pokemon-card.pdf');

      setState((prev) => ({...prev, isLoadingExport: false, showModal: false}));
    }
  };

  // Variables
  const {settings} = state;
  const renderSettings = {
    [POKEMON_SETTING_TAB_KEYS.DESIGN]: (
      <DesignSetting
        values={settings}
        onChange={handleUpdateSettings}
        onFinishSubmit={(values) => {
          handleUpdateSettings(values);

          setState((prev) => ({
            ...prev,
            activeTab: POKEMON_SETTING_TAB_KEYS.MESSAGE,
          }));
        }}
      />
    ),
    [POKEMON_SETTING_TAB_KEYS.MESSAGE]: (
      <MessageSetting
        values={settings}
        isLoadingExport={isLoadingExport}
        isCustomQuote={isCustomQuote}
        isCustomQuoteTitle={isCustomQuoteTitle}
        setPokemonState={setState}
        onChange={(values) => handleUpdateSettings(values)}
        onFinishSubmit={(e) => {
          setState((prev) => ({...prev, showModal: true}));
        }}
      />
    ),
  };

  return (
    <>
      <div className="pokemon-wrapper container mt-4 flex h-[85vh] flex-col gap-[10px] overflow-hidden md:h-auto md:flex-row md:gap-[88px] md:pt-10">
        <div className="relative z-20 flex shrink-0 flex-row justify-between gap-x-6 bg-white py-2.5 md:flex-col md:justify-normal">
          {selectedMockup === -1 ? (
            <StyledPokemonCard ref={canvasRef} values={settings} />
          ) : (
            <div
              style={{backgroundImage: `url(${selectedMockupImage})`}}
              className="h-[351px] w-[256px] bg-contain bg-center bg-no-repeat xl:h-[586px] xl:w-[420px]"
            />
          )}

          <Flex align="center" gap={60} className="mt-6 !hidden md:!flex">
            <Typography.Text className="!mb-2 !text-xs">
              Preview Image
            </Typography.Text>
            <Typography.Text className="!mb-2 !text-xs">
              Mockup Images
            </Typography.Text>
          </Flex>
          <Flex
            align="center"
            className="mt-2 flex flex-col md:mt-0 md:flex-row"
          >
            <div className="flex flex-col items-center">
              <Typography.Text className="!mb-2 block !text-xs md:hidden">
                Preview Image
              </Typography.Text>
              <PreviewImage
                id="preview-card"
                className={`${selectedMockup === -1 ? 'active' : ''} shrink-0`}
                onClick={() =>
                  setState((prev) => ({...prev, selectedMockup: -1}))
                }
              >
                <PokemonCard
                  className="preview-card__pokemon-card"
                  values={settings}
                  width={72}
                  height={103}
                />
              </PreviewImage>
            </div>
            <Divider
              type="vertical"
              className="!mx-[30px] !my-5 !h-px !w-full bg-neutrals-6 md:!my-0 md:!h-10 md:!w-px"
            />
            <Typography.Text className="!mb-2 block !text-xs md:hidden">
              Mockup Images
            </Typography.Text>
            <Flex
              align="center"
              justify="space-between"
              className="flex w-full flex-col gap-y-4 md:flex-row"
            >
              {MOCKUP_IMAGES.map((mockup) => (
                <PreviewImage
                  key={mockup.key}
                  style={{backgroundImage: `url(${mockup.image})`}}
                  className={`${mockup.key === selectedMockup ? 'active' : ''}`}
                  onClick={() =>
                    setState((prev) => ({...prev, selectedMockup: mockup.key}))
                  }
                />
              ))}
            </Flex>
          </Flex>
        </div>
        <div className="flex-1 overflow-auto pr-5 md:h-[70vh] xl:h-[80vh]">
          <Typography.Title className="!mb-4 !text-[32px] !font-semibold !text-primary md:!mb-10">
            Pokemon Couple Card
          </Typography.Title>

          <Tabs
            items={POKEMON_SETTING_TABS.map((tab, idx) => ({
              ...tab,
              label: `${idx + 1}. ${tab.label}`,
            }))}
            activeKey={state.activeTab}
            onChange={(activeTab) => {
              setState((prev) => ({...prev, activeTab}));
            }}
          />
          {renderSettings[state.activeTab]}
        </div>
      </div>
      <Modal
        destroyOnClose
        centered
        className="!w-[80vw] md:!w-[518px]"
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
        <StyledPokemonCard values={settings} />
        <Button
          block
          type="primary"
          className="mb-3 !flex !max-w-[243px] items-center justify-center gap-2 md:!max-w-[420px]"
          loading={isLoadingExport}
          onClick={() => handleExportPokemonCard()}
        >
          Download Image
          <ArrowRight style={{transform: 'rotate(90deg)'}} />
        </Button>
      </Modal>
    </>
  );
}
function DesignSetting(props: DesignSettingProps) {
  const {values, onChange, onFinishSubmit} = props;

  const [form] = Form.useForm<SettingFormType>();

  // Form Values
  const validateMessages = {
    required: 'Required field',
    max: 'Maximum ${max} characters',
  };

  useDeepCompareEffect(() => {
    form.setFieldsValue(values);
  }, [values]);

  // Watches
  const formValues = Form.useWatch([], form);
  const {characters} = formValues || {};

  return (
    <FormWrapper className="animate__animated animate__fadeIn">
      <Form<SettingFormType>
        name="design"
        form={form}
        layout="vertical"
        initialValues={INITIAL_STATE.settings}
        validateMessages={validateMessages}
        onFinish={(values) => {
          onFinishSubmit(values);
        }}
        onValuesChange={(_, values) => {
          onChange?.(values);
        }}
      >
        <Form.Item<SettingFormType> label="Style" name="style">
          <Checkbox
            items={POKEMON_STYLES.map(({key, label, background}) => ({
              key,
              label,
              image: background,
            }))}
            showBottomLabel
            itemStyle={{
              width: 74,
              height: 56,
            }}
            value={form.getFieldValue('style')}
            onChange={(value) => {
              onChange?.({quote: undefined, quoteTitle: undefined});
              form.setFieldsValue({style: value as string});
            }}
          />
        </Form.Item>

        <CustomDivider />

        <Form.List name="characters">
          {(fields, {add}) => {
            return (
              <div>
                {fields.map((field, index) => {
                  const {key, name} = field;
                  const prefixLabel = index === 0 ? 'Left' : 'Right';
                  const gender = characters?.[index]?.gender;

                  const characterHairs = CHARACTER_HAIRS.filter(
                    (hair) => hair.gender === gender,
                  );
                  const characterSkins = CHARACTER_SKINS.filter(
                    (hair) => hair.gender === gender,
                  );

                  return (
                    <React.Fragment key={key}>
                      <div className="grid grid-cols-1 gap-x-10 gap-y-6 xl:grid-cols-2">
                        <Form.Item
                          name={[name, 'gender']}
                          label={`${prefixLabel} Character’s Gender`}
                        >
                          <Checkbox
                            items={CHARACTER_GENDERS}
                            value={gender}
                            onChange={(value) => {
                              characters[index].gender = value as TGender;
                              characters[index].hair =
                                CHARACTER_HAIRS.filter(
                                  (hair) => hair.gender === value,
                                )[0]?.key || '';
                              characters[index].skin =
                                CHARACTER_SKINS.filter(
                                  (skin) => skin.gender === value,
                                )[0]?.key || '';

                              onChange?.({...formValues, characters});
                              form.setFieldsValue({characters});
                            }}
                          />
                        </Form.Item>
                        <div>
                          <Form.Item
                            name={[name, 'name']}
                            label={`${prefixLabel} Character’s Name`}
                            rules={[
                              {required: true},
                              {
                                max: 20,
                                message: 'Maximum ${max} characters',
                              },
                            ]}
                          >
                            <Input
                              placeholder="Enter Your Name"
                              allowClear
                              count={{
                                show: true,
                                max: 20,
                              }}
                            />
                          </Form.Item>
                        </div>
                        <Form.Item
                          name={[name, 'hair']}
                          label={`${prefixLabel} Character’s Hair`}
                        >
                          <Checkbox
                            items={characterHairs.map(
                              ({key, label, image}) => ({
                                key,
                                label,
                                image,
                              }),
                            )}
                            value={characters?.[index]?.hair}
                            onChange={(value) => {
                              characters[index].hair = value as string;
                              form.setFieldsValue({characters});
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          name={[name, 'skin']}
                          label={`${prefixLabel} Character’s Skin Color`}
                        >
                          <Checkbox
                            items={characterSkins.map(
                              ({key, label, image}) => ({
                                key,
                                label,
                                image,
                              }),
                            )}
                            value={characters?.[index]?.skin}
                            onChange={(value) => {
                              characters[index].skin = value as string;
                              form.setFieldsValue({characters});
                            }}
                          />
                        </Form.Item>
                      </div>

                      {index !== fields.length - 1 && <CustomDivider />}
                    </React.Fragment>
                  );
                })}
              </div>
            );
          }}
        </Form.List>

        <div className="grid grid-cols-1 gap-x-10 xl:grid-cols-2">
          <Form.List name="pokemons">
            {(fields) => {
              return fields.map((field, index) => {
                const {key, name} = field;
                const prefixLabel = index === 0 ? 'Left' : 'Right';

                return (
                  <Form.Item
                    {...field}
                    key={key}
                    rules={[{required: true}]}
                    label={`${prefixLabel} Pokemon`}
                  >
                    <Select
                      placeholder="Choose Your Pokemon"
                      options={POKEMONS.map(({image, key, label}, index) => ({
                        value: key,
                        label: (
                          <Flex align="center" gap={12}>
                            <div
                              className="size-10 bg-contain bg-center bg-no-repeat"
                              style={{backgroundImage: `url(${image})`}}
                            ></div>

                            <Typography.Text ellipsis={{tooltip: true}}>{`${
                              index + 1
                            }. ${label}`}</Typography.Text>
                          </Flex>
                        ),
                      }))}
                    />
                  </Form.Item>
                );
              });
            }}
          </Form.List>
        </div>

        <div className="grid grid-cols-1 gap-x-10 pt-5 xl:grid-cols-2">
          <Button
            type="primary"
            block
            className="!flex items-center justify-center gap-2"
            onClick={() => {
              form.submit();
            }}
          >
            Continue
            <ArrowRight />
          </Button>
        </div>
      </Form>
    </FormWrapper>
  );
}
function MessageSetting(props: MessageSettingProps) {
  const {
    values,
    isLoadingExport,
    isCustomQuote,
    isCustomQuoteTitle,
    setPokemonState,
    onChange,
    onFinishSubmit,
  } = props;
  const {style} = values;
  const [form] = Form.useForm<SettingFormType>();
  const quote = Form.useWatch('quote', form);
  const quoteTitle = Form.useWatch('quoteTitle', form);

  // Form Values
  const validateMessages = {
    required: 'Required field',
    max: 'Maximum ${max} characters',
  };

  // Memo
  const [quoteTitles, quoteOptions] = useMemo(() => {
    const {quoteTitles, quoteOptions} =
      POKEMON_STYLES.find((pokemonStyle) => pokemonStyle.key === style) || {};

    return [quoteTitles || [], quoteOptions || []];
  }, [style]);

  useEffect(() => {
    const {cardTitle, cardYear, quoteTitle, quote} = values;

    form.setFieldsValue({
      cardTitle,
      cardYear,
      quoteTitle,
      quote,
    });
  }, [form, values]);

  return (
    <FormWrapper className="animate__animated animate__fadeIn">
      <Form<SettingFormType>
        name="design"
        form={form}
        layout="vertical"
        initialValues={values}
        validateMessages={validateMessages}
        onFinish={(values) => {
          onFinishSubmit(values);
        }}
        onValuesChange={(_, values) => {
          onChange?.(values);
        }}
      >
        <div className="grid grid-cols-1 gap-x-10 xl:grid-cols-2">
          <Form.Item<SettingFormType>
            name={'cardTitle'}
            label={`Card Title`}
            rules={[
              {required: true},
              {
                max: 17,
                message: 'Maximum ${max} characters',
              },
            ]}
          >
            <Input
              placeholder="Enter Your Title"
              allowClear
              count={{
                show: true,
                max: 17,
              }}
            />
          </Form.Item>
          <Form.Item<SettingFormType>
            name={'cardYear'}
            label={`Year`}
            rules={[{required: true}]}
          >
            <InputNumber
              placeholder="Enter Your Year"
              min={0}
              max={9999}
              className="!w-full"
              controls={false}
            />
          </Form.Item>
        </div>

        <CustomDivider />
        <div className="grid grid-cols-1 gap-x-10 xl:grid-cols-2">
          <Form.Item
            name={'quoteTitle'}
            label={`Quote Title`}
            rules={[
              {required: true},
              {
                max: 20,
                message: 'Maximum ${max} characters',
              },
            ]}
          >
            <Flex vertical gap={8}>
              <Select
                labelRender={(props) =>
                  isCustomQuoteTitle ? 'Type my own quote title' : props.value
                }
                placeholder="Choose Your Quote Title"
                value={quoteTitle}
                options={[
                  ...quoteTitles.map((title) => ({
                    value: title,
                    label: title,
                  })),
                  {
                    value: '',
                    label: 'Type my own quote title',
                  },
                ]}
                onChange={(value) => {
                  setPokemonState?.((prev) => ({
                    ...prev,
                    isCustomQuoteTitle: !value,
                  }));
                  onChange?.({...values, quoteTitle: value});
                  form.setFieldValue('quoteTitle', value);
                  form.validateFields(['quoteTitle']);
                }}
              />
              {isCustomQuoteTitle && (
                <Input
                  placeholder="Enter Your Title"
                  allowClear
                  count={{
                    show: true,
                    max: 16,
                  }}
                  onChange={({target: {value}}) => {
                    onChange?.({...values, quoteTitle: value});
                    form.setFieldValue('quoteTitle', value);
                    form.validateFields(['quoteTitle']);
                  }}
                />
              )}
            </Flex>
          </Form.Item>

          <Form.Item
            name={'quote'}
            label={`Quote`}
            rules={[
              {required: true},
              {
                max: 115,
                message: 'Maximum ${max} characters',
              },
            ]}
          >
            <Flex gap={8} vertical>
              <Select
                labelRender={(props) =>
                  isCustomQuote ? 'Type my own quote' : props.value
                }
                placeholder="Choose Your Quote"
                value={quote}
                options={[
                  ...quoteOptions.map((title) => {
                    return {
                      value: title,
                      label: (
                        <Typography.Text ellipsis={{tooltip: true}}>
                          {convert(title)}
                        </Typography.Text>
                      ),
                    };
                  }),
                  {
                    value: '',
                    label: 'Type my own quote',
                  },
                ]}
                onChange={(value) => {
                  setPokemonState?.((prev) => ({
                    ...prev,
                    isCustomQuote: value === '',
                  }));
                  onChange?.({quote: value});
                  form.setFieldValue('quote', value);
                  form.validateFields(['quote']);
                }}
              />
              {isCustomQuote && (
                <Input.TextArea
                  value={quote}
                  rows={4}
                  placeholder="Enter Your Quote"
                  onChange={(e) => {
                    onChange?.({quote: e.target.value});
                    form.setFieldValue('quote', e.target.value);
                    form.validateFields(['quote']);
                  }}
                  count={{
                    show: true,
                    max: 115,
                  }}
                />
              )}
            </Flex>
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 gap-x-10 pt-5 xl:grid-cols-2">
          <Button
            type="primary"
            block
            className="!flex items-center justify-center gap-2"
            onClick={() => {
              form.submit();
            }}
            loading={isLoadingExport}
          >
            Download Preview Image
            <ArrowRight style={{transform: 'rotate(90deg)'}} />
          </Button>
        </div>
      </Form>
    </FormWrapper>
  );
}

/* Styled */
const CustomDivider = styled(Divider)``;
const PreviewImage = styled.div`
  width: 78px;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  box-sizing: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid var(--neutrals-4-color);

  &.active {
    border: 3px solid var(--primary-color, #ef466f);
  }

  .preview-card__pokemon-card {
    border: none;
  }

  @media screen and (max-width: 1280px) {
    width: 40px;
    height: 40px;

    .preview-card__pokemon-card {
      width: 40px !important;
      height: 56px !important;

      canvas {
        width: 34px !important;
        height: 48px !important;
      }
    }
  }
`;
const PokemonCardWrapper = styled.div<{width?: number; height?: number}>`
  position: relative;
  width: ${(p) => p.width || 420}px;
  height: ${(p) => p.height || 586}px;
  border-radius: 17px;
  overflow: hidden;

  canvas {
    width: ${(p) => p.width || 420}px !important;
    height: ${(p) => p.height || 586}px !important;
  }

  .character {
    position: absolute;
    height: 124px;
    width: 73px;
    top: 161px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    transition: all 200ms;

    &.left {
      left: 130px;
    }

    &.right {
      left: 220px;

      .hat {
        transform: translate(-50%) scaleX(-1);
      }

      &.holiday {
        .hat {
          left: 48px;
        }
      }

      &.wedding {
        &.female {
          .cloth {
            transform: scaleX(-1);
            left: 13px;
          }
        }
      }
    }

    &.male {
      .hair {
        left: -5px;
      }

      &.wedding {
        .cloth {
          width: 66px;
          top: 66px;
        }
      }
    }

    &.female {
      top: 155px;

      .hair {
        top: 4px;
      }

      .cloth {
        top: 69px;
      }

      &.wedding {
        top: 160px;

        .cloth {
          width: 66px;
          top: 71px;
          left: 27px;
        }
      }
    }

    /* Style */
    &.holiday {
      .hat {
        top: -18px;
        left: 25px;
        width: 50px;
      }
    }

    .hair {
      position: absolute;
      transform: scale(1.1);
      left: 0;
      top: 0;
      width: 81px;
      height: auto;
      object-fit: contain;
    }

    .hat {
      position: absolute;
      top: -25px;
      left: 50%;
      height: auto;
      object-fit: contain;
      transform: translate(-50%);
      z-index: 20;
    }

    .cloth {
      position: absolute;
      top: 65px;
      left: 50%;
      width: 54px;
      height: auto;
      object-fit: contain;
      transform: translate(-50%);
    }
  }
`;
const StyledPokemonCard = styled(PokemonCard)`
  @media only screen and (max-width: 1280px) {
    width: 240px;
    height: 335px;

    canvas {
      width: 240px !important;
      height: 335px !important;
    }
  }
`;
