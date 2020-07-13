import { default as React, Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/home';
import { About } from './components/about';
import { Playground } from './components/playground';
import { DevInfo } from './components/dev';
import { License } from './components/license';
import { default as Footer } from './components/footer';
import { default as Navigation } from './components/navigation';

export class App extends Component {
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
