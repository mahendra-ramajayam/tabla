import React from 'react'

import Group from './Group'
import ElementContainer from './ElementContainer'
import Spacer from './Spacer'

import {periodicTable} from './style'

import layout from './layout'

const PeriodicTable = ({visibleElements}) => {
  const groups =
    layout.map((group, groupIndex) =>
      <Group key={`group-${groupIndex}`}>
        {group.map((part, partIndex) => (
          part
          ? <ElementContainer key={part} atomicNumber={part} visible={visibleElements.includes(part)} />
          : <Spacer key={`spacer-${partIndex}`} />
        ))}
      </Group>)
  return <section className={periodicTable}>{groups}</section>
}

export default PeriodicTable
