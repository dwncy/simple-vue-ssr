import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const s = Date.now()

    const { app, router, store } = createApp()

    router.push(context.url)

    router.onReady(() => {
      // This is serve in vue version 2.6
      // // This `rendered` hook is called when the app has finished rendering
      // context.rendered = () => {
      //   // After the app is rendered, our store is now
      //   // filled with the state from our components.
      //   // When we attach the state to the context, and the `template` option
      //   // is used for the renderer, the state will automatically be
      //   // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
      //   context.state = store.state
      // }

      const matchedComponents = router.getMatchedComponents()
      // no matched routes
       if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        console.log(`data pre-fetch: ${Date.now() - s}ms`)
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
