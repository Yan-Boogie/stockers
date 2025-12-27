// @flow
/** @jsx jsx */

import {
  useEffect,
  useState,
  useMemo,
} from 'react';
import { jsx, css } from '@emotion/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  LineChart, Line, ResponsiveContainer, Legend, YAxis, XAxis,
} from 'recharts';
import { flex } from '../../Constant/emotion';
import { industryStream } from '../../Constant/industryStream';
import { industryNames } from '../../Constant/industryName';
import * as IndustryCardActions from '../../actions/IndustryCard';
import LoadingSpinner from '../../Elements/LoadingSpinner';

const button = css`
  width: 320px;
  height: 80px;
  border-radius: 40px;
  background-color: ${Colors.LAYER_FIRST};
`;

const styles = {
  wrapper: css`
    ${flex}
  `,
  blockWrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;
    flex-basis: 0;
    flex-shrink: 0;
    margin: 0 auto 50px auto;
  `,
  industryBlock: css`
    ${flex}
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    padding: 40px;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  article: css`
    font-size: 13px;
    letter-spacing: 2px;
    line-height: 25px;
  `,
  btnWrapper: css`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    margin: 0 0 20px 0;
  `,
  firstButton: css`
    ${button}
  `,
  button: css`
    ${button}
    margin: 0 20px 0 0;
  `,
  buttonTitle: css`
    font-size: 18px;
    font-weight: 800,
  `,
  subIndustryWrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 40px 0 0 0;
  `,
  subIndustry: css`
    ${flex}
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0 0 20px 0;
  `,
  subTitle: css`
    font-size: 18px;
    font-weight: 500;
  `,
  subBtnWrapper: css`
    ${flex}
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 20px 20px 0 0;
    flex-wrap: wrap;
  `,
  subBtn: css`
    width: 100px;
    height: 30px;
    margin: 0 20px 20px 0;
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  `,
  subBtnTitle: css`
    font-size: 13px;
    color: ${Colors.PRIMARY};
  `,
  disableBtnTitle: css`
    font-size: 13px;
  `,
  btnActive: css`
    ${button}
    margin: 0 20px 0 0;
    background-color: ${Colors.PRIMARY_THIRD};
  `,
  btnTitleActive: css`
    font-size: 18px;
    font-weight: 800;
    color: ${Colors.PRIMARY};
  `,
};

const INDUSTRY_TYPES = {
  UPPER: 'UPPER',
  MIDDLE: 'MIDDLE',
  LOWER: 'LOWER',
  OTHER: 'OTHER',
};

type Props = {
  fetchIndustryCardData: Function,
  industryCardData: Array,
};

function IndustryPage({
  fetchIndustryCardData,
  industryCardData,
}: Props) {
  const [industry, setIndustry] = useState('UPPER');
  const [isLoading, setLoading] = useState(true);

  const { industryId } = useParams();

  const gainChartData = useMemo(() => {
    if (!industryCardData.length) return null;

    const comparedIndustry = industryCardData?.filter(card => industryNames
      .some(industryName => industryName.name === card.industry_type));

    const gainData = comparedIndustry[Number(industryId)].companies?.map(company => company.gain_diff);

    const firstGain = gainData?.map(gain => gain[0].gain).reduce((prev, cur) => prev + cur);

    const secondGain = gainData?.map(gain => gain[1].gain).reduce((prev, cur) => prev + cur);

    const thirdGain = gainData?.map(gain => gain[2].gain).reduce((prev, cur) => prev + cur);

    return [{
      月份: '9月',
      漲跌幅: firstGain * 100,
    }, {
      月份: '10月',
      漲跌幅: secondGain * 100,
    }, {
      月份: '11月',
      漲跌幅: thirdGain * 100,
    }];
  }, [industryCardData, industryId]);

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

  const middleStream = useMemo(() => {
    if (!industryStream[Number(industryId)].streams[1].name) return null;

    return (
      <button
        css={{
          ...styles.button,
          ...(industry === 'MIDDLE') ? styles.btnActive : {},
        }}
        onClick={() => setIndustry(INDUSTRY_TYPES.MIDDLE)}
        type="button">
        <span
          css={{
            ...styles.buttonTitle,
            ...(industry === 'MIDDLE') ? styles.btnTitleActive : {},
          }}>
          {industryStream[Number(industryId)].streams[1].name}
        </span>
      </button>
    );
  }, [industry, industryId]);

  const otherStream = useMemo(() => {
    if (!industryStream[Number(industryId)].streams[3]) return null;

    return (
      <button
        css={{
          ...styles.button,
          ...(industry === 'OTHER') ? styles.btnActive : {},
        }}
        onClick={() => setIndustry(INDUSTRY_TYPES.OTHER)}
        type="button">
        <span
          css={{
            ...styles.buttonTitle,
            ...(industry === 'OTHER') ? styles.btnTitleActive : {},
          }}>
          {industryStream[Number(industryId)].streams[3].name}
        </span>
      </button>
    );
  }, [industry, industryId]);

  const [streamInfo] = useMemo(() => industryStream[Number(industryId)].streams
    .filter(stream => stream.type === industry), [industry, industryId]);

  const stockLink = useMemo(() => {
    if (!streamInfo.stocks.length) {
      return (
        <div css={styles.subTitle}>
          <span css={styles.subTitle}>
            {streamInfo.name}
          </span>
          <div css={styles.subBtnWrapper}>
            <div css={styles.subBtn}>
              <span css={styles.disableBtnTitle}>
                暫無提供
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        css={styles.subIndustry}>
        <span css={styles.subTitle}>
          {streamInfo.name}
        </span>
        <div css={styles.subBtnWrapper}>
          {streamInfo.stocks.map(stock => (
            <Link
              key={stock.number}
              to={`/industry/${industryId}/stocks/${stock.number}`}
              css={styles.subBtn}>
              <span css={styles.subBtnTitle}>
                {stock.number}
              </span>
              <span css={styles.subBtnTitle}>
                &nbsp;
                {stock.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }, [streamInfo, industryId]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div css={styles.wrapper}>
      <div css={styles.blockWrapper}>
        <h3>
          產業概觀
        </h3>
        <div css={styles.industryBlock}>
          <span css={styles.article}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {industryStream[Number(industryId)].description}
          </span>
          <div style={{ width: '100%' }}>
            <h4>
              漲跌幅走勢(單位%)
            </h4>
            <div style={{ width: '100%', height: 150 }}>
              <ResponsiveContainer>
                <LineChart data={gainChartData}>
                  <Legend verticalAlign="top" height={36} />
                  <XAxis dataKey="月份" />
                  <YAxis dataKey="漲跌幅" />
                  <Line type="monotone" dataKey="漲跌幅" stroke="#FF9500" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <div css={styles.blockWrapper}>
        <div css={styles.btnWrapper}>
          <button
            css={{
              ...styles.button,
              ...(industry === 'UPPER') ? styles.btnActive : {},
            }}
            onClick={() => setIndustry(INDUSTRY_TYPES.UPPER)}
            type="button">
            <span
              css={{
                ...styles.buttonTitle,
                ...(industry === 'UPPER') ? styles.btnTitleActive : {},
              }}>
              {industryStream[Number(industryId)].streams[0].name}
            </span>
          </button>
          {middleStream}
          <button
            css={{
              ...styles.button,
              ...(industry === 'LOWER') ? styles.btnActive : {},
            }}
            onClick={() => setIndustry(INDUSTRY_TYPES.LOWER)}
            type="button">
            <span
              css={{
                ...styles.buttonTitle,
                ...(industry === 'LOWER') ? styles.btnTitleActive : {},
              }}>
              &nbsp;
              {industryStream[Number(industryId)].streams[2].name}
            </span>
          </button>
          {otherStream}
        </div>
        <div css={styles.industryBlock}>
          <span css={styles.article}>
            {streamInfo.description}
          </span>
        </div>
        <div css={styles.subIndustryWrapper}>
          {stockLink}
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

export default reduxHook(IndustryPage);
