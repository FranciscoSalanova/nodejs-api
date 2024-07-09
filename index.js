const http = require("http")
const url = require("url")
const StringDecoder = require("string_decoder").StringDecoder

const PORT = 3000

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const path = parsedUrl.pathname
  const trimmedPath = path.replace(/^\/+|\/+$/g, "")
  const method = req.method.toLowerCase()
  const queryStringObject = parsedUrl.query
  const headers = req.headers
  const decoder = new StringDecoder("utf-8")
  let buffer = ""

  req.on("data", (data) => {
    buffer += decoder.write(data)
  })

  req.on("end", () => {
    buffer += decoder.end()

    console.log(`Request received with the following payload:`, buffer)

    res.end("Hello world!")
  })
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
