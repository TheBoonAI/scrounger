import App from 'next/app'
import { SWRConfig } from 'swr'

import '../styles/tailwind.css'

import Authentication from '../src/Authentication'
import Header from '../src/Header'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Authentication>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(`/api/v1${resource}`, init).then((res) => res.json()),
            suspense: true,
          }}
        >
          <div className="h-screen">
            <div className="flex flex-col items-center w-full h-full">
              <Header />
              <Component {...pageProps} />
            </div>
          </div>
        </SWRConfig>
      </Authentication>
    )
  }
}

export default MyApp
