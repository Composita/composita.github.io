import { default as React, Component } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface ComponentProps {}

interface ComponentState {}

class Navigation extends Component<RouteComponentProps<ComponentProps>, ComponentState> {
  render() {
    return (
      <div className="navigation">
        <nav>
          <div className="container">
            <Link to="/">
              Composita
            </Link>
            <div id="navbarResponsive">
              <ul>
                <li>
                  <Link to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/play">
                    Playground
                  </Link>
                </li>
                <li>
                  <Link to="/dev">
                    Developer Information
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navigation);
