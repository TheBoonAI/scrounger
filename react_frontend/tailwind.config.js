// https://tailwindcss.com/docs/configuration
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./pages/**/*.js', './src/**/*.js'],
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
  },
}
