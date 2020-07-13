import { default as React, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from './components/home';
import { About } from './components/about';
import { Playground } from './components/playground';
import { DevInfo } from './components/dev';
import { Footer } from './components/footer';
import { default as Navigation } from './components/navigation';

export default class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/play" exact component={() => <Playground />} />
          <Route path="/dev" exact component={() => <DevInfo />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
      </Router>
      <Footer />
    </div>
    )
  }
}

