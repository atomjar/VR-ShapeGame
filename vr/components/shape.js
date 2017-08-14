import React from 'react';
import { Box, Sphere, Cylinder } from 'react-vr';

const shapes = [Box, Sphere, Cylinder];

export default class Shape extends React.Component {
  render() {
    let Component = shapes[this.props.shapeNum];
    let colors = ['red', 'orange', 'blue', 'lime'];

    return (
      <Component
        style={{
          color: colors[this.props.colorNum],
          transform: this.props.transform
        }}
      />
    )
  }
};
