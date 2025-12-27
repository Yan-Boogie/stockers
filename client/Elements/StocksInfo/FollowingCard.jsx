// @flow
/** @jsx jsx */

import { useState } from 'react';
import { jsx, css } from '@emotion/core';
import { flex } from '../../Constant/emotion';
import ModuleDetailModal from './ModuleDetailModal';

const styles = {
  wrapper: css`
    ${flex}
    align-items: flex-start;
    width: 150px;
    height: 130px;
    border-radius: 40px;
    background-color: #262626;
    margin: 0 10px;
    padding: 0 24px;
    position: relative;
  `,
  fakeBtn: css`
    position: absolute;
    width: 150px;
    height: 130px;
  `,
  leftPart: css`
    ${flex}
    flexGrow: 1;
    align-items: flex-start;
    margin: 0 0 0 40px;
  `,
  rightPart: css`
    ${flex}
    flexGrow: 1;
  `,
  word: css`
    font-size: 13px;
  `,
  title: css`
    display: grid;
    grid-column-gap: 10px;
    font-size: 13px;
    fo
  `,
  status: css`
    font-size: 13px;
    color: #FF9500;
  `,
  followingWrapper: css`
    margin: 10px 0 0 0;
  `,
};

type Props = {
  number: number,
  modules: Array,
};

function FollowingCard({
  number,
  modules,
}: Props) {
  const [shownModal, showModal] = useState(false);

  return (
    <div css={styles.wrapper}>
      <button
        type="button"
        css={styles.fakeBtn}
        onClick={() => showModal(true)} />
      <div css={styles.title}>
        <span>
          {number}
        </span>
        <span>
          台積電
        </span>
      </div>
      <div css={styles.followingWrapper}>
        <span css={styles.status}>
          {/* {status} */}
          買
          &nbsp;
        </span>
        <span
          key={module.id}
          css={styles.word}>
          {`模組數量： ${modules.length}`}
        </span>
      </div>
      {shownModal ? <ModuleDetailModal modules={modules} close={() => showModal(false)} /> : null}
    </div>
  );
}

export default FollowingCard;
