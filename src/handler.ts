import fetch from 'node-fetch'

export const graphqlHandler = async (event: any): Promise<String> => {
  const format = event.format ? event.format : '1'
  const res = await fetch(`https://wttr.in/?format=${format}`, {
    timeout: 2000,
  })
  const text = await res.text()
  return text.trim()
}
