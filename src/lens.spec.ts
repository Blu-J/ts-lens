import { idLens } from './lens'

describe('with deep lens and object', () => {
  const testObj = {
    a: {
      b: {
        c: 'd',
      },
    },
  }
  const testLens = idLens<typeof testObj>()
  const deepLens = testLens
    .thenKey('a')
    .thenKey('b')
    .thenKey('c')

  test('get a value deep', () => {
    expect(deepLens.get(testObj)).toBe('d')
  })

  test('set a value deeply without changing everything', () => {
    expect(deepLens.set('d1')(testObj)).toEqual({
      a: {
        b: {
          c: 'd1',
        },
      },
    })

    expect(testObj).toEqual({
      a: {
        b: {
          c: 'd',
        },
      },
    })
  })
})

describe('with array', () => {
  const testObj = [0, 1]
  const testLens = idLens<typeof testObj>()
  const deepLens = testLens.thenKey('length')

  test('get a length from list', () => {
    expect(deepLens.get(testObj)).toBe(2)
  })
})
describe('with deep lens and object broken', () => {
  const testObj = {}
  const testLens = idLens<{
    a: {
      b: {
        c: string
      }
    }
  }>()
  const deepLens = testLens
    .thenKey('a')
    .thenKey('b')
    .thenKey('c')

  test('get a value deep', () => {
    expect(deepLens.get(testObj as any)).toBe(undefined)
  })
})
