/* eslint-disable no-template-curly-in-string */
// Libraries
import {Flex, Form} from 'antd';
import React, {memo, useEffect, useMemo, useState} from 'react';
import styled from '@emotion/styled';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import {convert} from 'html-to-text';

import {type MetaFunction} from '@shopify/remix-oxygen';

// Images
import BacksideCard from 'public/images/pokemon/backside-card.png';

// Components
import {
  Tabs,
  Typography,
  Divider,
  Select,
  Input,
  InputNumber,
  Button,
} from '~/components/ui';

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
  MY_OWN_QUOTE_TITLE,
  MY_OWN_QUOTE,
} from '~/constants';

// Styled
import {FormWrapper} from '~/styled';
import {ArrowRight, RadioCheck} from '~/icons';
import {Image} from '@shopify/hydrogen';

// Preview
import PreviewCard from 'public/images/pokemon/preview.png';

// Hooks
import {useDeepCompareEffect} from '~/hooks';

const {FEMALE, MALE} = CHARACTER_GENDER_KEYS;

export const meta: MetaFunction = () => {
  return [{title: 'Pokemon Card | LoveVibe'}];
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
interface CustomRadioProps {
  items: {key: string; label: string; image?: string}[];
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  showBottomLabel?: boolean;
  value: string;
  onChange: (value: string) => void;
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
};

/* Components */
const CustomRadio: React.FC<CustomRadioProps> = memo((props) => {
  const {items, value, style, itemStyle, showBottomLabel, onChange} = props;

  return (
    <Flex gap={12} align="center" style={style}>
      {items.map(({key, image, label}) => {
        const isActive = key === value;

        return (
          <Flex vertical align="center" key={key}>
            <CustomRadioItem
              style={itemStyle}
              $image={image}
              className={`${isActive ? 'active' : ''}`}
              onClick={() => onChange(key)}
            >
              {image ? '' : label}
              <div className="icon-check">
                <RadioCheck />
              </div>
            </CustomRadioItem>
            {showBottomLabel && (
              <Typography.Text className="!text-sm text-center mt-1">
                {label}
              </Typography.Text>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
});

export default function PokemonCard() {
  // State
  const [state, setState] = useState<TState>(INITIAL_STATE);
  const {style, characters, cardTitle, cardYear, quote, quoteTitle, pokemons} =
    state.settings;
  const {selectedMockup, isLoadingExport, isCustomQuote, isCustomQuoteTitle} =
    state;
  const selectedMockupImage = MOCKUP_IMAGES.find(
    (mockup) => mockup.key === selectedMockup,
  )?.image;
  const styleInfo = POKEMON_STYLES.find((s) => s.key === style);

  // Effects
  // useDeepCompareEffect(() => {
  //   setTimeout(() => {
  //     (async () => {
  //       const canvas = await html2canvas(
  //         document.querySelector('#pokemon-card') as HTMLElement,
  //         {
  //           allowTaint: true,
  //           useCORS: true,
  //           scrollX: 0,
  //           scrollY: 0,
  //         },
  //       );
  //       const canvasWrapperEl = document.querySelector(
  //         '#preview-card',
  //       ) as HTMLElement;

  //       canvasWrapperEl.style.backgroundImage = `url(${canvas.toDataURL()})`;
  //     })();
  //   }, 500);
  // }, [state.settings]);

  const handleUpdateSettings = (values: Partial<PokemonSettings>) => {
    setState((prev) => ({
      ...prev,
      settings: {...prev.settings, ...values},
    }));

    setState((prev) => ({...prev, selectedMockup: -1}));
  };

  // Handlers
  const handleExportPokemonCard = async () => {
    const pokemonCardEl = document.querySelector(
      '#pokemon-card',
    ) as HTMLElement;

    setState((prev) => ({...prev, isLoadingExport: true}));

    const canvas = await html2canvas(pokemonCardEl, {
      allowTaint: true,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
    });

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: [canvas.width * 0.3, canvas.height * 0.3],
      putOnlyUsedFonts: true,
    });
    const imageData = canvas.toDataURL('image/png', 100);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imageWidth = canvas.width;
    const imageHeight = canvas.height;
    const ratio = pageWidth / imageWidth;

    pdf.addImage(
      imageData,
      'PNG',
      0,
      0,
      imageWidth * ratio,
      imageHeight * ratio,
    );
    pdf.addPage();
    pdf.addImage(
      BacksideCard,
      'PNG',
      0,
      0,
      imageWidth * ratio,
      imageHeight * ratio,
    );

    pdf.save('pokemon-card.pdf');

    setState((prev) => ({...prev, isLoadingExport: false}));
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
          handleExportPokemonCard();
        }}
      />
    ),
  };

  return (
    <div className="container xl:pt-10 mt-4 flex xl:gap-[88px] gap-[10px] h-[calc(100vh-120px)] overflow-hidden xl:flex-row flex-col">
      <div className="shrink-0 flex xl:flex-col flex-row gap-x-6 xl:relative top-0 sticky">
        {selectedMockup === -1 ? (
          <PokemonCardWrapper>
            <StyledPokemonCard
              id="pokemon-card"
              $background={styleInfo?.backgroundCard}
            >
              {characters.map(({gender, name, hair, skin}, idx) => {
                const position = idx === 0 ? 'left' : 'right';
                const skinInfo = CHARACTER_SKINS.find(({key}) => key === skin);
                const hairInfo = CHARACTER_HAIRS.find(({key}) => key === hair);
                const hatImage = styleInfo?.hats[gender] || '';
                const clothImage = styleInfo?.clothes[gender] || '';

                return (
                  <div
                    key={idx}
                    className={`character ${position} ${gender} ${style}`}
                    style={{backgroundImage: `url(${skinInfo?.image})`}}
                  >
                    <Image
                      className="hair"
                      src={hairInfo?.image || ''}
                      alt={hairInfo?.label}
                    />

                    {!!hatImage && (
                      <Image
                        className="hat"
                        src={hatImage || ''}
                        width={34}
                        alt={'Hat'}
                      />
                    )}

                    <Image
                      className="cloth"
                      src={clothImage || ''}
                      width={34}
                      alt={'Cloth'}
                    />
                  </div>
                );
              })}

              {pokemons.map((pokemon, idx) => {
                if (!pokemon) {
                  return null;
                }

                const position = idx === 0 ? 'left' : 'right';
                const pokemonInfo = POKEMONS.find(({key}) => key === pokemon);

                return (
                  <Image
                    key={`${pokemon}-${idx}`}
                    className={`pokemon ${position} object-contain object-center`}
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                    crop={undefined}
                    width={70}
                    height={70}
                    src={pokemonInfo?.image || ''}
                  />
                );
              })}

              <div className="card-title">{cardTitle}</div>
              <div className="card-year">{`${cardYear} HP`}</div>
              <div className="character-names">
                {characters.map(({name}) => name).join(' and ')}
              </div>

              <div className="quote-wrapper">
                <div className="quote-title">{quoteTitle}</div>
                <div
                  className="quote"
                  dangerouslySetInnerHTML={{__html: `${quote || ''}`}}
                />
              </div>
            </StyledPokemonCard>
          </PokemonCardWrapper>
        ) : (
          <Image
            src={selectedMockupImage || ''}
            className="object-contain object-center xl:w-[420px] xl:h-[586px] w-[256px] h-[351px]"
            alt="mockup"
            width={420}
            height={586}
          />
        )}

        <Flex align="center" gap={60} className="mt-6 xl:!flex !hidden">
          <Typography.Text className="!text-xs !mb-2">
            Preview Image
          </Typography.Text>
          <Typography.Text className="!text-xs !mb-2">
            Mockup Images
          </Typography.Text>
        </Flex>
        <Flex align="center" className="flex xl:flex-row flex-col xl:mt-0 mt-2">
          <div className="flex items-center flex-col">
            <Typography.Text className="!text-xs !mb-2 xl:hidden block">
              Preview Image
            </Typography.Text>
            <PreviewImage
              id="preview-card"
              style={{backgroundImage: `url(${PreviewCard})`}}
              className={`${selectedMockup === -1 ? 'active' : ''} shrink-0`}
              onClick={() =>
                setState((prev) => ({...prev, selectedMockup: -1}))
              }
            />
          </div>
          <Divider
            type="vertical"
            className="xl:!h-10 xl:!w-[1px] xl:!my-0 !my-5 !h-[1px] !w-full !mx-[30px]"
          />

          <Typography.Text className="!text-xs !mb-2 xl:hidden block">
            Mockup Images
          </Typography.Text>
          <Flex
            align="center"
            justify="space-between"
            className="w-full flex xl:flex-row flex-col gap-y-4"
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
      <div className="flex-1 overflow-auto pr-5">
        <div className="sticky top-0 bg-white z-10">
          <Typography.Title className="!text-primary !text-[32px] !font-semibold xl:!mb-10 !mb-4">
            Pokemon Couple Card
          </Typography.Title>

          <StyledTabs
            items={POKEMON_SETTING_TABS.map((tab, idx) => ({
              ...tab,
              label: `${idx + 1}. ${tab.label}`,
            }))}
            activeKey={state.activeTab}
            onChange={(activeTab) => {
              setState((prev) => ({...prev, activeTab}));
            }}
          />
        </div>
        {renderSettings[state.activeTab]}
      </div>
    </div>
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
    <FormWrapper>
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
          <CustomRadio
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
              form.setFieldsValue({style: value});
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
                      <div className="grid xl:xl:grid-cols-2 grid-cols-1 gap-x-10 gap-y-6">
                        <Form.Item
                          name={[name, 'gender']}
                          label={`${prefixLabel} Character’s Gender`}
                        >
                          <CustomRadio
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
                          <CustomRadio
                            items={characterHairs.map(
                              ({key, label, image}) => ({
                                key,
                                label,
                                image,
                              }),
                            )}
                            value={characters?.[index]?.hair}
                            onChange={(value) => {
                              characters[index].hair = value;
                              form.setFieldsValue({characters});
                            }}
                          />
                        </Form.Item>
                        <Form.Item
                          name={[name, 'skin']}
                          label={`${prefixLabel} Character’s Skin Color`}
                        >
                          <CustomRadio
                            items={characterSkins.map(
                              ({key, label, image}) => ({
                                key,
                                label,
                                image,
                              }),
                            )}
                            value={characters?.[index]?.skin}
                            onChange={(value) => {
                              characters[index].skin = value;
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

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-10">
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
                              className="w-10 h-10 bg-contain bg-center bg-no-repeat"
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

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-10 pt-5">
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
    <FormWrapper>
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
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-10">
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
                max: 16,
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
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-10">
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

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-10 pt-5">
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
const StyledPokemonCard = styled.div<{$background?: string}>`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${(p) => p.$background || ''});
  transition: all 200ms;

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

  .pokemon {
    position: absolute;
    width: 70px;
    height: 70px;
    left: 47px;
    top: 234px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    &.left {
      transform: scaleX(-1);
    }

    &.right {
      left: 300px;
    }
  }

  .card-title,
  .card-year {
    font-family: TGL;
    position: absolute;
    top: 26px;
    left: 35px;
    font-size: 25px;
    font-weight: 600;
    max-width: 200px;
    overflow: hidden;
    word-break: keep-all;
  }

  .card-year {
    color: var(--danger-color);
    left: auto;
    right: 70px;
  }

  .character-names {
    font-family: Urbanist, sans-serif;
    position: absolute;
    margin: auto;
    text-align: center;
    width: 100%;
    font-style: italic;
    top: 318px;
    font-size: 14px;
    font-weight: 500;
  }

  .quote-wrapper {
    position: absolute;
    top: 360px;
    left: 107px;
    max-width: 270px;

    .quote-title {
      font-family: TGL;
      font-size: 20px;
      font-weight: 600;
    }

    .quote {
      font-family: Urbanist, sans-serif;
      font-size: 14px;
    }
  }
`;
const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 24px;

    &::before {
      border: none;
    }
  }

  .ant-tabs-tab {
    font-weight: 700;
    padding: 8px 12px;
    color: var(--neutrals-4-color) !important;
  }

  .ant-tabs-ink-bar {
    height: 3px !important;
    border-radius: 4px;
  }
`;
const CustomRadioItem = styled.div<{$image?: string}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  border: 2px solid var(--neutrals-5-color);
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 200ms;

  ${({$image}) => $image && `background-image: url(${$image})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  .icon-check {
    position: absolute;
    bottom: -3px;
    right: -3px;
    background-color: var(--primary-color);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 20px;
    border-radius: 4px;
    opacity: 0;
    transition: all 200ms;
  }

  &.active {
    border: 3px solid var(--primary-color);

    .icon-check {
      opacity: 1;
    }
  }
`;
const SubInputText = styled(Typography.Text)`
  margin: 0px 16px;
  color: var(--neutrals-4-color, #777e90) !important;
  font-size: 12px !important;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
`;
const PreviewImage = styled.div`
  width: 78px;
  height: 78px;
  border-radius: 4px;
  box-sizing: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  border: 2px solid var(--neutrals-4-color);

  &.active {
    border: 3px solid var(--primary-color, #ef466f);
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;
const PokemonCardWrapper = styled.div`
  width: 420px;
  height: 586px;

  @media screen and (max-width: 768px) {
    transform: scale(0.6);
    margin: -108px -82px;
  }
`;
