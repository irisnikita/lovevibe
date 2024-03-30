import {Spin} from 'antd';
import {Loading} from '~/icons/Loading';

Spin.defaultProps = {
  indicator: <Loading className="animate-spin" />,
};

export {Spin};
