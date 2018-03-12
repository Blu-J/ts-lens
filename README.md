# Lens

[![Build Status](https://travis-ci.org/Blu-J/ts-lens.svg?branch=master)](https://travis-ci.org/Blu-J/ts-lens)

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

withShape.withAttrOr('a', { b: { c: ''}}).get({})
```
