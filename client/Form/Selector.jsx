// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import {
  useEffect,
  useMemo,
} from 'react';
import isNil from 'lodash/isNil';
import type { FieldProps } from 'redux-form';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  wrapperInputStyle: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inlineBordered: {
    backgroundColor: 'transparent',
    border: 0,
    height: 'auto',
  },
  wrapperInlineBorderedStyle: {
    width: 164,
    border: '1px solid #E0E0E0',
    borderRadius: 3,
    height: 28,
    backgroundColor: '#fff',
  },
  wrapperInlineBorderedWithLabelStyle: {
    height: 28,
  },
  wrapperInlineBorderedSmStyle: {
    flexGrow: 1,
    height: 28,
    border: '1px solid #E0E0E0',
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  wrapperFillHeight: {
    height: '100%',
  },
  wrapperTinyStyle: {
    width: 32,
    borderRadius: 3,
    height: 28,
    backgroundColor: '#fff',
  },
  textInputBorderContainer: {
    height: 40,
    border: '1px solid rgb(224, 224, 224)',
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  textInputWrapper: {
    height: 40,
  },
  innerInlineBorderedSmStyle: {
    width: '100%',
    height: 26,
  },
  innerFillHeight: {
    height: '100%',
  },
  disabledSelector: {
    // backgroundImage: `url(${backgroundPic})`,
    backgroundSize: '36px 36px',
    backgroundRepeat: 'repeat',
    color: '#C1C1C1',
  },
  selectorFillHeight: {
    height: '100%',
  },
  selectorNoMinWidth: {
    minWidth: 'none',
  },
  label: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: 500,
    letterSpacing: 1,
    margin: '0 12px 0 0',
  },
  inlineBorderedLabel: {
    width: 70,
    margin: 0,
    fontWeight: 300,
    flexShrink: 0,
  },
  selector: {
    WebkitAppearance: 'none',
    appearance: 'none',
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: '0 34px 0 16px',
    lineHeight: '30px',
    fontSize: 12,
    color: Colors.SECONDARY,
    letterSpacing: 1,
    border: 0,
    outline: 'none',
    minWidth: 100,
  },
  selectorInputStyle: {
    width: '100%',
    height: 40,
    borderRadius: 3,
    backgroundColor: '#FAFAFA',
    border: '1px solid #E0E0E0',
  },
  selectorInlineBorderedStyle: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 24,
    lineHeight: '24px',
    padding: '0 30px 0 12px',
  },
  selectorInlineBoxShadowed: {
    width: '100%',
    height: '100%',
  },
  selectorInlineBorderedWithLabelStyle: {
    border: '1px solid #E0E0E0',
    borderRadius: 3,
    width: '100%',
    height: 28,
    lineHeight: '28px',
  },
  tinySelector: {
    minWidth: 10,
    backgroundColor: 'transparent',
    width: '100%',
    height: 24,
    lineHeight: '24px',
    padding: '0 8px 0 8px',
  },
  triangle: {
    width: 0,
    height: 0,
    position: 'absolute',
    borderTop: `solid 5px ${Colors.SECONDARY}`,
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    pointerEvents: 'none',
    top: 'calc(50% - 3px)',
    right: 15,
  },
  inner: {
    position: 'relative',
  },
  innerInputStyle: {
    width: '100%',
    margin: '12px 0 0 0',
  },
  inlineBorderedStyle: {
    width: '100%',
    height: 24,
  },
  inlineBoxShadowed: {
    width: '100%',
    height: '100%',
  },
  triangleInputInlineBorderedStyle: {
    right: 10,
  },
  errorSelector: {
    color: Colors.ERROR,
  },
  wrapperInlineBoxShadowedStyle: {
    width: '100%',
    height: 40,
    borderRadius: 2,
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.1)',
  },
  triangleInputInlineBoxShadowed: {
    right: 15,
    opacity: 0.3,
  },
  textInput: {
    height: 40,
    fontSize: 13,
    padding: '0 30px 0 12px',
  },
  selectorInlineBorderedSmStyle: {
    width: '100%',
    height: 26,
    fontSize: 13,
    lineHeight: '26px',
  },
};

