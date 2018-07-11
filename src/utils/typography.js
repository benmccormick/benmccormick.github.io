import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';

export const sansFontStack =
  '"mr-eaves-xl-modern", "Helvetica Neue", Arial, sans-serif';

export const serifFontStack = '"minion-3", Garamond, serif';

const typography = new Typography({
  baseFontSize: '18px',
  //baseLineHeight: 1.666,
  baseLineHeight: 1.6,
  headerFontFamily: [
    'mr-eaves-xl-modern',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  bodyFontFamily: [
    'minion-3',
    'Garamond',
    'serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  scaleRatio: 1.6,
  blockMarginTop: 0.75,
  blockMarginBottom: 0.75,
  plugins: [new CodePlugin()],
  overrideStyles: () => ({
    'h1,h2,h3,h4,h5,h6': {
      lineHeight: 1.1,
    },
    'tt,code': {
      fontSize: '14px',
    },
    pre: {
      lineHeight: 1.1,
    },
    'pre code': {
      lineHeight: 1.1,
    },
    [MOBILE_MEDIA_QUERY]: {
      // Make font-size 17px on mobile.
      html: { fontSize: (18 / 16) * 100 + '%' },
    },
  }),
});

// Hot reload typography in development.
// if (process.env.NODE_ENV !== 'production') {
typography.injectStyles();
// }

export default typography;
