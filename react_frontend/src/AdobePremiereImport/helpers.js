import CEP from '@cep/csinterface'
import { base64 } from 'rfc4648'

const csInterface = new CEP.CSInterface()

const createTempFolder = () => {
  const tempFolderName = 'com.zorroa.scrounger.panel/'

  const tempFolder =
    window.navigator.platform.toLowerCase().indexOf('win') > -1
      ? `${csInterface.getSystemPath(
          // eslint-disable-next-line no-undef
          SystemPath.USER_DATA,
        )}/../Local/Temp/${tempFolderName}`
      : `/tmp/${tempFolderName}`

  window.cep.fs.makedir(tempFolder)

  return tempFolder
}

export const importInPremiere = async ({ url, name }) => {
  const filePath = `${createTempFolder()}${name}`

  const response = await fetch(url)

  const buffer = await response.arrayBuffer()

  const data = base64.stringify(new Uint8Array(buffer))

  window.cep.fs.writeFile(filePath, data, window.cep.encoding.Base64)

  csInterface.evalScript(`importFile("${filePath}")`)
}
