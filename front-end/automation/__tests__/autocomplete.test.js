// jest.dontMock('../src/build/autocomplete.js')
// jest.autoMockOff()

const scripts = [ {"name": "read"},
  {"name": "write"},
  {"name": "randRead"},
  {"name": "randWrite"}]

const TestUtils = require('react-dom/test-utils'),
  React = require('react'),
  ReactDOM = require('react-dom'),
  Autocomplete = require('../src/autocomplete.jsx'),
  fD = ReactDOM.findDOMNode

const autocomplete = TestUtils.renderIntoDocument(
  React.createElement(Autocomplete, {
    options: scripts,
    url: 'test'
  })
)
const optionName = TestUtils.findRenderedDOMComponentWithClass(autocomplete, 'option-name')

describe('Autocomplete', ()=>{
  it('have four initial options', ()=>{
    var options = TestUtils.scryRenderedDOMComponentsWithClass(autocomplete, 'option-list-item')
    expect(options.length).toBe(4)
  })
  it('change options based on the input', ()=>{
    expect(fD(optionName).value).toBe('')
    fD(optionName).value = 'r'
    TestUtils.Simulate.change(fD(optionName))
    expect(fD(optionName).value).toBe('r')
    options = TestUtils.scryRenderedDOMComponentsWithClass(autocomplete, 'option-list-item')
    expect(options.length).toBe(1)
    expect(fD(options[0]).textContent).toBe('#react')
  })
  it('offer to save option when there are no matches', ()=>{
    fD(optionName).value = 'ember'
    TestUtils.Simulate.change(fD(optionName))
    options = TestUtils.scryRenderedDOMComponentsWithClass(autocomplete, 'option-list-item')
    expect(options.length).toBe(0)
    var optionAdd = TestUtils.findRenderedDOMComponentWithClass(autocomplete, 'option-add')
    expect(fD(optionAdd).textContent).toBe('Add #ember')

  })
})
