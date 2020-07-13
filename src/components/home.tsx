import { default as React, Component } from 'react';

export class Home extends Component {
    renderHome(): JSX.Element {
        return <div></div>;
    }

    render(): JSX.Element {
        return (
            <div className="container">
                <h3>Welcome to the Composita Website</h3>
                {this.renderHome()}
            </div>
        );
    }
}
