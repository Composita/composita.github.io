import { default as React, Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

class Navigation extends Component<RouteComponentProps> {
    setActiveCSS(route: string): string {
        if (this.props.location.pathname === route) {
            return 'active';
        }
        return '';
    }

    setCurrentScreenreader(route: string): JSX.Element {
        return <span className="sr-only">{this.props.location.pathname === route ? '(current)' : ''}</span>;
    }

    render(): JSX.Element {
        return (
            <div className="navigation">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        Composita
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className={`nav-item ${this.setActiveCSS('/')}`}>
                                <Link className="nav-link" to="/">
                                    Home
                                    {this.setCurrentScreenreader('/')}
                                </Link>
                            </li>
                            <li className={`nav-item ${this.setActiveCSS('/play')}`}>
                                <Link className="nav-link" to="/play">
                                    Playground
                                    {this.setCurrentScreenreader('/play')}
                                </Link>
                            </li>
                            <li className={`nav-item ${this.setActiveCSS('/dev')}`}>
                                <Link className="nav-link" to="/dev">
                                    Developer
                                    {this.setCurrentScreenreader('/dev')}
                                </Link>
                            </li>
                            <li className={`nav-item ${this.setActiveCSS('/about')}`}>
                                <Link className="nav-link" to="/about">
                                    About
                                    {this.setCurrentScreenreader('/about')}
                                </Link>
                            </li>
                        </ul>
                        <span className="navbar-text">Thinking Components.</span>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(Navigation);
