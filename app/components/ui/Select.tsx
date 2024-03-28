import {Select as AntdSelect, type SelectProps as AntdSelectProps} from 'antd';
import {ArrowDown} from '~/icons';

export interface SelectProps extends AntdSelectProps {}

export const Select: React.FC<SelectProps> = (props) => {
  return <AntdSelect {...props} />;
};

Select.defaultProps = {
  suffixIcon: <ArrowDown className="text-neutrals-2" />,
};
