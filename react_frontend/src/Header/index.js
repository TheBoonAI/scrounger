import Button from '../Button'

import { logout } from '../Authentication/helpers'

const Header = () => {
  return (
    <div className="flex flex-row bg-gray-900 p-4 items-center justify-between">
      <h1 className="text-xl pr-2">
        Scrounger
        <span className="text-base text-green-500 pl-2">Powered by Zorroa</span>
      </h1>

      <Button variant="primary" onClick={logout}>
        Sign out
      </Button>
    </div>
  )
}

export default Header
