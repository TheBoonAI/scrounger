module.exports = {
  async rewrites() {
    return [
      /**
       * Proxy to redirect API calls to the local Django backend in development
       * https://nextjs.org/docs/api-reference/next.config.js/rewrites#rewriting-to-an-external-url
       */
      {
        source: '/api/v1/:path*',
        destination: `http://localhost:8000/api/v1/:path*`,
      },
    ]
  },
}
