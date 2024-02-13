import React, { useEffect, useState } from 'react';
import { API } from '../../API';

export const RedirectComponent = () => {
  const [longURL, setLongURL] = useState('');

  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get('short');

  useEffect(() => {
    const redirection = async () => {
      try {
        const response = await fetch(`${API.URL_URL}/click?urlId=${paramValue}`);
        const data = await response.json();
        const longURL = data.urlClickedEvent.eventData.URLData.longURL;
        setLongURL(longURL);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (paramValue) {
      redirection();
    }
  }, [paramValue]);

  useEffect(() => {
    if (longURL) {
      window.location.href = longURL;
    }
  }, [longURL]);

  return (
    <div>
      <h1>Redirecting: {longURL}</h1>
    </div>
  );
};
