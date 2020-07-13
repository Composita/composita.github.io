import { default as React, Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

class Footer extends Component<RouteComponentProps> {
    render(): JSX.Element {
        return (
            <div className="footer">
                <footer className="footer mt-auto py-3 bg-light fixed-bottom">
                    <p className="text-center">
                        Copyright &copy; 2020 Hansruedi Patzen, licensed under <Link to="/license">0BSD</Link>.
                    </p>
                </footer>
            </div>
        );
    }
}

export default withRouter(Footer);
