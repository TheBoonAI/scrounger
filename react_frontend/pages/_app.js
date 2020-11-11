import App from 'next/app'

import '../styles/tailwind.css'

import Authentication from '../src/Authentication'
import Header from '../src/Header'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Authentication>
        <Header />
        <Component {...pageProps} />
      </Authentication>
    )
  }
}

export default MyApp
