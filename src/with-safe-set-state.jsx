import React, { Component } from 'react';

const withSafeSetState = WrappedComponent => {
  return class SafeSetState extends Component {
    componentWillUnmount() {
      this.child.setState = () => {};
    }
    render() {
      return <WrappedComponent ref={node => (this.child = node)} />;
    }
  };
};

export default withSafeSetState;
