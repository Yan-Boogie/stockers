// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useParams } from 'react-router-dom';
import arrow from '../../static/images/arrow.png';
import { industryNames } from '../../Constant/industryName';

const styles = {
  wrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `,
  arrow: css`
    width: 24px;
    height: 24px;
    margin: 0 20px;
  `,
  industryName: css`
    font-size: 20px;
    font-weight: 800;
  `,
};

function HeaderIndustry() {
  const { industryId } = useParams();

  return (
    <div css={styles.wrapper}>
      <img src={arrow} alt="arrow" css={styles.arrow} />
      <span css={styles.industryName}>
        {industryNames[Number(industryId)].name}
      </span>
    </div>
  );
}

export default HeaderIndustry;
