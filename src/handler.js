const fetch = require('node-fetch')

exports.graphqlHandler = async (event, context) => {
  try {
    const format = event.format ? event.format : '1'
    const res = await fetch(`https://wttr.in/?format=${format}`, { timeout: 2000 })
    return res.text().trim()
  } catch (err) {
    console.error(err)
    return err
  }
}
