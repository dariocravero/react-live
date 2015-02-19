/*eslint-disable no-eval*/
/*global ace, BabelTransform, React*/

const SAMPLE_CODE = `let el = document.getElementById('el');

let View = React.createClass({
  render: function() {
    return (
      <div>
        You can dump stuff on #el
      </div>
    );
  }
})

React.render(
  <View />,
  el
);`;

let ReactLive = React.createClass({
  getInitialState: function() {
    return {
      editor: undefined
    };
  },
  compile: function() {
    // The 'evil' call :)
    eval(BabelTransform.transform(this.state.editor.getSession().getValue()).code);
  },
  render: function() {
    return (
      <div id='react-live'>
        <button id='compile' onClick={this.compile}>compile</button>
        <div id='editor'></div>
        <div id='el'>You can dump stuff on #el</div>
      </div>
    );
  },
  componentDidMount: function() {
    this.state.editor = ace.edit('editor');
    this.state.editor.setTheme('ace/theme/pastel_on_dark');

    let session = this.state.editor.getSession();
    session.setTabSize(2);
    session.setMode('ace/mode/jsx');
    session.setValue(SAMPLE_CODE);
  }
});

React.render(
  <ReactLive />,
  document.getElementById('react-live-container')
);
