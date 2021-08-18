const handlebars = require('handlebars')
const fs =  require('fs')

module.exports = class HandlebarsTemplateProvider {
  async parse(data) {
    const { file, variables } = data
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}
