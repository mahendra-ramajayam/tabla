import ssn from 'superscript-number'

import data from './elementData'
import subshellOrder from './subshellOrder'

export class Element {
  constructor(atomicNumber, {name, symbol, atomicMass, electronicConfiguration, electronegativity, atomicRadius, oxidationStates, bondingType, meltingPoint, boilingPoint, density, groupBlock, namedBy, yearDiscovered, discoveredBy, summary}){
    this.atomicNumber = atomicNumber

    this.name = name
    this.symbol = symbol
    this.atomicMass = atomicMass
    this.electronicConfigurationRaw = electronicConfiguration
    this.electronegativity = electronegativity
    this.atomicRadius = atomicRadius
    this.oxidationStates = oxidationStates
    this.bondingType = bondingType
    this.meltingPoint = meltingPoint
    this.boilingPoint = boilingPoint
    this.density = density
    this.groupBlock = groupBlock
    this.namedBy = namedBy
    this.yearDiscovered = yearDiscovered
    this.discoveredBy = discoveredBy
    this.summary = summary
  }

  electronicConfiguration(expanded=true, format=true){
    const parts = this.electronicConfigurationRaw.reduce((list, part) => {
      if(typeof part === 'number'){
        const element = elements[part]
        if(expanded) return [...list, ...element.electronicConfiguration(true, false)]
        return [...list, element.symbol]
      }

      return [...list, part]
    }, [])

    return format ? parts.sort(
      ({shell: shellA, subshellType: subshellTypeA}, {shell: shellB, subshellType: subshellTypeB}) => {
        if(!shellA) return -1; if(!shellB) return 1

        const indexA = subshellOrder.indexOf(shellA + subshellTypeA)
        const indexB = subshellOrder.indexOf(shellB + subshellTypeB)
        console.log({indexA, indexB, a: shellA + subshellTypeA, b: shellB + subshellTypeB})
        return indexA - indexB
      })
      .map(part => typeof part === 'string' ? `[${part}]` : `${part.shell}${part.subshellType}${ssn(part.electrons)}`)
      .join(' ')
      : parts
  }
  electronicDiagram(){
    const parts = this.electronicConfigurationRaw.reduce((list, part) => typeof part === 'number' ? [...list, ...elements[part].electronicConfiguration(true, false)] : [...list, part], [])

    return parts.reduce((order, {shell, electrons}) => ({...order, [shell]: (order[shell] || 0) + electrons}), {})
  }
}

const elements = Object.entries(data).reduce((table, [atomicNumber, info]) => ({...table, [atomicNumber]: new Element(atomicNumber, info)}), {})
export default elements
