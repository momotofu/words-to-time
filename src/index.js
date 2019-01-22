const numbersDict = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90
}

const magnitudesDict = {
  hundred:      100,
  thousand:     1000,
  million:      1000000,
  billion:      1000000000,
  trillion:     1000000000000,
  quadrillion:  1000000000000000,
  quintillion:  1000000000000000000,
  sextillion:   1000000000000000000000,
  septillion:   1000000000000000000000000,
  octillion:    1000000000000000000000000000,
  nonillion:    1000000000000000000000000000000,
  decillion:    1000000000000000000000000000000000
}

const timeUnitsDict = {
  second: 1000,
  seconds: 1000,
  sec: 1000,
  s: 1000,
  minute: 60000,
  minutes: 60000,
  min: 60000,
  m: 60000,
  hour: 3600000,
  hours: 3600000,
  h: 3600000
}

const reduceListToTimeUnits = (
  list,
  timeUnitsDict,
  magnitudesDict,
  numbersDict ) => {

  let accumulator = 0

  for (let i = 0; i < list.length; i++) {
    const currentWord = list[i]

    switch (true) {
      case (!isNaN(Number(currentWord))):
        accumulator += Number(currentWord)
        break
      case (currentWord in numbersDict):
        accumulator += numbersDict[currentWord]
        break
      case (currentWord in magnitudesDict):
        accumulator *= magnitudesDict[currentWord]
        break
      case (currentWord in timeUnitsDict):
        accumulator *= timeUnitsDict[currentWord]
        // check if loop is on last iteration
        if (i === list.length - 1)
          return accumulator

        const nextList = list.slice(i + 1, list.length)

        // recurse through next section of time
        return accumulator + reduceListToTimeUnits(
          nextList,
          timeUnitsDict,
          magnitudesDict,
          numbersDict
        )
      default:
        return accumulator
    }
  }

    return accumulator < 1000 ? accumulator * 1000 : accumulator
}

const createMapTextToSeconds = (
  reducer,
  timeUntisDict,
  numbersDict,
  magnitudesDict ) => {

  return (inputString) => {
    const wordList = inputString.split(/(\s+|\d+|\w+)/).filter((word) => {
      return (word.match(/\s+/) === null ^ !Boolean(word)) === 1
    })
    return reducer(wordList, timeUnitsDict, magnitudesDict, numbersDict)
  }
}

exports.mapTextToSeconds = createMapTextToSeconds(
  reduceListToTimeUnits,
  timeUnitsDict,
  numbersDict,
  magnitudesDict
)
