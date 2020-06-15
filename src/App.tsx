import { default as React, Component } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";

interface State {
  outputText: string,
  runCode: boolean,
}

export default class App extends Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      runCode: false,
      outputText: `COMPONENT HelloWorld;
  BEGIN
    WRITE("Hello World"); WRITELINE;
END HelloWorld;`,
    }
  }

  runCode = () => {
    this.setState({runCode: true})
  }
  render() {
    return (
      <div>
        <div>
          <h1>Composita Language Playground</h1>
        </div>
        <CodeMirror
          value={this.state.outputText}
          options={{
            mode: 'javascript',
            lineNumbers: true,
          }}
          onChange={(editor, _data, value) => {
            const position = editor.getCursor();
            this.setState({
              runCode: false,
              outputText: value,
            });
            editor.setCursor(position.line, position.ch);
          }}
        />
        <button onClick={this.runCode}>run code</button>

        <div className="Output">
          <pre>{this.state.runCode && this.state.outputText}</pre>
        </div>
      </div>
    )
  }
}

