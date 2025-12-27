// @flow

import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import moment from 'moment';
import type MomentType from 'moment';
import InputCalendarDateBlock from './InputCalendarDateBlock';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  naviBtn: {
    boxShadow: 'none',
    outline: 'none',
    width: 24,
    height: 24,
    backgroundColor: 'transparent',
    border: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#000',
    letterSpacing: 1,
    padding: '0 0 0 1px',
    margin: 0,
    lineHeight: 1,
    fontWeight: 400,
    textAlign: 'center',
    flexGrow: 1,
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '16px 0 0 0',
    padding: '0 5px',
  },
  th: {
    width: 18,
    flexShrink: 0,
    fontSize: 18,
    fontWeight: 400,
  },
  week: {
    margin: '4px -6px',
    width: 'calc(100% + 12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
  },
};

type Props = {
  value: string,
  onChange: Function,
  startFrom: ?string,
  endOn: ?string,
  closePicker: Function,
  availableDates?: ?Array<string>,
  defaultMonth?: MomentType,
};

function usePrevValue(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function InputCalendar({
  value,
  onChange,
  startFrom,
  endOn,
  closePicker,
  availableDates,
  defaultMonth,
}: Props) {
  const [activedMonth, setActivedMonth] = useState(defaultMonth);
  const [selectedDate, setSelectedDate] = useState(startFrom ? moment(startFrom) : null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(endOn ? moment(endOn) : null);

  const firstDate = useMemo(() => activedMonth.clone().startOf('month').startOf('isoWeek'), [activedMonth]);
  const lastDate = useMemo(() => activedMonth.clone().endOf('month').endOf('isoWeek'), [activedMonth]);
  const weeks = useMemo(() => lastDate.diff(firstDate, 'weeks') + 1, [lastDate, firstDate]);
  const dates = useMemo(() => Array.from(Array(weeks)).map((n, wIndex) => ({
    weekIndex: wIndex,
    dates: Array.from(Array(7)).map((m, dIndex) => (
      firstDate.clone().add(wIndex, 'weeks').add(dIndex, 'days')
    )),
  })), [weeks, firstDate]);

  const activedKey = useMemo(() => activedMonth.format('YYYYMM'), [activedMonth]);

  const range = useMemo(() => (
    startFrom && endOn ? moment.range(moment(startFrom).startOf('day'), moment(endOn).endOf('day')) : null
  ), [startFrom, endOn]);

  const prevMonth = useCallback(() => setActivedMonth(activedMonth.clone().subtract(1, 'month')), [activedMonth]);
  const nextMonth = useCallback(() => setActivedMonth(activedMonth.clone().add(1, 'month')), [activedMonth]);

  const prevStartFrom = usePrevValue(startFrom);
  const prevEndOn = usePrevValue(endOn);

  useEffect(() => {
    if (startFrom !== prevStartFrom || endOn !== prevEndOn) {
      setSelectedDate(null);
      setSelectedDateEnd(null);
    }
  }, [startFrom, prevStartFrom, endOn, prevEndOn]);

  useEffect(() => {
    setSelectedDate(moment(value));
  }, [value]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.actions}>
        <button
          onClick={prevMonth}
          style={styles.naviBtn}
          type="button">
          <svg width="16" height="16">
            <path
              strokeWidth="1"
              stroke="#000"
              fill="transparent"
              d="M11 1L5 8L11 15" />
          </svg>
        </button>
        <h6 style={styles.title}>
          {activedMonth.format('MMMM YYYY')}
        </h6>
        <button
          onClick={nextMonth}
          style={styles.naviBtn}
          type="button">
          <svg width="16" height="16">
            <path
              strokeWidth="1"
              stroke="#000"
              fill="transparent"
              d="M5 1L11 8L5 15" />
          </svg>
        </button>
      </div>
      <div style={styles.header}>
        <span style={styles.th}>Mo</span>
        <span style={styles.th}>Tu</span>
        <span style={styles.th}>We</span>
        <span style={styles.th}>Th</span>
        <span style={styles.th}>Fr</span>
        <span style={styles.th}>Sa</span>
        <span style={styles.th}>SU</span>
      </div>
      {dates.map(week => (
        <div
          key={week.weekIndex}
          style={styles.week}>
          {week.dates.map(date => (
            <InputCalendarDateBlock
              key={date.valueOf()}
              date={date}
              setSelectedDateEnd={setSelectedDateEnd}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              selectedDateEnd={selectedDateEnd}
              range={range}
              startFrom={startFrom}
              onChange={(dateStr) => {
                onChange(dateStr);
                closePicker();
              }}
              availableDates={availableDates}
              activedKey={activedKey}
              dates={dates} />
          ))}
        </div>
      ))}
    </div>
  );
}

InputCalendar.defaultProps = {
  availableDates: null,
  defaultMonth: moment().startOf('month'),
};

export default InputCalendar;
