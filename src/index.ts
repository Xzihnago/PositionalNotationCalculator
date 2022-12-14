import { parseFloat, complementBase, complementBaseM1 } from 'utils'

// HTML Elements
const content = document.getElementById('content')
const modeButtons = content?.children[0].children as HTMLCollectionOf<HTMLButtonElement>
const numberInputs = content?.children[1].children as HTMLCollectionOf<HTMLDivElement>
const blockOutput = content?.children[2].children as HTMLCollectionOf<HTMLElement>

// Input box
const inputBase = numberInputs[0].children[1] as HTMLInputElement
const inputDigit = numberInputs[1].children[1] as HTMLInputElement
const inputA = numberInputs[2].children[1] as HTMLInputElement
const inputB = numberInputs[3].children[1] as HTMLInputElement

// Output box
const outputMode = blockOutput[0] as HTMLElement
const outputBase = blockOutput[1] as HTMLElement
const outputDigit = blockOutput[2] as HTMLElement
const outputResult = blockOutput[3] as HTMLElement

let mode = 0
let base = 2
let digit = 4

const changeMode = (target: number) => {
  modeButtons[mode].classList.toggle('active')
  mode = target
  modeButtons[target].classList.toggle('active')
  outputMode.innerHTML = [ 'Sign and Magnitude', 'Base-1 Complement', 'Base Complement' ][target]

  if (!(mode === 0)) {
    inputA.value = inputA.value.replace('-', '')
    inputB.value = inputB.value.replace('-', '')
  }

  calculate()
}

const changeBase = (target: HTMLInputElement) => {
  base = Number(target.value)
  outputBase.innerHTML = `Base ${base}`
  inputA.value = ''
  inputB.value = ''
  calculate()
}

const changeDigit = (target: HTMLInputElement) => {
  digit = Number(target.value)
  outputDigit.innerHTML = `${digit} Digit`
  calculate()
}

const toUpper = (target: HTMLInputElement) => {
  const pos = target.selectionStart
  target.value = target.value.toUpperCase()
  target.setSelectionRange(pos, pos)
  calculate()
}

const checkInput = (event: KeyboardEvent) => {
  const target = event.target as HTMLInputElement

  // Check if input is single character
  if (event.key.length === 1) {
    // Check if input is valid
    if ((/[A-Za-z0-9]/).test(event.key)) {
      const keyCode = event.key.toUpperCase().charCodeAt(0)
      if ((keyCode < 48 + base && keyCode >= 48) || (base > 10 && keyCode >= 65 && keyCode < 65 + base - 10)) {
        return true
      }
    }

    // Check if input is decimal point
    else if (event.key === '.') {
      if (target.value.includes('.')) {
        const pos = (target.selectionStart || 0) + Number(target.value.indexOf('.') >= (target.selectionStart || 0)) - 1
        target.value = target.value.replace('.', '')
        target.setSelectionRange(pos, pos)
      }
      return true
    }

    // Convert negative sign to opposite sign
    else if (event.key === '+' && target.value.startsWith('-')) {
      const pos = (target.selectionStart || 1) - 1
      target.value = target.value.slice(1)
      target.setSelectionRange(pos, pos)
      calculate()
    }

    // Convert opposite sign to negative sign
    else if (mode === 0 && event.key === '-' && !target.value.startsWith('-')) {
      const pos = (target.selectionStart || 0) + 1
      target.value = `-${target.value}`
      target.setSelectionRange(pos, pos)
      calculate()
    }

    return false
  }

  // Allow any operater keys
  return true
}

