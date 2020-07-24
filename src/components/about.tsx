import { default as React, Component } from 'react';

export class About extends Component {
    private renderAbout(): JSX.Element {
        return (
            <div>
                <p>Thank you for checking out the Composita language.</p>
                <p>This site was created as part of my master thesis and is still a work in progress.</p>
                <p>
                    If you want to know more about the Composita ystem and languge feel free to check out any of the
                    following links:
                    <ul>
                        <li>
                            <a href="https://concurrency.ch/Research/Composita">HSR Concurrency Lab (Composita)</a>
                        </li>
                        <li>
                            <a href="http://www.composita.net/">The original Composita website</a>
                        </li>
                        <li>
                            <a href="https://github.com/Composita/original">
                                Github repository containing code examples and the Composita EBNF
                            </a>
                        </li>
                    </ul>
                </p>
                <p>Cheers and have a great day</p>
                <p>Hansruedi</p>
            </div>
        );
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
