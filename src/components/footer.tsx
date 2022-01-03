// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: React gets flagged with TS6133, temporary hack
import { default as React, Component } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

class Footer extends Component<RouteComponentProps> {
    render(): JSX.Element {
        const year = new Date().getFullYear();
        return (
            <div className="footer">
                <footer className="footer mt-auto py-3 bg-light">
                    <p className="text-center">
                        Copyright &copy; 2020-{year} Hansruedi Patzen, licensed under <Link to="/license">0BSD</Link>.
                    </p>
                </footer>
            </div>
        );
    }
}

export default withRouter(Footer);
