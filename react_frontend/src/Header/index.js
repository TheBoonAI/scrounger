import PropTypes from 'prop-types'

import { logout } from '../Authentication/helpers'

import Button from '../Button'
import Search from '../Search'
import Tabs from '../Tabs'
import Pagination from '../Pagination'

const Header = ({ uploadedAssets }) => {
  return (
    <div className="bg-gray-900 w-full px-2 xl:px-4 flex flex-col items-center flex-shrink-0">
      <div className="flex flex-row flex-wrap sm:flex-nowrap justify-between py-4 w-full">
        <h1 className="flex flex-col leading-none text-xl pr-2">
          Scrounger
          <span className="text-sm text-green-500">powered by Boon AI</span>
        </h1>

        <div className="sm:order-last">
          <Button onClick={logout}>Sign out</Button>
        </div>

        <Search />
      </div>

      <div className="flex xl:px-2 justify-between w-full max-w-screen-xl">
        <Tabs />

        <Pagination uploadedAssets={uploadedAssets} />
      </div>
    </div>
  )
}

Header.propTypes = {
  uploadedAssets: PropTypes.object.isRequired,
}
export default Header
