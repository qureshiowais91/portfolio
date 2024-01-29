import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
const dummyData = [
  { id: 1, url: 'https://example.com/page1', description: 'Page 1' },
  { id: 2, url: 'https://example.com/page2', description: 'Page 2' },
  { id: 3, url: 'https://example.com/page3', description: 'Page 3' },
  // Add more dummy data as needed
];

export const URLTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Long URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.url}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                <Button>
                  <DeleteIcon></DeleteIcon>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
