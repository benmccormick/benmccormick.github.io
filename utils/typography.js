import Typography from 'typography'

const typography = new Typography({
    baseFontSize: '18px',
    baseLineHeight: 1.666,
    scale: 1.5,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
