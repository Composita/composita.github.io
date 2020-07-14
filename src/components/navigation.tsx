import { default as React, Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Icon } from '../assets/svg/composita-icon';

interface ComponentState {
    navbarCollapsed: boolean;
}

class Navigation extends Component<RouteComponentProps, ComponentState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { navbarCollapsed: true };
    }

    private setActiveCSS(route: string): string {
        if (this.props.location.pathname === route) {
            return 'active';
        }
        return '';
    }

    private setSRCurrent(route: string): JSX.Element {
        return <span className="sr-only">{this.props.location.pathname === route ? '(current)' : ''}</span>;
    }

    private onNavbarCollaps: () => void = () => {
        console.log(this.state.navbarCollapsed);
        this.setState({ navbarCollapsed: !this.state.navbarCollapsed });
    };

    render(): JSX.Element {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <Icon width="40px" height="40px" />
                        </Link>
                        <Link className="navbar-brand" to="/">
                            Composita
                        </Link>
                        <button
                            className="navbar-toggler collapsed"
                            type="button"
                            onClick={this.onNavbarCollaps}
                            aria-expanded="true"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className={`${this.state.navbarCollapsed ? 'collapse' : ''} navbar-collapse`}
                            id="navbarItems"
                        >
                            <ul className="navbar-nav mr-auto">
                                <li className={`nav-item ${this.setActiveCSS('/')}`}>
                                    <Link className="nav-link" to="/">
                                        Home
                                        {this.setSRCurrent('/')}
                                    </Link>
                                </li>
                                <li className={`nav-item ${this.setActiveCSS('/play')}`}>
                                    <Link className="nav-link" to="/play">
                                        Playground
                                        {this.setSRCurrent('/play')}
                                    </Link>
                                </li>
                                <li className={`nav-item ${this.setActiveCSS('/dev')}`}>
                                    <Link className="nav-link" to="/dev">
                                        Developer
                                        {this.setSRCurrent('/dev')}
                                    </Link>
                                </li>
                                <li className={`nav-item ${this.setActiveCSS('/about')}`}>
                                    <Link className="nav-link" to="/about">
                                        About
                                        {this.setSRCurrent('/about')}
                                    </Link>
                                </li>
                            </ul>
                            <span className="navbar-text">Thinking Components.</span>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default withRouter(Navigation);
