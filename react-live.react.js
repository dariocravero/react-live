/*eslint-disable no-eval*/
/*global ace, BabelTransform, React*/

const SAMPLE_CODE = `let el = document.getElementById('el')

class View extends React.Component {
  render() {
    return (
      <div>
        You can dump stuff on #el
      </div>
    )
  }
}

React.render(
  <View />,
  el
)`

class ReactLive extends React.Component {
  constructor(props){
    super(props)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      editor: undefined
    }
  }

  compile() {
    // The 'evil' call :)
    eval(BabelTransform.transform(this.state.editor.getSession().getValue()).code)
  }

  render() {
    return (
      <div id='react-live'>
        <button id='compile' onClick={this.compile.bind(this)}>compile</button>
        <div id='editor'></div>
        <div id='el'>You can dump stuff on #el</div>
      </div>
    )
  }

  componentDidMount() {
    this.state.editor = ace.edit('editor')
    this.state.editor.setTheme('ace/theme/pastel_on_dark')

    let session = this.state.editor.getSession()
    session.setTabSize(2)
    session.setMode('ace/mode/jsx')
    session.setValue(SAMPLE_CODE)
  }
}

React.render(
  <ReactLive />,
  document.getElementById('react-live-container')
)
