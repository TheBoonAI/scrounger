import Head from 'next/head'

import SuspenseBoundary from '../SuspenseBoundary'

import SimilaritySearch from '../SimilaritySearch'

import AssetsContent from './Content'

const Assets = () => {
  return (
    <>
      <Head>
        <title>Scrounger</title>
      </Head>

      <div className="w-screen max-w-screen-xl h-full">
        <SimilaritySearch />

        <SuspenseBoundary>
          <AssetsContent />
        </SuspenseBoundary>
      </div>
    </>
  )
}

export default Assets
