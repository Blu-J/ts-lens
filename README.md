# Lens
![Node.js CI](https://github.com/Blu-J/ts-lens/workflows/Node.js%20CI/badge.svg)

A lens is a getter/ setter for traversing a structure.
A lens is also composable with other lenses, allowing traversing via a object or using projections.
[functional-lenses](https://medium.com/@dtipson/functional-lenses-d1aba9e52254)

Realize that the only dependency is the Object.assign from es6

### Using

```ts
import { idLens } from 'ts-lens';

type MyShape = {
	a?:{
		b: {
			c: string
		}
	}
}

const withShape = idLens<MyShape>();

withShape.withAttrOr('a', { b: { c: ''}}).get({}) // ? { b: { c: ''}}
withShape.withAttrOr('a', { b: { c: ''}}).withAttr('b').withAttr('b').get({a:{
		b: {
			c: 'test
		}
	}}) // 'b'
```
