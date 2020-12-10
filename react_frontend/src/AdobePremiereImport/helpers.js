/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */

export const importInPremiere = async ({ url, name }) => {
  /**
   * Initialize CSInterface
   */
  const { CSInterface } = require('@cep/csinterface')

  const csInterface = new CSInterface()

  /**
   * Create temporary directory
   */
  const tempFolder = '/tmp/com.zorroa.scrounger.panel'

  window.cep.fs.makedir(tempFolder)

  const filePath = `${tempFolder}/${name}`

  /**
   * Open file
   */
  const fs = cep_node.require('fs')

  const file = fs.createWriteStream(filePath)

  /**
   * Fetch ressource as stream
   */
  const response = await fetch(url)

  const reader = response.body.getReader()

  while (true) {
    /**
     * Read stream chunks
     */
    const { value, done } = await reader.read()

    if (done) {
      /**
       * Close file
       */
      file.end()

      /**
       * Send file path to JSX for import into Premiere
       */
      csInterface.evalScript(`importFile("${filePath}")`)

      break
    }

    /**
     * Write stream chunks to file
     */
    file.write(value)
  }
}
