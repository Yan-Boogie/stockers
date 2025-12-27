// @flow
/** @jsx jsx */

import {
  useState,
  useMemo,
  useEffect,
} from 'react';
import { jsx, css } from '@emotion/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { flex } from '../../Constant/emotion';
import { SITE_HEADER_INDEX } from '../../Constant/zIndex';
import arrow from '../../static/images/arrow.png';
import * as IndustryCardActions from '../../actions/IndustryCard';
import LoadingSpinner from '../LoadingSpinner';
import { industryNames } from '../../Constant/industryName';

const styles = {
  wrapper: css`
    ${flex}
    flex-direction: row;
    justify-content: flex-start;
  `,
  arrow: css`
    width: 24px;
    height: 24px;
    margin: 0 20px;
  `,
  industryName: css`
    font-size: 20px;
    font-weight: 800;
    text-decoration: none;
    z-index: ${SITE_HEADER_INDEX};
  `,
  stock: css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `,
  stockName: css`
    font-size: 20px;
    font-weight: 800;
    color: ${Colors.PRIMARY};
  `,
  following: css`
    width: 60px;
    height: 24px;
    border: solid 1px ${Colors.PRIMARY};
    border-radius: 4px;
    text-align: center;
    line-height: 20px;
    margin: 0 0 0 20px;
  `,
  followingWord: css`
    font-size: 13px;
    font-weight: 500;
    colors: ${Colors.PRIMARY};
  `,
};

function HeaderStock({
  fetchIndustryCardData,
  industryCardData,
}: {
  fetchIndustryCardData: Function,
  industryCardData: Array,
}) {
  const { industryId, stockId } = useParams();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    async function fetchIndustryData() {
      const resData = await fetch(`${API_HOST}/stocker/industryStickers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => (!canceled ? res.json() : null));

      if (resData) {
        fetchIndustryCardData(resData);
      }
    }

    fetchIndustryData();
    setLoading(false);

    return () => {
      canceled = true;
    };
  }, [fetchIndustryCardData]);

  const stockName = useMemo(() => {
    if (!industryCardData.length) return null;

    const comparedIndustry = industryCardData?.filter(card => industryNames
      .some(industry => industry.name === card.industry_type));

    const stock = comparedIndustry[Number(industryId)].companies
      .filter(company => company.stockNo === stockId);

    return stock[0].name;
  }, [industryCardData, stockId, industryId]);

  const stock = useMemo(() => {
    if (isLoading) return <LoadingSpinner />;

    return (
      <span
        css={styles.stockName}>
        {stockId}
        &nbsp;
        {stockName}
      </span>
    );
  }, [isLoading, stockId, stockName]);

  return (
    <div css={styles.wrapper}>
      <img src={arrow} alt="arrow" css={styles.arrow} />
      <Link
        to={`/industry/${industryId}`}
        css={styles.industryName}>
        {industryNames[Number(industryId)].name}
      </Link>
      <img src={arrow} alt="arrow" css={styles.arrow} />
      <div css={styles.stock}>
        {stock}
        <div css={styles.following}>
          <span css={styles.followingWord}>
            已追蹤
          </span>
        </div>
      </div>
    </div>
  );
}

const reduxHook = connect(
  state => ({
    industryCardData: state.IndustryCard.IndustryCardData,
  }),
  dispatch => bindActionCreators({
    ...IndustryCardActions,
  }, dispatch),
);

export default reduxHook(HeaderStock);
