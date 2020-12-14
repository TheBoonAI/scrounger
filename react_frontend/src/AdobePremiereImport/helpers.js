/* eslint-disable global-require */
/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */

export const importInPremiere = async ({ url, name, setIsImporting, dl }) => {
  /**
   * Initialize CSInterface
   */
  const { CSInterface } = require('@cep/csinterface')

  const csInterface = new CSInterface()

  const filePath = `${dl}${name}`

  /**
   * Open file
   */
  const fs = window.cep_node.require('fs')

  const file = fs.createWriteStream(filePath)

  /**
   * Fetch resource as stream
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

      setIsImporting(false)

      break
    }

    /**
     * Write stream chunks to file
     */
    file.write(value)
  }
}
