import { default as React, Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { System } from '@composita/system';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

interface ComponentState {
    code: string;
    runCode: boolean;
}

const startCode = `COMPONENT HelloWorld;
  BEGIN
    WRITE("Hello World"); WRITELINE;
END HelloWorld;`;

export class Playground extends Component<unknown, ComponentState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            runCode: false,
            code: Playground.lastCode,
        };
    }

    static lastCode = startCode;

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

    resetCode: () => Promise<void> = async () => {
        Playground.lastCode = startCode;
        this.setState({ code: Playground.lastCode, runCode: false });
    };

    renderPlayground(): JSX.Element {
        return (
            <div>
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
                        Playground.lastCode = value;
                        editor.setCursor(position.line, position.ch);
                    }}
                />
                <button onClick={this.runCode}>Run</button>
                <button onClick={this.resetCode}>Reset</button>
                <div className="output">
                    <pre>{this.state.runCode && this.output}</pre>
                </div>
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div className="container">
                <h3>Composita Language Playground</h3>
                {this.renderPlayground()}{' '}
            </div>
        );
    }
}
