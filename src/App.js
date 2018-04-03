import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Route } from "react-router";
import { Link } from "react-router-dom";

class ComponentA extends Component {
  render() {
    const listeners = this.props.listeners || [];
    return (
      <div>
        <h1>Component A</h1>
        <ul>
          {listeners.map(listener => <li key={listener}>{listener}</li>)}
        </ul>
      </div>
    );
  }
}

class ComponentB extends Component {
  render() {
    const listeners = this.props.listeners || [];
    return (
      <div>
        <h1>Component B</h1>
        <ul>
          {listeners.map(listener => <li key={listener}>{listener}</li>)}
        </ul>
      </div>
    );
  }
}

const ConnectedComponentA = compose(
  firebaseConnect(['foo']),
  connect(
    ({ firebase }) => ({
      foo: firebase.data.foo,
      listeners: firebase.listeners.allIds
    })
  )
)(ComponentA);

const ConnectedComponentB = compose(
  firebaseConnect(['foo']),
  connect(
    ({ firebase }) => ({
      foo: firebase.data.foo,
      listeners: firebase.listeners.allIds
    })
  )
)(ComponentB);

class Main extends Component {
  render() {
    return (
      <div>
        <h1>click the link above</h1>
      </div>
    );
  }
}

const App = () => (
  <div>
    <header>
      <Link to="/a">ComponentA</Link>
      <Link to="/b">ComponentB</Link>
    </header>

    <main>
      <Route exact path="/" component={Main} />
      <Route path="/a" component={ConnectedComponentA} />
      <Route path="/b" component={ConnectedComponentB} />
    </main>
  </div>
);

export default App

