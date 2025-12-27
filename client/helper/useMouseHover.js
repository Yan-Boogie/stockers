// @flow

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { FLOAT_TEXT_INDEX } from '../Constant/zIndex';

const styles = {
  fullContent: {
    position: 'absolute',
    top: 0,
    pointerEvents: 'none',
    maxWidth: '20vw',
    minWidth: 250,
    left: 0,
    lineHeight: 1.618,
    letterSpacing: 1,
    maxHeight: '40vh',
    opacity: 0,
    transition: 'opacity 0.24s ease-out',
    height: 0,
    overflow: 'hidden',
    padding: 0,
    zIndex: FLOAT_TEXT_INDEX,
  },
  fullContentShown: {
    pointerEvents: 'auto',
    opacity: 1,
    // 高度可被元素撐開
    height: 'auto',
    overflow: 'auto',
    padding: '18px 0',
  },
  fullContentShownUp: {
    top: 'auto',
    bottom: 0,
  },
  fullContentShownLeft: {
    left: 'auto',
    right: 0,
  },
};

// Symbol : 讓後面的字串為獨立的，與其他地方出現的相同字串不同
export const FCDirections = {
  UP_LEFT: Symbol('FullContentDirections/UP/LEFT'),
  DOWN_LEFT: Symbol('FullContentDirections/DOWN/LEFT'),
  UP_RIGHT: Symbol('FullContentDirections/UP/RIGHT'),
  DOWN_RIGHT: Symbol('FullContentDirections/DOWN/RIGHT'),
};

export default (force = false) => {
  const timeoutRef = useRef();
  const triggerElem = useRef();
  const [showFullContentDirection, setshowFullContentDirection] = useState(null);
  // 滑鼠移入時，setTimeout
  const onMouseEnter = useCallback(({ pageX, pageY }) => {
    // current -> 我們要操作的DOM元素
    const { current } = triggerElem;

    if (!current) return;
    if (!force && current.scrollWidth <= current.offserWidth) return;

    // 用setTimeout讓框框出現
    timeoutRef.current = setTimeout(() => {
      // 元素Y軸 < or > 螢幕的高度的 1/2 -> 決定框框在上還是下
      if (pageY > (window.innerHeight / 2)) {
        // 再來看X軸的位置 -> 決定框框在左還右
        if (pageX > (window.innerWidth / 2)) {
          setshowFullContentDirection(FCDirections.UP_LEFT);
        } else {
          setshowFullContentDirection(FCDirections.UP_RIGHT);
        }
      } else if (pageX > (window.innerWidth / 2)) {
        setshowFullContentDirection(FCDirections.DOWN_LEFT);
      } else {
        setshowFullContentDirection(FCDirections.DOWN_RIGHT);
      }
    }, 300);
  }, [triggerElem, timeoutRef, force]);

  // 用來消除timeout顯示的框框
  const clearTimeoutHandler = useCallback(() => {
    // 如果上述的setTimeout有跑
    if (timeoutRef.current) {
      // 清掉setTimeout
      clearTimeout(timeoutRef.current);

      timeoutRef.current = null;
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    setshowFullContentDirection(null);

    clearTimeoutHandler();
  }, [clearTimeoutHandler]);

  useEffect(() => clearTimeoutHandler(), [clearTimeoutHandler]);

  // 各種狀態下會呈現的style
  const fullContentStyle = useMemo(() => ({
    ...styles.fullContent,
    ...showFullContentDirection && styles.fullContentShown,
    // 用indexOf判斷現在的狀況是否符合顯示在“上”的情況
    ...(~[
      FCDirections.UP_LEFT,
      FCDirections.UP_RIGHT,
    ].indexOf(showFullContentDirection) && styles.fullContentShownUp),
    // 用indexOf判斷現在的狀況是否符合顯示在“左”的情況
    ...(~[
      FCDirections.UP_LEFT,
      FCDirections.DOWN_LEFT,
    ].indexOf(showFullContentDirection) && styles.fullContentShownLeft),
  }), [showFullContentDirection]);

  // 整個 hook 是回傳一個陣列，包含上述所有狀況跟功能，讓我們去取用
  return [triggerElem, onMouseEnter, onMouseLeave, fullContentStyle];
};
