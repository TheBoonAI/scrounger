// https://tailwindcss.com/docs/configuration
module.exports = {
  purge: ['./pages/**/*.js', './src/**/*.js'],
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
  },
}
