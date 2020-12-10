/* eslint-disable no-undef */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */

import CEP from '@cep/csinterface'

export const importInPremiere = async ({ url, name }) => {
  const csInterface = new CEP.CSInterface()

  const tempFolder = '/tmp/com.zorroa.scrounger.panel'

  window.cep.fs.makedir(tempFolder)

  const filePath = `${tempFolder}/${name}`

  const fs = cep_node.require('fs')

  const file = fs.createWriteStream(filePath)

  const response = await fetch(url)

  const reader = response.body.getReader()

  while (true) {
    const { value, done } = await reader.read()

    if (done) {
      file.end()

      csInterface.evalScript(`importFile("${filePath}")`)

      break
    }

    file.write(value)
  }
}
