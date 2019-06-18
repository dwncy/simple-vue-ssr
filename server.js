const path = require('path')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const template = require('fs').readFileSync('./src/index.template.html', 'utf-8')
const resolve = file => path.resolve(__dirname, file)
const server = express()

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // recommended
  template, // (optional) page template
  clientManifest, // (optional) client build manifest
  basedir: './dist', // this is only needed when vue-server-renderer is npm-linked
})

server.use('/dist', express.static('dist'))

server.get('*', (req, res) => {
  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if(err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Hello App',
    url: req.url
  }
  // No need to pass an app here because it is auto-created by
  // executing the bundle. Now our server is decoupled from our Vue app!
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    // handle error...
    res.end(html)
  })
})

const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
