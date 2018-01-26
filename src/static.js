import React from 'react'
import {renderToString, renderToStaticMarkup} from 'react-dom/server'

import fullElements from '../data/dist/full'
import {FullElement} from './elements'

import store from './store'
import {history, linkHistoryToStore} from './routing'

import Document from './components/Document'
import Root from './components/Root'

export default ({routerPath, routeNumber, routerPaths, cssIdentifier, webpackStats: {compilation: {hash, assets}}}) => {
  const chunks = Object.keys(assets).filter(name => name !== 'static.js' && name.match(/\.js$/))

  history.push(routerPath)
  linkHistoryToStore(store)

  const cssString = assets[cssIdentifier].children[0]._value

  const atomicNumber = store.getState().periodicTable.selectedElement

  global.build = `${process.env.NODE_ENV !== 'production' ? 'd' : 'p'}${hash}`

  // HACK: Pass FullElement down for render
  global.fullElementHack = typeof atomicNumber === 'number' ? new FullElement(atomicNumber, fullElements[atomicNumber]) : {}

  const renderedAppString = renderToString(<Root store={store} />)

  const dryStateString = `window.dryState = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`
  const dryFullElementString = atomicNumber ? `window.dryfullElement = ${JSON.stringify(fullElements[atomicNumber]).replace(/</g, '\\u003c')}` : ''
  const buildString =`window.build = ${JSON.stringify(global.build)}`
  const continuityScriptString = [dryStateString, dryFullElementString, buildString].join(';')


  const documentString = renderToStaticMarkup((
    <Document
      chunks={chunks}
      cssString={cssString}
      renderedAppString={renderedAppString}
      continuityScriptString={continuityScriptString}
    />
  ))

  process.stdout.cursorTo(45)
  process.stdout.clearLine(1)
  process.stdout.write(`rendering path ${routerPath} ${routeNumber + 1} / ${routerPaths.length}`)

  return `<!DOCTYPE html> ${documentString}`
}
