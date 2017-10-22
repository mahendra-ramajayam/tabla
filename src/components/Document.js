import React from 'react'

export default ({styleTagString, renderedAppString, stateScriptString, chunks}) => (
  <html lang="en">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>Tabla</title>
    <p dangerouslySetInnerHTML={{__html: styleTagString}} />
    <section id="app" dangerouslySetInnerHTML={{__html: renderedAppString}} />
    <script dangerouslySetInnerHTML={{__html: stateScriptString}} />
    {Object.values(chunks).map(({entry}) => <script src={entry} />)}
  </html>
)
