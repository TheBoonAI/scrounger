import { useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { SWRConfig } from 'swr'

import '../styles/tailwind.css'

import Authentication from '../src/Authentication'
import Header from '../src/Header'

const App = ({ Component, pageProps }) => {
  const [uploadedAssets, setUploadedAssets] = useState({})

  if (typeof window === 'undefined') return null

  return (
    <>
      <Head>
        <title>Scrounger powered by Boon AI</title>
      </Head>

      <Authentication>
        <SWRConfig
          value={{
            fetcher: (resource) => {
              return fetch(`/api/v1${resource}`).then((res) => res.json())
            },
            suspense: true,
          }}
        >
          <div className="h-screen">
            <div className="flex flex-col items-center w-full h-full">
              <Header uploadedAssets={uploadedAssets} />

              <Component
                uploadedAssets={uploadedAssets}
                setUploadedAssets={setUploadedAssets}
                {...pageProps}
              />
            </div>
          </div>
        </SWRConfig>
      </Authentication>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default App
