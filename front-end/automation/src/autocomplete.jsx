const React = require('react'),
  ReactDOM = require('react-dom'),
  request = require('axios')

const fD = ReactDOM.findDOMNode

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {options: this.props.options,
    }

  }

  componentDidMount() {
    if (this.props.url == 'test') return true
    request({url: this.props.url})
      .then(response=>response.data)
      .then(body => {
        if(!body){
          return console.error('Failed to load')
        }
      this.setState({options: body})
      })
      .catch(console.error)
  }

  render() {
    var scriptID = ''
    return (
    <div className='Button'>
      {this.state.options.map((e) => {
        return (
          <button id={e._id} key={e._id} onClick={
            function(){
              request
                .post('/scripts', {name: e._id})
            }
          }>{e.name}</button>
        )
      })}
    </div>

  )
  }
}

module.exports = Autocomplete
