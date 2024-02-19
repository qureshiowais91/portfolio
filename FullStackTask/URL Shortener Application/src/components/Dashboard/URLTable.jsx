import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import { urlStore } from '../../app/store';
import { API } from '../../API';
import { getJWTToken } from '../../util/authUtils';

export const URLTable = () => {
  const { url, setUrl } = urlStore(); // Destructuring state and actions from urlStore

  useEffect(() => {
    (async () => {
      const token = getJWTToken();
      const response = await fetch(`${API.URL_URL}/getUrlList`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const obj = await response.json();
      setUrl(obj['UrlList']);
      console.log(obj['UrlList']);
    })();
  }, []);

  return (
    <TableContainer component={Paper}>
      {/* <h1>{url[0].longURL}</h1> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Long URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Clicked Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {url.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.longURL}</TableCell>
              <TableCell>{row.shortURL}</TableCell>
              <TableCell>{row.clickCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
