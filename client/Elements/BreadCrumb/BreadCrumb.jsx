// @flow
/** @jsx jsx */

import { useMemo } from 'react';
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import logo from '../../static/images/logo_stockers.svg';
import arrow from '../../static/images/arrow.png';

const styles = {
  wrapper: css`
    display: flex;
    margin: 0 0 0 40px;
  `,
  logo: css`
    width: 24px;
    height: 24px;
    margin: 0 10px 0 0;
  `,
  title: css`
    font-size: 19px;
    color: #FFF;
    text-decoration: none;
  `,
  arrow: css`
    width: 24px;
    height: 24px;
    margin: 0 20px;
  `,
  industry: css`
    font-size: 19px;
    color: #FFF;
    text-decoration: none;
  `,
  company: css`
    font-size: 19px;
    color: #FF9500;
    text-decoration: none;
  `,
  followBtn: css`
    color: #FF9500;
    font-size: 13px;
    border-radius: 4px;
    width: 60px;
    height: 24px;
    display: 'block';
    text-decoration: 'none';
    text-align: 'center';
    outline: 'none';
    border: 1px solid #FF9500;
  `,
};

function BreadCrumb() {
  return (
    <div css={styles.wrapper}>
      <img alt="stockers" src={logo} css={styles.logo} />
      <Link
        css={styles.title}
        to="/">
        Stockers
      </Link>
      <img alt="arrow" src={arrow} css={styles.arrow} />
      <Link
        css={styles.industry}
        to="/">
      半導體
      </Link>
      <img alt="arrow" src={arrow} css={styles.arrow} />
      <Link
        css={styles.company}
        to="/">
        2230 台積電
      </Link>
      <img alt="arrow" src={arrow} css={styles.arrow} />
      <button
        type="button"
        css={styles.followBtn}>
        已追蹤
      </button>
    </div>
  );
}

export default BreadCrumb;