const calculate = () => {
  // Log debug info
  const logDebugData = () => {
    console.log(
      '----------------------------- Data -----------------------------\n',
      'M B D       :', mode, base, digit,
      '\n',
      'Original    :', isNegativeA, stringA, isNegativeB, stringB,
      '\n',
      'Parsed      :', numberA.toFormatString(), numberB.toFormatString(),
      '\n',
      'ComplementM1:', complementBaseM1(numberA, base, digit).toFormatString(), complementBaseM1(numberB, base, digit).toFormatString(),
      '\n',
      'Complement  :', complementBase(numberA, base, digit).toFormatString().slice(-digit), complementBase(numberB, base, digit).toFormatString().slice(-digit),
      '\n----------------------------------------------------------------'
    )
  }

  // Sign and Magnitude: case 1
  const case1 = () => {
    console.log('case 1')

    sign = isNegativeA ? '-' : ''
    result = numberA + numberB
    if (result.toString(base).length > digit) isOverflow = true
  }

  // Sign and Magnitude: case 2
  const case2 = () => {
    console.log('case 2')

    let sum = 0
    if (isNegativeA) sum = numberA + complementBaseM1(numberB, base, digit)
    else sum = complementBaseM1(numberA, base, digit) + numberB

    const sumString = sum.toString(base)
    if (sumString.length > digit) {
      const res = parseFloat(sumString.slice(1), base)
      const eac = parseFloat(sumString[0])
      console.log('EAC:', res.toFormatString(), eac, (res + eac).toFormatString())

      sign = '-'
      result = res + eac
    }
    else {
      result = complementBaseM1(sum, base, digit)
    }
  }

  // Base-1 and Base Complement: case 3
  const case3 = () => {
    console.log('case 3')

    result = numberA + numberB
    if (result.toFormatString()[0] === '1') {
      isOverflow = true
    }
  }

  // Base-1 Complement: case 4
  const case4 = () => {
    console.log('case 4')

    const sum = numberA + numberB
    const sumString = sum.toString(base)
    const res = parseFloat(sumString.slice(1), base)
    const eac = parseFloat(sumString[0])
    console.log('EAC:', res.toFormatString(), eac, (res + eac).toFormatString())

    result = res + eac

    if (result.toFormatString()[0] === '0') {
      isOverflow = true
    }
  }

  // Base-1 Complement: case 5
  const case5 = () => {
    console.log('case 5')

    result = numberA + numberB
    const sumString = result.toString(base)

    if (sumString.length > digit) {
      const res = parseFloat(sumString.slice(1), base)
      const eac = parseFloat(sumString[0])
      console.log('EAC:', res.toFormatString(), eac, (res + eac).toFormatString())

      result = res + eac
    }
  }

  // Base Complement: case 6
  const case6 = () => {
    console.log('case 6')

    result = parseFloat((numberA + numberB).toString(base).slice(1), base)

    if (result.toFormatString()[0] === '0') {
      isOverflow = true
    }
  }

  // Base Complement: case 7
  const case7 = () => {
    console.log('case 7')

    result = numberA + numberB
    const sumString = result.toString(base)

    if (sumString.length > digit) {
      result = parseFloat(sumString.slice(1), base)
    }
  }


  const isNegativeA = inputA.value.startsWith('-')
  const isNegativeB = inputB.value.startsWith('-')
  const stringA = (isNegativeA ? inputA.value.slice(1) : inputA.value).padStart(digit, '0')
  const stringB = (isNegativeB ? inputB.value.slice(1) : inputB.value).padStart(digit, '0')

  // Check input length
  if (stringA.length - Number(stringA.includes('.')) > digit || stringB.length - Number(stringA.includes('.')) > digit) {
    outputResult.style.color = 'red'
    outputResult.innerHTML = 'Invalid input digit'
    return
  }

  const numberA = parseFloat(stringA, base)
  const numberB = parseFloat(stringB, base)
  logDebugData()

  let isOverflow = false
  let sign = ''
  let result = 0

  // Sign and Magnitude
  if (mode === 0) {
    if (isNegativeA === isNegativeB) case1() // If both sign is same
    else case2() // If both sign is different
  }
  else {
    // Check input most significant bit
    const baseM1 = (base - 1).toString(36).toUpperCase()
    if (![ '0', baseM1 ].includes(stringA[0]) || ![ '0', baseM1 ].includes(stringB[0])) {
      outputResult.style.color = 'red'
      outputResult.innerHTML = 'Invalid input MSB'
      return
    }

    // Base-1 Complement
    if (mode === 1) {
      if (stringA.startsWith('0') && stringB.startsWith('0')) case3() // If both sign is positive
      else if (stringA.startsWith(baseM1) && stringB.startsWith(baseM1)) case4() // If both sign is negative
      else case5() // If both sign is different
    }
    // Base Complement
    else if (mode === 2) {
      if (stringA.startsWith('0') && stringB.startsWith('0')) case3() // If both sign is positive
      else if (stringA.startsWith(baseM1) && stringB.startsWith(baseM1)) case6() // If both sign is negative
      else case7() // If both sign is different
    }
  }

  // Output
  if (isOverflow) {
    outputResult.style.color = 'red'
    outputResult.innerHTML = 'Overflow'
  }
  else {
    outputResult.style.color = 'lime'
    outputResult.innerHTML = `${sign}${result.toFormatString()}` || '&nbsp;'
  }
}

// Initialize
declare global {
  interface Window {
    changeMode: typeof changeMode;
    changeBase: typeof changeBase;
    changeDigit: typeof changeDigit;
    toUpper: typeof toUpper;
    checkInput: typeof checkInput;
    calculate: typeof calculate;
  }

  interface Number {
    toFormatString: () => string;
  }
}

// eslint-disable-next-line no-extend-native
Number.prototype.toFormatString = function() {
  const numString = this.toString(base)
  return numString.padStart(digit + Number(numString.includes('.')), '0').toUpperCase()
}

window.changeMode = changeMode
window.changeBase = changeBase
window.changeDigit = changeDigit
window.toUpper = toUpper
window.checkInput = checkInput
window.calculate = calculate

calculate()