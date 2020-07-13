import { default as React, Component } from 'react';

export class About extends Component {
    renderAbout(): JSX.Element {
        return <div></div>;
    }

    render(): JSX.Element {
        return (
            <div className="container">
                <h3>About</h3>
                {this.renderAbout()}
            </div>
        );
    }
}
