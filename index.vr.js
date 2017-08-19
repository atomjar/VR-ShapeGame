import React from 'react';
import { AppRegistry, asset, Pano, Text, View, StyleSheet, AsyncStorage } from 'react-vr';
import Shape, { shapes } from './vr/components/shape';

class ShapeGame extends React.Component {
  constructor() {
    super();

    this.state = {
      gameShapes: [1, 1, 1, 1],
      score: 0,
      specialIndex: 0
    }
  }

componentDidMount () {
  AsyncStorage.getItem('score')
    .then(value => {
      console.log('score is', value);
      this.setState({ score: value });
    })
  this.newGameSet();
}

pickShape(shapeIndex) {
  let score = this.state.score;
  score = this.state.specialIndex === shapeIndex ? score +1 : score -1;

  this.setState({ score: score });
  this.newGameSet();

  AsyncStorage.setItem('score', score);
}

newGameSet() {
  let baseShapeId = Math.floor(Math.random() * shapes.length);
  let specialShapeId = baseShapeId;

  while (specialShapeId === baseShapeId) {
    specialShapeId = Math.floor(Math.random() * shapes.length);
  }

  let newGameShapes = [];

  for (i = 0; i < this.state.gameShapes.length; i++) {
    newGameShapes[i] = baseShapeId;
  }

  let specialIndex = Math.floor(Math.random() * newGameShapes.length);
  newGameShapes[specialIndex] = specialShapeId;

  this.setState({
    gameShapes: newGameShapes,
    specialIndex: specialIndex
  });
}

  render() {
    return (
      <View style={styles.game}>
        <Text style={styles.text}>Find the shape that doesnt belong</Text>
        <Text style={styles.text}>{this.state.score}</Text>

        {
          this.state.gameShapes.map((shape, index) => {
            return (
              <View
                key={index}
                onEnter={ () => this.pickShape(index) }
              >
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
