// Libraries
import styled from '@emotion/styled';
import type {FlexProps} from 'antd';
import {xor} from 'lodash';
import {memo} from 'react';

// Components
import {Flex, Typography} from '~/components/ui';

// Icons
import {RadioCheck} from '~/icons';

interface CheckboxProps
  extends Omit<FlexProps, 'value' | 'onChange' | 'children'> {
  items: {key: string; label: string; image?: string}[];
  showBottomLabel?: boolean;
  value: string | string[];
  multiple?: boolean;

  // Props for item
  itemStyle?: React.CSSProperties;
  itemProps?: React.HTMLAttributes<HTMLDivElement>;

  onChange: (value: string | string[]) => void;
}

export const Checkbox: React.FC<CheckboxProps> = memo((props) => {
  const {
    items,
    value,
    itemStyle,
    showBottomLabel,
    multiple,
    onChange,
    itemProps,
    ...restOfProps
  } = props;

  const onChangeCheckbox = (key: string) => {
    if (multiple && Array.isArray(value)) {
      onChange(xor(value, [key]));
    } else {
      onChange(key);
    }
  };

  return (
    <Flex gap={12} align="center" wrap="wrap" {...restOfProps}>
      {items.map(({key, image, label}) => {
        const isActive = multiple ? value?.includes(key) : key === value;

        return (
          <Flex vertical align="center" key={key}>
            <CheckboxItem
              {...itemProps}
              style={{...itemProps?.style, ...itemStyle}}
              className={`${itemProps?.className || ''} ${
                isActive ? 'active' : ''
              }`}
              $image={image}
              onClick={() => onChangeCheckbox(key)}
            >
              {image ? '' : label}
              <div className="icon-check">
                <RadioCheck />
              </div>
            </CheckboxItem>
            {showBottomLabel && (
              <Typography.Text className="mt-1 text-center !text-sm">
                {label}
              </Typography.Text>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
});

// Styled
const CheckboxItem = styled.div<{$image?: string}>`
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
  font-weight: bold;
  cursor: pointer;
  transition: all 200ms linear;

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
