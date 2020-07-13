import { default as React, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { About } from './about';
import { Playground } from './playground';
import { DevInfo } from './dev';
import { License } from './license';
import { default as Footer } from './footer';
import { default as Navigation } from './navigation';

export class Index extends Component {
    render(): JSX.Element {
        return (
            <div className="App">
                <Router>
                    <Navigation />
                    <Switch>
                        <Route path="/" exact component={() => <Home />} />
                        <Route path="/play" exact component={() => <Playground />} />
                        <Route path="/dev" exact component={() => <DevInfo />} />
                        <Route path="/about" exact component={() => <About />} />
                        <Route path="/license" exact component={() => <License />} />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}
