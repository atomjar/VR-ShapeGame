import React from 'react';
import { AppRegistry, asset, Pano, Text, View, StyleSheet } from 'react-vr';
import Shape from './vr/components/shape';

class ShapeGame extends React.Component {
  constructor() {
    super();

    this.state = {
      gameShapes: [1, 1, 1, 1]
    }
  }
  render() {
    return (
      <View style={styles.game}>
        <Text style={styles.text}>Find the odd shape</Text>
        {
          this.state.gameShapes.map((shape, index) => {
            return (
              <View key={index}>
                <Shape
                  shapeNum={shape}
                  colorNum={index}
                  transform={[{translate: [(index - 1.5)*1.5, 0, -5]}]}
                />
              </View>
            )
          })
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  game: {
    transform: [
      {translate: [-2.25, 0, 0]}
    ]
  },
  text: {
    textAlign:'center',
    fontSize: 0.5,
    color: 'white',
    transform: [
      {translate: [0, 2, -5]}
    ]
  }
})

AppRegistry.registerComponent('ShapeGame', () => ShapeGame);

// <Pano source={asset('chess-world.jpg')}/>
