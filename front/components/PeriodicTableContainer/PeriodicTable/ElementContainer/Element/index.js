import React from 'react'
import classnames from 'classnames'
import sigdig from 'sigdig'

import {element as elementStyle, selected as selectedStyle, symbol as symbolStyle, atomicMass as atomicMassStyle, atomicNumber as atomicNumberStyle, invisible,
  alkaliMetal, halogen, nonMetal, transitionMetal, nobleGas, postTransitionMetal, metalloid, alkalineEarthMetal, actinoid, lanthanoid, unknown
} from './style'

const groupColours = {
  alkaliMetal,
  halogen,
  nonMetal,
  transitionMetal,
  nobleGas,
  postTransitionMetal,
  metalloid,
  alkalineEarthMetal,
  actinoid,
  lanthanoid,
  unknown
}

const Element = ({element: {symbol, groupBlock, atomicMass, atomicNumber}, select, selected, visible}) => (
  <section className={classnames(elementStyle, {[selectedStyle]: selected, [invisible]: !visible}, groupColours[groupBlock] || unknown)} onClick={select}>
    <span className={atomicNumberStyle}>{atomicNumber}</span>
    <span className={symbolStyle}>{symbol}</span>
    <span className={atomicMassStyle}>{sigdig(atomicMass, 4)}</span>
  </section>
)

export default Element