type Props = {
  options: Array<SelectOptionType>,
  label?: ?string,
  inputStyle?: boolean,
  inlineBordered?: boolean,
  fullWidth?: boolean,
  error?: boolean,
  inlineBoxShadowed?: boolean,
  noTriangle?: boolean,
  disabled?: boolean,
  textInputLike?: boolean,
  tinySelector?: boolean,
  noMargin?: boolean,
  fillHeight?: boolean,
  hide?: boolean,
  noMinWidth?: boolean,
  ...FieldProps,
};

function Selector({
  inlineBordered,
  inlineBorderedSm,
  options,
  label,
  input,
  inputStyle,
  fullWidth,
  error,
  inlineBoxShadowed,
  noTriangle,
  disabled,
  textInputLike,
  tinySelector,
  noMargin,
  fillHeight,
  hide,
  noMinWidth,
}: Props) {
  const {
    name,
    value,
    onChange,
  } = input || {};

  const id = useMemo(() => (name ? `${name}:${Date.now()}` : Date.now()), [name]);


  useEffect(() => {
    if (options?.length && (
      isNil(value) || !options.find(option => `${option.id}` === `${value}`)
    )) {
      onChange(options[0].id);
    }
  }, [options, value, onChange]);

  if (!options || !options.length || hide) return null;

  return (
    <div
      css={[
        styles.wrapper,
        inputStyle && styles.wrapperInputStyle,
        inlineBoxShadowed && styles.wrapperInlineBoxShadowedStyle,
        inlineBordered && !label && styles.wrapperInlineBorderedStyle,
        tinySelector && styles.wrapperTinyStyle,
        inlineBordered && label && styles.wrapperInlineBorderedWithLabelStyle,
        textInputLike && styles.textInputBorderContainer,
        inlineBorderedSm && styles.wrapperInlineBorderedSmStyle,
        fillHeight && styles.wrapperFillHeight,
        fullWidth && { width: '100%' },
      ]}>
      {label ? (
        <label
          css={[
            styles.label,
            inlineBordered && styles.inlineBorderedLabel,
          ]}
          htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div
        css={[
          styles.inner,
          inputStyle && styles.innerInputStyle,
          (inlineBordered || tinySelector) && styles.inlineBorderedStyle,
          inlineBoxShadowed && styles.inlineBoxShadowed,
          textInputLike && styles.textInputWrapper,
          inlineBorderedSm && styles.innerInlineBorderedSmStyle,
          fillHeight && styles.innerFillHeight,
          noMargin && { margin: 0 },
        ]}>
        <select
          id={id}
          name={name}
          value={value || options[0].id}
          onChange={onChange}
          disabled={disabled}
          css={[
            styles.selector,
            inputStyle && styles.selectorInputStyle,
            inlineBordered && !label && styles.selectorInlineBorderedStyle,
            inlineBordered && label && styles.selectorInlineBorderedWithLabelStyle,
            error && styles.errorSelector,
            inlineBoxShadowed && styles.selectorInlineBoxShadowed,
            textInputLike && styles.textInput,
            inlineBorderedSm && styles.selectorInlineBorderedSmStyle,
            tinySelector && styles.tinySelector,
            disabled && styles.disabledSelector,
            fillHeight && styles.selectorFillHeight,
            noMinWidth && styles.selectorNoMinWidth,
          ]}>
          {options.map(option => (
            <option
              key={option.id}
              value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {!noTriangle ? (
          <span
            css={[
              styles.triangle,
              inlineBordered && styles.triangleInputInlineBorderedStyle,
              inlineBoxShadowed && styles.triangleInputInlineBoxShadowed,
            ]} />
        ) : null}
      </div>
    </div>
  );
}

Selector.defaultProps = {
  label: null,
  inputStyle: false,
  inlineBordered: false,
  fullWidth: false,
  error: false,
  inlineBoxShadowed: false,
  noTriangle: false,
  disabled: false,
  textInputLike: false,
  tinySelector: false,
  noMargin: false,
  fillHeight: false,
  hide: false,
  noMinWidth: false,
};

export default Selector;
