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
              className="border-2 ml-2 rounded-full hover:text-green-500 hover:border-green-500"
              onClick={() => setAssetIndex(-1)}
            >
              <svg
                viewBox="0 0 20 20"
                className="h-6 sm:h-7 transform fill-current"
              >
                <path d="M13.9 4l1.4 1.4-4.2 4.2 4.2 4.2-1.4 1.4L9.7 11l-4.2 4.2L4 13.9l4.2-4.2L4 5.4 5.4 4l4.2 4.2L13.9 4z" />
              </svg>
            </button>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 pb-2 opacity-75 flex flex-wrap">
            <ButtonCopy text={name} />

            <ButtonCopy text={path} />
          </div>

          {['image', 'document'].includes(type) && (
            <img
              className="object-contain"
              style={{ height: '85vh' }}
              src={`/api/v1/assets/${id}/highres_file/`}
              alt={name}
            />
          )}

          {type === 'video' && (
            <video
              crossOrigin="anonymous"
              className="object-contain"
              style={{ height: '85vh' }}
              autoPlay
              controls
              controlsList="nodownload"
              disablePictureInPicture
            >
              <source src={`/api/v1/assets/${id}/highres_file/`} />
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
