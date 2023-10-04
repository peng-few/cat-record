/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import unitConverter from '../unitConverter'
 
describe('unitConverter', () => {
  it('convert heat to Percentage correctly', () => {
    expect(unitConverter.mgToPercentage(125,111.7)).toBe(0.14)
  })
  it('convert value to percentage correctly', () => {
    expect(unitConverter.toPercentage(12.25)).toBe(0.12)
  })
})