import {connect} from "react-redux";
import React, {Component} from "react";
import WeatherInfoContainer from "./components/WeatherInfoContainer";

class App extends Component {
    render() {
        return (
            <WeatherInfoContainer store={this.props.store}/>
        );
    }
}

export default connect(state => ({store: state.weather}))(App);
