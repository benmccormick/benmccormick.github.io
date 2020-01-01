/* eslint-disable*/
//we use these characters for the solid lines
const solidChars =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789+{}<>;';
// and these ones for empty space
const spaceChars = " `.,_-'";
const chars = [spaceChars, solidChars];
const colors = ['#E0E0E0', '#ED6159', 'black'];
const map = [ [13, 0, 0], [45, 1, 1], [13, 0, 0], null, [9, 0, 0], [53, 1, 1], [9, 0, 0], null, [7, 0, 0], [57, 1, 1], [6, 0, 0], null, [5, 0, 0], [61, 1, 1], [5, 0, 0], null, [3, 0, 0], [17, 1, 1], [30, 0, 0], [18, 1, 1], [3, 0, 0], null, [2, 0, 0], [14, 1, 1], [39, 0, 0], [14, 1, 1], [2, 0, 0], null, [2, 0, 0], [10, 1, 1], [46, 0, 0], [12, 1, 1], [1, 0, 0], null, [1, 0, 0], [11, 1, 1], [49, 0, 0], [10, 1, 1], null, [10, 1, 1], [15, 0, 0], [7, 1, 2], [11, 0, 0], [7, 1, 2], [11, 0, 0], [10, 1, 1], null, [10, 1, 1], [13, 0, 0], [9, 1, 2], [9, 0, 0], [9, 1, 2], [11, 0, 0], [10, 1, 1], null, [9, 1, 1], [12, 0, 0], [10, 1, 2], [8, 0, 0], [10, 1, 2], [13, 0, 0], [9, 1, 1], null, [9, 1, 1], [12, 0, 0], [5, 1, 2], [13, 0, 0], [5, 1, 2], [18, 0, 0], [9, 1, 1], null, [9, 1, 1], [12, 0, 0], [5, 1, 2], [13, 0, 0], [5, 1, 2], [18, 0, 0], [9, 1, 1], null, [9, 1, 1], [12, 0, 0], [11, 1, 2], [7, 0, 0], [11, 1, 2], [12, 0, 0], [9, 1, 1], null, [9, 1, 1], [12, 0, 0], [11, 1, 2], [7, 0, 0], [11, 1, 2], [12, 0, 0], [9, 1, 1], null, [9, 1, 1], [12, 0, 0], [11, 1, 2], [7, 0, 0], [11, 1, 2], [12, 0, 0], [9, 1, 1], null, [9, 1, 1], [12, 0, 0], [11, 1, 2], [7, 0, 0], [11, 1, 2], [12, 0, 0], [9, 1, 1], null, [9, 1, 1], [12, 0, 0], [11, 1, 2], [7, 0, 0], [11, 1, 2], [12, 0, 0], [9, 1, 1], null, [9, 1, 1], [12, 0, 0], [11, 1, 2], [7, 0, 0], [11, 1, 2], [12, 0, 0], [9, 1, 1], null, [9, 1, 1], [12, 0, 0], [11, 1, 2], [7, 0, 0], [11, 1, 2], [12, 0, 0], [9, 1, 1], null, [9, 1, 1], [53, 0, 0], [9, 1, 1], null, [9, 1, 1], [53, 0, 0], [9, 1, 1], null, [9, 1, 1], [53, 0, 0], [9, 1, 1], null, [9, 1, 1], [53, 0, 0], [9, 1, 1], null, [9, 1, 1], [13, 0, 0], [27, 1, 2], [13, 0, 0], [9, 1, 1], null, [9, 1, 1], [14, 0, 0], [25, 1, 2], [14, 0, 0], [9, 1, 1], null, [9, 1, 1], [15, 0, 0], [23, 1, 2], [15, 0, 0], [9, 1, 1], null, [9, 1, 1], [18, 0, 0], [17, 1, 2], [18, 0, 0], [9, 1, 1], null, [1, 0, 0], [8, 1, 1], [21, 0, 0], [11, 1, 2], [21, 0, 0], [8, 1, 1], [1, 0, 0], null, [1, 0, 0], [11, 1, 1], [48, 0, 0], [11, 1, 1], [1, 0, 0], null, [3, 0, 0], [14, 1, 1], [38, 0, 0], [14, 1, 1], [3, 0, 0], null, [4, 0, 0], [18, 1, 1], [26, 0, 0], [20, 1, 1], [4, 0, 0], null, [5, 0, 0], [26, 1, 1], [13, 0, 0], [22, 1, 1], [6, 0, 0], null, [7, 0, 0], [27, 1, 1], [10, 0, 0], [20, 1, 1], [7, 0, 0], null, [9, 0, 0], [28, 1, 1], [7, 0, 0], [18, 1, 1], [7, 0, 0], null, [15, 0, 0], [24, 1, 1], [5, 0, 0], [15, 1, 1], [12, 0, 0], ]; 

// generate the ascii from the map
const ascii = map.reduce((agg, val) => {
  if (val === null) return agg + '\n';
  agg = agg += '%c';
  let characters = chars[val[1]].split('');
  const randChar = () =>
    characters[Math.floor(Math.random() * characters.length)];
  for (let i = 0; i < val[0]; i++) {
    agg += randChar();
  }
  return agg;
}, '');

const colorStrings = map
  .filter(x => x !== null)
  .map(
    val => `color:${colors[val[2]]}; font-family: monospace, font-weight: bold`
  );

console.log(
  `I'm hiring React and Node developers @ Kustomer.  Please apply at http://tinyurl.com/kustomerjobs or reach out to me via email if interested
You can reach me by email at %cben@kustomer.com
%cThanks! - Ben
`,
  'color: blue',
  ''
);
console.log(ascii, ...colorStrings);
