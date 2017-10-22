import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'
import {Provider} from 'react-redux'

import {StaticRouter} from 'react-router'
import {collectInitial} from 'node-style-loader/collect'

import store from './store'
import {history, linkHistoryToStore} from './routing'

import App from './components/App'

function index({htmlWebpackPlugin: {files: {chunks}, options: {data: atomicNumber}}}){
  history.push(`/${atomicNumber}`)
  linkHistoryToStore(store)

  const initialStyleTagString = collectInitial()
  const appRenderedString = renderToString(
    <Provider store={store}>
      <StaticRouter history={history} location={`/${atomicNumber}`} >
        <App />
      </StaticRouter>
    </Provider>
  )

  const preRenderedStateScriptString = `window.preRenderedState = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`

  return (
    <html>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <title>Tabla</title>
      <p dangerouslySetInnerHTML={{__html: initialStyleTagString}} />
      <section id="app" dangerouslySetInnerHTML={{__html: appRenderedString }} />
      <script dangerouslySetInnerHTML={{__html: preRenderedStateScriptString}} />
      {Object.values(chunks).map(({entry}) => <script src={entry} />)}
    </html>
  )
}

export default params => `<!DOCTYPE html> ${renderToStaticMarkup(index(params))}`
