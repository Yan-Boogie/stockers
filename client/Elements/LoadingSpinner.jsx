// @flow

import React from 'react';

const styles = {
  wrapper: {
    backgroundColor: 'transparent',
  },
};

type Props = {
  sm?: boolean,
};

function LoadingSpinner({
  sm,
}: Props) {
  return (
    <svg
      width={`${sm ? 16 : 32}px`}
      height={`${sm ? 16 : 32}px`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style={styles.wrapper}>
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="rgba(28, 193, 208, 0.75)"
        strokeWidth="5"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
        transform="rotate(299.945 50 50)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1.2s"
          begin="0s"
          repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

LoadingSpinner.defaultProps = {
  sm: false,
};

export default LoadingSpinner;
