import React, { Component } from 'react';

const withSafeSetState = WrappedComponent => {
  return class SafeSetState extends Component {
    componentWillUnmount() {
      this.child.setState = () => {};
    }
    saveRef = node => {
      this.child = node;
    }
    render() {
      return <WrappedComponent ref={this.saveRef} />;
    }
  };
};

export default withSafeSetState;
