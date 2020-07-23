import { default as React, Component, ChangeEvent } from 'react';
import { Optional } from '@composita/ts-utility-types';

import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

import { CodeSamples } from '../assets/code-samples/examples';

import { default as CompositaSystem } from '../workers/system.worker';

interface ComponentState {
    code: string;
    runCode: boolean;
    output: string;
    selectedSample: string;
    runningCode: boolean;
}

export class Playground extends Component<unknown, ComponentState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            runCode: false,
            code: Playground.lastCode,
            output: '',
            selectedSample: Playground.defaultSelection,
            runningCode: false,
        };
    }

    private static readonly defaultSelection = 'HelloWorld.Com';
    private static readonly samples = new CodeSamples();
    private runner: Optional<Worker> = undefined;

    private static lastCode: string = Playground.samples.getSamples().get(Playground.defaultSelection) ?? '';

    private updateOutput(msg: string): void {
        if (msg === undefined) {
            return;
        }
        this.setState({ output: this.state.output + msg });
    }

    private updateCode(): void {
        this.setState({ code: Playground.lastCode, runCode: true });
    }

    private runCode: () => Promise<void> = async () => {
        this.setState({ runningCode: true });
        this.runner?.postMessage({ fn: 'run', uri: this.state.selectedSample, code: this.state.code });
        this.setState({ runCode: true });
    };

    private cancelRunCode: () => Promise<void> = async () => {
        this.runner?.postMessage({ fn: 'stop' });
        this.setState({ runCode: true });
    };

    private updateDropdownSelection: (event: ChangeEvent<HTMLSelectElement>) => void = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        this.setState({ selectedSample: event.target.value });
    };

    private renderDropdown(): JSX.Element {
        const samplesDropdown = new Array<JSX.Element>();
        for (const key of Playground.samples.getSamples().keys()) {
            samplesDropdown.push(<option data-tokens={`${key}`}>{key}</option>);
        }
        return (
            <div className="d-flex mr-2">
                <select className="form-control pt-1" data-live-search="true" onChange={this.updateDropdownSelection}>
                    {samplesDropdown}
                </select>
                <button type="button" className="btn btn-info mr-1 pt-1" onClick={this.loadSample}>
                    Load
                </button>
            </div>
        );
    }

    private loadSample: () => void = () => {
        Playground.lastCode = Playground.samples.getSamples().get(this.state.selectedSample) ?? Playground.lastCode;
        this.updateCode();
    };

    private clearOutput: () => void = () => {
        this.setState({ output: '', runCode: false });
    };

    private renderRunCancelButton(cssClass: string, text: string, fn: () => void): JSX.Element {
        return (
            <button type="button" className={`btn btn-${cssClass} pt-1 mr-1`} onClick={fn.bind(this)}>
                {text}
            </button>
        );
    }

    componentDidMount(): void {
        this.runner = CompositaSystem;
        this.runner.addEventListener('message', (event: { data: { output: string; running: boolean } }) => {
            this.updateOutput(event.data.output);
            this.setState({ runningCode: event.data.running });
        });
    }

    componentWillUnmount(): void {
        this.runner?.postMessage({ fn: 'stop', uri: '', code: '' });
        this.runner?.terminate();
    }

    private renderPlayground(): JSX.Element {
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
                    <div className="d-flex justify-content-between pt-1">
                        <div>
                            {this.state.runningCode
                                ? this.renderRunCancelButton('danger', 'Cancel', this.cancelRunCode)
                                : this.renderRunCancelButton('success', 'Run', this.runCode)}
                            <button type="button" className="btn btn-secondary pt-1" onClick={this.clearOutput}>
                                Clear Output
                            </button>
                        </div>
                        {this.renderDropdown()}
                    </div>
                </div>
                <div className="pt-3">
                    <div>Output:</div>
                    {this.state.runCode ? (
                        <div className="border">
                            <pre className="pre-scrollable pt-1 m-1">{this.state.output}</pre>
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
                {this.renderPlayground()}
            </div>
        );
    }
}
