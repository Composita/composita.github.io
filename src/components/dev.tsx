import { default as React, Component } from 'react';

export class DevInfo extends Component {
    renderDev(): JSX.Element {
        return (
            <div>
                <p>Currently the source is only available through the npm registry.</p>
                <p>
                    The packages are published under the{' '}
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
