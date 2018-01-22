# React with safe setState higher order component

> Reactjs higher order component to easily avoid the unsafe setState

## Install

```
$ npm install with-safe-set-state
```

## Usage

### Box.jsx

```js
import React, { Component } from 'react';
import { withSafeSetState } from 'with-safe-set-state';

class Box extends Component {
  constructor() {
    super();
    this.state = { info: 'Default' };
  }
  _onClick() {
    setTimeout(() => {
      this.setState(_ => ({
        info: 'OK'
      }));
    }, 1000);
  }
  render() {
    return <button onClick={this._onClick.bind(this)}>Click</button>;
  }
}

export default withSafeSetState(Box);
```

## License

MIT © Whien
