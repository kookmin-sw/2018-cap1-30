const React = require('react')
const ReactDOM = require('react-dom')

const Autocomplete = require('./autocomplete.jsx')
const {scripts, url} = window.__autocomplete_data

ReactDOM.render(<Autocomplete
    options={scripts}
    url={url}/>,
  document.getElementById('autocomplete')
)
