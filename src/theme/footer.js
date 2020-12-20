import React, { Component } from 'react';
import CopyRight from './copyRight';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="pull-right">
                    {/*EMT - Invertory Info*/}
        </div>
        <CopyRight/>
      </div>
    );
  }
}
