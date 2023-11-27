import './App.css'
 
import React, { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that useEffect runs once after the initial render

  useEffect(() => {
    // Log the common names of the countries after the countries state is updated
    countries.forEach(country => {
      console.log('Common Name: ', country.name.common);
    });
  }, [countries]); // Runs whenever the countries state changes

  return (
    <div className="App">
      {/* Your component JSX */}
    </div>
  );
}


export default App
