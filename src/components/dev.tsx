import { default as React, Component } from 'react';

export class DevInfo extends Component {
    private renderDev(): JSX.Element {
        return (
            <div>
                <p>
                    All source code is published and freely available on{' '}
                    <a href="https://www.github.com/Composita">github.com/Composita</a>
                </p>
                <p>
                    The node packages are published under the{' '}
                    <a href="https://www.npmjs.com/org/composita">@composita organisation</a>
                </p>
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div className="container">
                <h3>Developer Information</h3>
                {this.renderDev()}
            </div>
        );
    }
}
