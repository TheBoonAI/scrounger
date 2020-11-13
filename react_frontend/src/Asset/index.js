/* eslint-disable jsx-a11y/media-has-caption */
import { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

import ButtonCopy from '../Button/Copy'

const Asset = ({ assets, assetIndex, setAssetIndex }) => {
  const { id, name, path, type } = assets[assetIndex] || {}

  const keydownHandler = useCallback(
    ({ code }) => {
      if (code === 'ArrowLeft') {
        setAssetIndex((assetIndex + assets.length - 1) % assets.length)
      }

      if (code === 'ArrowRight') {
        setAssetIndex((assetIndex + 1) % assets.length)
      }
    },
    [assetIndex, setAssetIndex, assets],
  )

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler)

    return () => document.removeEventListener('keydown', keydownHandler)
  }, [keydownHandler])

  return (
    <Modal
      open={assetIndex > -1}
      onClose={() => setAssetIndex(-1)}
      center
      closeIcon={<div />}
      styles={{
        modal: {
          maxWidth: 'unset',
          padding: 0,
          backgroundColor: 'transparent',
          marginTop: '2.5vh',
        },
      }}
    >
      {id && (
        <>
          <div className="fixed top-0 right-0 mt-4 mr-4">
            <button
              type="button"
              className="border-2 p-1 ml-2 rounded-full hover:text-green-500 hover:border-green-500"
              onClick={() => setAssetIndex(-1)}
            >
              <svg viewBox="0 0 20 20" className="h-5 stroke-current stroke-2">
                <line x1="5" y1="5" x2="15" y2="15" />
                <line x1="5" y1="15" x2="15" y2="5" />
              </svg>
            </button>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 pb-2 bg-opacity-75 flex flex-wrap">
            <ButtonCopy text={name} />

            <ButtonCopy text={path} />
          </div>

          {['image', 'document'].includes(type) && (
            <img
              className="object-contain"
              style={{ height: '85vh' }}
              src={`/api/v1/assets/${id}/highres_file`}
              alt={name}
            />
          )}

          {type === 'video' && (
            <video
              key={id}
              crossOrigin="anonymous"
              className="object-contain"
              style={{ height: '85vh' }}
              autoPlay
              controls
              controlsList="nodownload"
              disablePictureInPicture
            >
              <source src={`/api/v1/assets/${id}/highres_file`} />
            </video>
          )}
        </>
      )}
    </Modal>
  )
}

Asset.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  assetIndex: PropTypes.number.isRequired,
  setAssetIndex: PropTypes.func.isRequired,
}

export default Asset
