import React from 'react'
import renderer, { create } from 'react-test-renderer'
import Jest from './Jest'

test('teste',  () => {
    const tree = renderer.create(<Jest />).toJSON()
    expect(tree).toMatchSnapshot()
})