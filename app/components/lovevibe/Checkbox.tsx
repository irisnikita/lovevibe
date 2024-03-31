// Libraries
import styled from '@emotion/styled';
import {xor} from 'lodash';
import {memo} from 'react';

// Components
import {Flex, Typography} from '~/components/ui';

// Icons
import {RadioCheck} from '~/icons';

interface CheckboxProps {
  items: {key: string; label: string; image?: string}[];
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  showBottomLabel?: boolean;
  value: string | string[];
  multiple?: boolean;
  onChange: (value: string | string[]) => void;
}

export const Checkbox: React.FC<CheckboxProps> = memo((props) => {
  const {items, value, style, itemStyle, showBottomLabel, multiple, onChange} =
    props;

  const onChangeCheckbox = (key: string) => {
    if (multiple && Array.isArray(value)) {
      onChange(xor(value, [key]));
    } else {
      onChange(key);
    }
  };

  return (
    <Flex gap={12} align="center" style={style} wrap="wrap">
      {items.map(({key, image, label}) => {
        const isActive = multiple ? value?.includes(key) : key === value;

        return (
          <Flex vertical align="center" key={key}>
            <CheckboxItem
              style={itemStyle}
              $image={image}
              className={`${isActive ? 'active' : ''}`}
              onClick={() => onChangeCheckbox(key)}
            >
              {image ? '' : label}
              <div className="icon-check">
                <RadioCheck />
              </div>
            </CheckboxItem>
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
