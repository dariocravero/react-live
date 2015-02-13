var ReactLive = React.createClass({
  getInitialState: function() {
    return {
      editor: undefined
    }
  },
  compile: function() {
    // The "evil" call :)
    eval(JSXTransformer.transform(this.state.editor.getSession().getValue()).code)
  },
  render: function() {
    return (
      <div id='react-live'>
        <button id='compile' onClick={this.compile}>compile</button>
        <div id='editor'></div>
        <div id='el'>You can dump stuff on #el</div>
      </div>
    )
  },
  componentDidMount: function() {
    this.state.editor = ace.edit('editor')
    this.state.editor.setTheme('ace/theme/pastel_on_dark')
    this.state.editor.commands.addCommand({
      name: 'run',
      bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
      exec: function(editor) {
        this.compile()
      }
    })

    var session = this.state.editor.getSession()
    session.setTabSize(2)
    session.setMode('ace/mode/jsx')
    session.setValue(
      "var el   = document.getElementById('el')\n\n" +
      "var View = React.createClass({\n" +
      "  render: function() {\n" +
      "    return (\n" +
      "      <div>\n" +
      "      </div>\n" +
      "    )\n" +
      "  }\n" +
      "})\n\n" +
      "React.render(\n" +
      "  <View />,\n" +
      "  el\n" +
      ")"
    )
  }
})

React.render(
  <ReactLive />,
  document.getElementById('react-live-container')
)
