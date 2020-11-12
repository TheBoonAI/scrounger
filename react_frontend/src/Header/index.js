import { logout } from '../Authentication/helpers'

import Button from '../Button'
import Search from '../Search'
import Tabs from '../Tabs'
import Pagination from '../Pagination'

const Header = () => {
  return (
    <div className="bg-gray-900 w-full px-4 flex flex-col items-center">
      <div className="flex flex-row flex-wrap sm:flex-no-wrap justify-between py-4 w-full">
        <h1 className="flex flex-col leading-none text-xl pr-2">
          Scrounger
          <span className="text-sm text-green-500">by Zorroa</span>
        </h1>

        <div className="sm:order-last">
          <Button variant="primary" onClick={logout}>
            Sign out
          </Button>
        </div>

        <Search />
      </div>

      <div className="flex justify-between w-full max-w-screen-xl">
        <Tabs />
        <Pagination />
      </div>
    </div>
  )
}

export default Header
