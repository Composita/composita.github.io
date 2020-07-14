import { default as React, Component, ChangeEvent } from 'react';
import { System } from '@composita/system';

import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

import { CodeSamples } from '../assets/code-samples/examples';

interface ComponentState {
    code: string;
    runCode: boolean;
    selectedSample: string;
    runningCode: boolean;
}

export class Playground extends Component<unknown, ComponentState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            runCode: false,
            code: Playground.lastCode,
            selectedSample: Playground.defaultSelection,
            runningCode: false,
        };
    }

    private static readonly defaultSelection = 'HelloWorld.Com';
    private static readonly samples = new CodeSamples();

    static lastCode: string = Playground.samples.getSamples().get(Playground.defaultSelection) ?? '';

    private output = '';

    private readonly system = new System((...msgs: Array<string>) =>
        msgs.forEach((msg) => {
            this.output = this.output + msg;
        }),
    );

    updateCode(): void {
        this.setState({ code: Playground.lastCode, runCode: false });
    }

    runCode: () => Promise<void> = async () => {
        this.setState({ runningCode: true });
        await this.system.run('', this.state.code);
        this.setState({ runCode: true, runningCode: false });
    };

    cancelRunCode: () => void = () => {
        //await this.system.stop();
        this.output = '';
        this.setState({ runCode: false, runningCode: false });
    };

    updateDropdownSelection: (event: ChangeEvent<HTMLSelectElement>) => void = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        this.setState({ selectedSample: event.target.value });
    };

    renderDropdown(): JSX.Element {
        const samplesDropdown = new Array<JSX.Element>();
        for (const key of Playground.samples.getSamples().keys()) {
            samplesDropdown.push(<option data-tokens={`${key}`}>{key}</option>);
        }
        return (
            <div className="d-flex mr-2">
                <select className="ml-1 form-control" data-live-search="true" onChange={this.updateDropdownSelection}>
                    {samplesDropdown}
                </select>
                <button type="button" className="btn btn-info ml-1" onClick={this.loadSample}>
                    Load
                </button>
            </div>
        );
    }

    loadSample: () => void = () => {
        Playground.lastCode = Playground.samples.getSamples().get(this.state.selectedSample) ?? Playground.lastCode;
        this.updateCode();
    };

    clearOutput: () => void = () => {
        this.output = '';
        this.setState({ runCode: false });
    };

    renderRunCancelButton(cssClass: string, text: string, fn: () => void): JSX.Element {
        return (
            <button type="button" className={`btn btn-${cssClass}`} onClick={fn.bind(this)}>
                {text}
            </button>
        );
    }

    renderPlayground(): JSX.Element {
        return (
            <div>
                <div className="mb-1 pb-1">
                    <CodeMirror
                        value={this.state.code}
                        options={{
                            mode: 'javascript',
                            lineNumbers: true,
                            viewportMargin: Infinity,
                        }}
                        onChange={(editor, _data, value) => {
                            const position = editor.getCursor();
                            this.setState({
                                code: value,
                            });
                            Playground.lastCode = value;
                            editor.setCursor(position.line, position.ch);
                        }}
                    />
                    <div className="d-flex justify-content-between">
                        <div>
                            {this.state.runningCode
                                ? this.renderRunCancelButton('danger', 'Cancel', this.cancelRunCode)
                                : this.renderRunCancelButton('success', 'Run', this.runCode)}
                            <button type="button" className="btn btn-secondary ml-1" onClick={this.clearOutput}>
                                Clear Output
                            </button>
                        </div>
                        {this.renderDropdown()}
                    </div>
                </div>
                <div className="pt-3">
                    <p>Output:</p>
                    {this.state.runCode ? (
                        <div className="border">
                            <pre className="pre-scrollable m-1">{this.output}</pre>
                        </div>
                    ) : (
                        <div></div>
                    )}
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
