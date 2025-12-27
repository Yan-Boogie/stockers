// @flow
/* eslint react-hooks/exhaustive-deps: 0 */
/** @jsx jsx */

import {
  useMemo,
  useCallback,
} from 'react';
import { jsx, css } from '@emotion/core';
import { extendMoment } from 'moment-range';
import Moment from 'moment';
import type MomentType from 'moment';

const moment = extendMoment(Moment);

const styles = {
  dateBtn: css`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    font-size: 18px;
    color: #000;
    line-height: 1;
    font-weight: 400;
    border: 2px solid transparent;
    background-color: #E3E3E3;
    &:hover {
      border: 2px solid ${Colors.PRIMARY.NORMAL};
    }
  `,
  dateFade: css`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.3);
    line-height: 1;
    font-weight: 400;
    border: 2px solid transparent;
    background-color: #E3E3E3;
    &:hover {
      border: 2px solid ${Colors.PRIMARY.NORMAL};
    }
  `,
  dateDisabled: css`
    color: rgba(0, 0, 0, 0.3);
    pointer-events: none;
    &:hover {
      border: 2px solid ${Colors.PRIMARY.NORMAL},
    }
  `,
  dateSelected: {
    border: `2px solid ${Colors.PRIMARY.NORMAL}`,
  },
};

function InputCalendarDateBlock({
  date,
  selectedDate,
  selectedDateEnd,
  range,
  startFrom,
  onChange,
  availableDates,
  activedKey,
}: {
  date: ?MomentType,
  selectedDate: MomentType,
  selectedDateEnd: MomentType,
  range: ?{
    start: MomentType,
    end: MomentType,
  },
  startFrom: ?string,
  onChange: Function,
  availableDates: null,
  activedKey: string,
}) {
  const dateStr = useMemo(() => date.format('YYYY-MM-DD'), [date]);
  const selectedDateStr = useMemo(() => (
    selectedDate ? selectedDate.format('YYYY-MM-DD') : null
  ), [selectedDate]);

  const localRange = useMemo(() => (
    moment.range(selectedDate, selectedDateEnd)
  ), [selectedDate, selectedDateEnd]);

  const startFromStr = useMemo(() => moment(startFrom).format('YYYY-MM-DD'), [startFrom]);

  const isSelected = useMemo(() => {
    if (selectedDate) {
      if (selectedDateStr === dateStr) return true;
      if (selectedDateEnd && localRange.contains(date)) return true;

      return false;
    }

    if (range && range.contains(date)) return true;

    if (startFrom && startFromStr === dateStr) return true;

    return false;
  }, [
    selectedDate,
    selectedDateStr,
    dateStr,
    localRange,
    range,
    startFrom,
    startFromStr,
    date,
    selectedDateEnd,
  ]);

  const disabled = useMemo(() => {
    if (availableDates && !~availableDates.indexOf(dateStr)) return true;

    return false;
  }, [availableDates, dateStr]);

  const onClick = useCallback(() => {
    if (disabled) return;

    onChange(dateStr);
  }, [
    dateStr,
    onChange,
    disabled,
  ]);

  const onlyDate = useMemo(() => date.format('D'), [date]);
  const yearMonth = useMemo(() => date.format('YYYYMM'), [date]);

  const btnStyles = useMemo(() => ({
    ...styles.dateBtn,
    ...activedKey !== yearMonth ? styles.dateFade : {},
    ...disabled ? styles.dateDisabled : {},
    ...isSelected ? styles.dateSelected : {},
  }), [yearMonth, disabled, isSelected, activedKey]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      css={btnStyles}
      type="button">
      {onlyDate}
    </button>
  );
}

export default InputCalendarDateBlock;
