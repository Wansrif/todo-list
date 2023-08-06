import Logo from '@static/images/not-found.png';
import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

const NotFound = () => (
  <div className={classes.contentWrapper}>
    <img className={classes.image} src={Logo} alt="Not Found" />
    <div className={classes.title}>
      <FormattedMessage id="app_not_found" />
    </div>
  </div>
);

export default NotFound;
