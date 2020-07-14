import { default as React, Component } from 'react';

interface ComponentState {
    license: string | undefined;
    error: string | undefined;
}

export class License extends Component<unknown, ComponentState> {
    constructor(props: unknown) {
        super(props);
        this.state = { license: License.text, error: undefined };
    }

    private static text: string | undefined = undefined;

    async componentDidMount(): Promise<void> {
        if (License.text === undefined) {
            try {
                const response = await fetch('LICENSE.txt');
                License.text = await response.text();
            } catch (error) {
                console.error(error);
                this.setState({ license: undefined, error: error });
                return;
            }
        }
        this.setState({ license: License.text, error: undefined });
    }

    private renderLicense(): JSX.Element {
        if (this.state.error !== undefined) {
            return (
                <pre>
                    Failed to load license:
                    <br />
                    {this.state.error}
                </pre>
            );
        }
        if (this.state.license === undefined) {
            return <p>Loading license...</p>;
        }
        return <pre>{this.state.license}</pre>;
    }

    render(): JSX.Element {
        return (
            <div className="container">
                <h3>License</h3>
                {this.renderLicense()}
            </div>
        );
    }
}
