// @flow
/** @jsx jsx */

import {
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { jsx, css } from '@emotion/core';
import {
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import logo from '../../static/images/logo_stockers.svg';
import HeaderIndustry from './HeaderIndustry';
import HeaderStock from './HeaderStock';
import SearchBar from '../../Form/SearchBar';
import { FORM_SITE_HEADER } from '../../Constant/form';
import { FOOTER_INDEX } from '../../Constant/zIndex';
import { storeUserModules as storeUserModulesAction } from '../../actions/InvestStrategy';

const styles = {
  wrapper: {
    width: '100%',
    height: 100,
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: '80px 1fr 250px 200px',
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 40,
  },
  middle: {
    flexGrow: 4,
  },
  right: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    textAlign: 'right',
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    cursor: 'default',
    minWidth: '1em',
    minHeight: '1em',
    fontSize: 13,
    fontWeight: 500,
    padding: '0 5px 0 0',
  },
  userInfoWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoBtn: {
    padding: '5px 20px 0 0',
    zIndex: FOOTER_INDEX,
  },
  userOptionsWrapper: {
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 80,
    right: 20,
  },
  logOutBtn: {
    width: 90,
    height: 80,
    borderRadius: 40,
    color: Colors.BULL_MARKET,
    backgroundColor: '#4D2622',
    textAlign: 'center',
    lineHeight: '80px',
    margin: '10px 0',
    border: 'solid 1px',
  },
  filterBtn: {
    width: 140,
    height: 80,
    borderRadius: 40,
    color: '#FFF',
    backgroundColor: Colors.LAYER_SECOND,
    textAlign: 'center',
    lineHeight: '80px',
    margin: '10px 0',
    border: 'solid 1px',
  },
  mask: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    opacity: 0.9,
    backgroundColor: Colors.LAYER_SECOND,
    filter: 'blur(20px)',
  },
  loginBtn: css`
    min-width: 40px;
    font-size: 13px;
    color: orange;
    border: solid 1px;
    display: block;
    border-radius: 10px;
    text-align: center;
    margin: 0 10px;
  `,
};

const filterModals = [{
  id: 1,
  name: 'Ａ基本面篩選',
}, {
  id: 2,
  name: 'Ｂ基本面篩選',
}, {
  id: 3,
  name: 'Ｃ基本面篩選',
}, {
  id: 4,
  name: 'Ｄ基本面篩選',
}];

function SiteHeader({
  modulesInfo,
  storeUserModules,
}: Props) {
  const history = useHistory();
  const [isMenuOpened, setMenuOpened] = useState(false);

  console.log('modulesInfo', modulesInfo);

  const localState = {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
  };

  // useEffect(() => {
  //   let canceled = false;

  //   async function fetchUserModulesData() {
  //     const resData = await fetch(`${API_HOST}/modules/userModules/${localState.userId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         authorization: localStorage.token,
  //       },
  //     }).then(res => (!canceled ? res.json() : null));

  //     if (resData) {
  //       console.log('resData', resData);
  //       storeUserModules(resData);
  //     }
  //   }

  //   if (localState.userId && localState.token) {
  //     fetchUserModulesData();
  //   }

  //   return () => {
  //     canceled = true;
  //   };
  // }, [storeUserModules, localState]);

  const onClick = useCallback(() => {
    setMenuOpened(!isMenuOpened);
  }, [isMenuOpened]);

  const mask = useMemo(() => {
    if (!isMenuOpened) return null;

    return (
      <div css={styles.mask} />
    );
  }, [isMenuOpened]);

  const loginDOM = useMemo(() => {
    if (!localStorage.getItem('token')) {
      return (
        <button
          onClick={() => history.push('/login')}
          type="button"
          css={styles.loginBtn}>
          登入
        </button>
      );
    }

    return (
      <button
        onClick={onClick}
        css={styles.userInfoBtn}
        type="button">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path fill="white" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
        </svg>
      </button>
    );
  }, [onClick, history]);

  const userOptions = useMemo(() => {
    if (!isMenuOpened) return null;

    return (
      <div css={styles.userOptionsWrapper}>
        <button
          type="button"
          css={styles.logOutBtn}
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
            setMenuOpened(false);
            history.push('/');
          }}>
          登出
        </button>
        <div>
          你的模型
        </div>
        {modulesInfo.map(filterModal => (
          <button
            key={filterModal.id}
            onClick={() => console.log('切換模型')}
            type="button"
            css={styles.filterBtn}>
            {filterModal.name}
          </button>
        ))}
      </div>
    );
  }, [modulesInfo, isMenuOpened, history]);

  return (
    <form>
      <header css={styles.wrapper}>
        <Link
          to="/">
          <img alt="stockers" src={logo} css={styles.logo} />
        </Link>
        <div css={styles.middle}>
          <Switch>
            <Route path="/industry/:industryId/stocks/:stockId">
              <HeaderStock />
            </Route>
            <Route path="/industry/:industryId">
              <HeaderIndustry />
            </Route>
          </Switch>
        </div>
        <div css={styles.searchBar}>
          <Field
            name="searchTerm"
            placeholder="以股號/股名查詢"
            component={SearchBar} />
        </div>
        <div css={styles.userInfoWrapper}>
          <span css={styles.email}>
            {localStorage.getItem('email') || '訪客模式'}
          </span>
          {loginDOM}
          {mask}
          {userOptions}
        </div>
      </header>
    </form>
  );
}

const formHook = reduxForm({
  form: FORM_SITE_HEADER,
});

const reduxHook = connect(
  state => ({
    modulesInfo: state.InvestStrategy.userModulesInfo || [],
  }),
  dispatch => bindActionCreators({
    storeUserModules: storeUserModulesAction,
  }, dispatch),
);

export default reduxHook(formHook(SiteHeader));
