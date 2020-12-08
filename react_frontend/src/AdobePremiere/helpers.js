import CEP from '@cep/csinterface'

const csInterface = new CEP.CSInterface()

const cleanFileName = (name) => {
  return name.split(' ').join('-').replace(/\W/g, '')
}

const createTempFolder = () => {
  const tempFolderName = 'com.zorroa.scrounger.panel/'

  const tempFolder =
    window.navigator.platform.toLowerCase().indexOf('win') > -1
      ? `${csInterface.getSystemPath(
          SystemPath.USER_DATA,
        )}/../Local/Temp/${tempFolderName}`
      : `/tmp/${tempFolderName}`

  window.cep.fs.makedir(tempFolder)

  return tempFolder
}

export const importInPremiere = ({ url, name }) => {
  const xhr = new XMLHttpRequest()

  xhr.open('GET', url, true)

  xhr.responseType = 'arraybuffer'

  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      const uInt8Array = new Uint8Array(this.response)
      let i = uInt8Array.length
      const binaryString = new Array(i)
      while (i--) binaryString[i] = String.fromCharCode(uInt8Array[i])
      const data = binaryString.join('')
      const base64 = window.btoa(data)

      const downloadedFile = `${createTempFolder()}${name}`

      window.cep.fs.writeFile(
        downloadedFile,
        base64,
        window.cep.encoding.Base64,
      )

      csInterface.evalScript(`importFile("${downloadedFile}")`)
    }
  }

  xhr.send()
}
