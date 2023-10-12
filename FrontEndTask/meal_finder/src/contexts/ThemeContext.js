import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  state = {
    isLightTheme: true,
    light: { syntex: '#555', ui: '#ddd', bg: '#eee' },
    dark: { syntex: '#ddd', ui: '#333', bg: '#555' },
  };
  toggleTheme = () => {
    console.log(this.state.isLightTheme)
    this.setState({ isLightTheme: !this.state.isLightTheme });
  };
  render() {
    return (
      <ThemeContext.Provider value={{ ...this.state,toggleTheme:this.toggleTheme}}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContextProvider;
