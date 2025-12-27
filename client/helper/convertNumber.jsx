// @flow

export default function convertNumber(num) {
  if (typeof (num) === 'string') {
    const parts = num.split('.');

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return parts.join('.');
  }

  const numParts = num.toString().split('.');

  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return numParts.join('.');
}
