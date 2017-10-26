const a : string = '123'
const func =  (x: string, y: string) : void => {
  console.log(x)
  console.log(y)
}
let isDone: boolean = false
let name: string = 'hello'
name = '123'
let list: number[] = []
list = [111, 2, 3]

let list2: Array<number> = []
list2 = [1, 2, 3, 2]

let x: [string, number]
x = ['123', 123]
let y: [string, string, number, number]
y = ['123', '123', 123, 123]

console.log(y[1].substr(1))
console.log(y[5].toString())

// 枚举
enum color {
  red = 1,
  green,
  blue
}
console.log(color.red)
let c : color = color.red
c = color.blue

let noSure: any = 4
noSure.toFixed(2)

let noSure1: Object = 4
noSure1 = '1'

// 断言
let someVal: any = 'hello word'
let strL: number = (someVal as string).length
let serL2: number = someVal.length

// 接口
function funa (obj: { label: string }): void {
  console.log(obj.label)
}
let obj1 = {
  size: 10,
  label: '123'
}

interface labelValue {
  label: string
}
function printLabel(labelObj: labelValue) {
  console.log(labelObj.label)
}

interface SquareConfig {
  color?: string
  width?: number
  [prop: string]: any
}
function creatSquare (config: SquareConfig)
: {
  color: string
  area: number
} {
  let  newSquare = {
    color: 'white',
    area: 100
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  if (config.color) {
    newSquare.color = config.color
  }
  return newSquare
}
let aSquare = creatSquare({width: 100})
let bSquare = creatSquare({color: '#fff', width: 100})
let cSquare = creatSquare({colour: '#fff', width: 100, adf: '123'})

let suqareConfig1 = {
  color: '#fff',
  width: 100
}
let dSquare = creatSquare(suqareConfig1)
// 只读属性
interface Point {
  readonly x: number
  readonly y: number
}
let p1:Point = {
  x: 10,
  y: 12
}
// p1.x = 1

let ra: number[] = [1, 2, 4,3]
let ro: ReadonlyArray<number> = ra
// ro[0] = 12
// ra = ro

ra = ro as number[]

// 函数类型
;(_ => {
  interface SearchFunc {
    (source: string, subString: string): boolean
  }
  let mySearch: SearchFunc
  mySearch = function (source: string, subString: string): boolean {
    let result = source.search(subString)
    return result > -1
  }
  let mySearch2: SearchFunc
  mySearch2 = function (src: string, subStr: string): boolean {
    let r = src.search(subStr)
    return r > -1
  }
})()

;(_ => {
  interface StringArray {
    // [index: number]: string
    [x: number]: string
  }
  let myArray: StringArray
  myArray = ['a', 'b']
  let myStr = myArray[0]

  function a (sa: StringArray) {
    console.log(sa)
  }
  a(['123', '123'])
})()

;(_ => {
  class Animal {
    name: String
  }
  class Dog extends Animal {
    breed: string
  }
  interface NotOkay {
    // [x: number]: string
    // [y: string]: string
    // [x: string]: Animal
    [y: number]: Dog
  }
  let testNotOkay: NotOkay
  testNotOkay = [new Dog(), new Dog()]
  // testNotOkay = [new Animal(), new Dog()]
  testNotOkay[0]
  function a (test: NotOkay) {
    console.log(test)
  }
  a([new Dog()])
  interface NumberDic {
    [index: string]: number | undefined
    length: number
    name?: number
  }
  function b (test: NumberDic) {
    console.log(test)
    console.log(test[0])
    console.log(test.length)
    console.log(test.name)
  }
  b({length: 123})

})()

;(_ => {
  interface ClockInterface {
    cuurentTime: Date
    setTime(x: number, y: number): any
  }
  class clock implements ClockInterface {
    cuurentTime: Date
    setTime(x: number, y: number) {
      return 'a'
    }
    constructor(h: number, m: number) {
      console.log(h)
      console.log(m)
    }
  }
})()
export default a