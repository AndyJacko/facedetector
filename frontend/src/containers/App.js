import React, {Component} from 'react';
import Particles from "react-tsparticles";
import FaceDetection from '../components/FaceDetection/FaceDetection';
import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import './App.css';


const particleOptions = {
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {        
        onHover: {
          enable: true,
          mode: "trail",
        },
        resize: true,
      },
      modes: {
        trail: {
          delay: 0.005,
          quantity: 2,
          particles: {
            color: {
              value: "#ff0000",
              animation: {
                enable: true,
                speed: 400,
                sync: true
              }
            },
            collisions: {
              enable: false
            },
            links: {
              enable: false
            },
            move: {
              outMode: "destroy",
              speed: 3
            },
            size: {
              value: 4,
              animation: {
                enable: true,
                speed: 3,
                minimumValue: 1,
                sync: true,
                startValue: "min",
                destroy: "max"
              }
            }
          }
        }
      },
      resize: true
    },
    particles: {
      color: {
        value: "random",
      },
      links: {
        color: "random",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 200,
        },
        value: 20,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 4,
      },
    },
    detectRetina: true,
  }

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (user) => {
    this.setState({user: {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }});
  }

  calculateFaceLocations = (data) => {
    const detectedFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);    
    const height = Number(image.height);
    return {
      leftCol: detectedFace.left_col * width,
      topRow: detectedFace.top_row * height,
      rightCol: width - (detectedFace.right_col * width),
      bottomRow: height - (detectedFace.bottom_row * height)
    }
  }

  displayFaceBoxes = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://salty-river-03186.herokuapp.com/imageapi', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })      
    }) 
    .then(response => response.json())   
    .then(response => {
      if (response) {
        fetch('https://salty-river-03186.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })      
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
        .catch(console.log)
      }
      this.displayFaceBoxes(this.calculateFaceLocations(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    route === 'home' ? this.setState({isSignedIn: true}) : this.setState(initialState);
    this.setState({route: route});
  }

  render () {
    const {isSignedIn,imageUrl,route, box} = this.state;
    return (
      <div className="App">
        <Particles id='tsparticles' className='particles' options={particleOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        <Logo />
        {route === 'home'
        ? <div>            
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit} />
            <FaceDetection imageUrl={imageUrl} box={box} /> 
          </div>        
        : (route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );  
  }
}

export default App;