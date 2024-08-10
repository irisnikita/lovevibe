import {default as Spin} from 'antd/es/spin';
import {Loading} from '~/icons/Loading';

Spin.defaultProps = {
  indicator: <Loading className="animate-spin" />,
};

export {Spin};
