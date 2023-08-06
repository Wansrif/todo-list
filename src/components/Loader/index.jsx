import PropTypes from 'prop-types';
import classNames from 'classnames';
import logo from '@static/images/react.svg';

import classes from './style.module.scss';

const Loader = ({ isLoading }) => (
  <div
    className={classNames({
      [classes.loaderComponent]: true,
      [classes.showLoader]: isLoading || false,
    })}
  >
    <img src={logo} alt="Loading" />
  </div>
);

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
export default Loader;
