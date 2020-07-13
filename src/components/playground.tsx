import { default as React, Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { System } from '@composita/system';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

interface State {
    code: string;
    runCode: boolean;
}

export class Playground extends Component<unknown, State> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            runCode: false,
            code: `COMPONENT HelloWorld;
  BEGIN
    WRITE("Hello World"); WRITELINE;
END HelloWorld;`,
        };
    }

    private output = '';

    private readonly system = new System((...msgs: Array<string>) =>
        msgs.forEach((msg) => {
            console.log(msg);
            this.output = this.output + msg;
        }),
    );

    runCode: () => Promise<void> = async () => {
        this.output = '';
        await this.system.run('', this.state.code);
        this.setState({ runCode: true });
    };

    render(): JSX.Element {
        return (
            <div>
                <div>
                    <h1>Composita Language Playground</h1>
                </div>
                <CodeMirror
                    value={this.state.code}
                    options={{
                        mode: 'javascript',
                        lineNumbers: true,
                    }}
                    onChange={(editor, _data, value) => {
                        const position = editor.getCursor();
                        this.setState({
                            runCode: true,
                            code: value,
                        });
                        editor.setCursor(position.line, position.ch);
                    }}
                />
                <button onClick={this.runCode}>run code</button>

                <div className="Output">
                    <pre>{this.state.runCode && this.output}</pre>
                </div>
            </div>
        );
    }
}
