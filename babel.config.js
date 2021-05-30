const plugins = []

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  plugins.push('react-refresh/babel')
}

// eslint-disable-next-line no-undef
module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins,
}
