import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale } from '@containers/Language/selectors';
import { useUpdateSize } from '@utils/hookHelper';

import Navbar from '@components/Navbar';
import classes from './style.module.scss';

const MainLayout = ({ children, locale, intl: { formatMessage } }) => {
  const navRef = useRef();
  const [navbarHeight, setNavbarHeight] = useState('0px');

  useUpdateSize(() => {
    setNavbarHeight(`${navRef?.current?.clientHeight}px`);
  });

  return (
    <div className={classes.layoutWrapper} style={{ '--height': navbarHeight }}>
      <Navbar title={formatMessage({ id: 'app_title_header' })} locale={locale} contentRef={navRef} />
      {children}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  intl: PropTypes.object,
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
