import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';

const typography = new Typography({
  baseFontSize: '20px',
  //baseLineHeight: 1.666,
  baseLineHeight: 1.55,
  headerFontFamily: [
    'brandon-grotesque',
    'Brandon Grotesque',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'Lucida Sans',
    'Geneva',
    'Verdana',
    'sans-serif'
  ],
  bodyFontFamily: [
    'brandon-grotesque',
    'Brandon Grotesque',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'Lucida Sans',
    'Geneva',
    'Verdana',
    'sans-serif'
  ],
  scaleRatio: 1.5,
  blockMarginBottom: 0.75,
  plugins: [new CodePlugin()],
  overrideStyles: () => ({
    'h1,h2,h3,h4,h5,h6': {
      lineHeight: 1.1
    },
    'tt,code': {
      fontSize: '75%'
    },
    pre: {
      lineHeight: 1.1,
    },
    'pre code': {
      lineHeight: 1.1,
    },
    [MOBILE_MEDIA_QUERY]: {
      // Make font-size 17px on mobile.
      html: { fontSize: 18 / 16 * 100 + '%' },
    },
  }),
});

// Hot reload typography in development.
// if (process.env.NODE_ENV !== 'production') {
typography.injectStyles();
// }

export default typography;
