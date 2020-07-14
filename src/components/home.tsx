import { default as React, Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
    renderHome(): JSX.Element {
        return (
            <div>
                <p>This page will be the new home for the Composita language (at least for now).</p>
                <p>
                    Please check out the <Link to="/play">Playground</Link> if you want to try it out yourself.
                </p>
                <p>
                    If you want to check out the implementation itself please visit the <Link to="/dev">Developer</Link>{' '}
                    page for further information.
                </p>
                <p>
                    If you want to know more about the language and its history checkout <Link to="/about">About</Link>.
                </p>
            </div>
        );
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
