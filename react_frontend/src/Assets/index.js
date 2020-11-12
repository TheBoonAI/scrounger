import Head from 'next/head'

import SuspenseBoundary from '../SuspenseBoundary'

import AssetsContent from './Content'

const Assets = () => {
  return (
    <>
      <Head>
        <title>Scrounger</title>
      </Head>

      <SuspenseBoundary>
        <AssetsContent />
      </SuspenseBoundary>
    </>
  )
}

export default Assets
