import { default as React, Component } from 'react';

interface ComponentState {
    license: string | undefined;
}

export class License extends Component<unknown, ComponentState> {
    constructor(props: unknown) {
        super(props);
        this.state = { license: License.text };
    }

    private static text: string | undefined = undefined;

    async componentDidMount(): Promise<void> {
        if (License.text === undefined) {
            try {
                const response = await fetch('LICENSE.txt');
                License.text = await response.text();
            } catch (error) {
                console.error(error);
                return;
            }
        }
        this.setState({ license: License.text });
    }

    render(): JSX.Element {
        return (
            <div>{this.state.license === undefined ? <p>Loading license...</p> : <pre>{this.state.license}</pre>}</div>
        );
    }
}
