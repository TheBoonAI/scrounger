import CEP from '@cep/csinterface'
import http from 'http'

export const importInPremiere = async ({ url, name }) => {
  const csInterface = new CEP.CSInterface()

  const tempFolder = '/tmp/com.zorroa.scrounger.panel'

  window.cep.fs.makedir(tempFolder)

  const filePath = `${tempFolder}/${name}`

  // eslint-disable-next-line no-undef
  const fs = cep_node.require('fs')

  const file = fs.createWriteStream(filePath)

  http.get(url, (res) => {
    res
      .on('data', (data) => {
        file.write(data)
      })
      .on('end', () => {
        file.end()
        csInterface.evalScript(`importFile("${filePath}")`)
      })
  })
}
