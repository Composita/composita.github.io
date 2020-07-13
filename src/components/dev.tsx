import { default as React, Component } from 'react';

export class DevInfo extends Component {
    renderDev(): JSX.Element {
        return <div></div>;
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
