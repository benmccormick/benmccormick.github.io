import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';

export const headerFontStack =
  '"Inter", "Helvetica Neue", "Helvetica", Arial, sans-serif';

export const bodyFontStack =
  '"Work Sans", "Helvetica Neue", "Helvetica", Arial, sans-serif';

const typography = new Typography({
  baseFontSize: '16px',
  //baseLineHeight: 1.666,
  baseLineHeight: 1.4,
  headerFontFamily: [
    'Inter',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ],
  bodyFontFamily: [
    'Work Sans',
    'Helvetica Neue',
    'Helvetica',
    'Arial',
    'sans-serif',
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
      lineHeight: 1.2,
    },
    'tt,code': {
      fontSize: '12px',
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
