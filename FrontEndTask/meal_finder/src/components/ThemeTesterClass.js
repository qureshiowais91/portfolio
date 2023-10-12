import React, { Component } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

class ThemeTesterClass extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(context) => {
          const { isLightTheme, light, dark } = context;
          const theme = isLightTheme ? light : dark;
          const themeName = isLightTheme ? 'Light' : 'Dark';

          return (
            <div>
              <h1>Theme Tester</h1>
              <p>Current Theme:{themeName}</p>
              <p>Syntax Color: {theme.syntex}</p>
              <p>UI Color: {theme.ui}</p>
              <p>Background Color: {theme.bg}</p>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default ThemeTesterClass;
