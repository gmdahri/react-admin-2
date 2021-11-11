import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Button, Card, Container, Divider, TablePagination, Typography } from '@material-ui/core';
import axios from 'axios';
import { OrdersFilter } from '../components/orders/orders-filter';
import { OrdersTable } from '../components/orders-table';
import { orders } from '../__mocks__/orders';

export const Orders = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8080/banquet/allBanquet')
      .then((response) => {
        setData(response);
        console.log('success', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);
  // console.log('orders', data);
  const [mode, setMode] = useState('table');
  const [query, setQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleModeChange = (event, newMode) => {
    if (newMode) {
      setMode(newMode);
    }
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Helmet>
        <title>Bookings</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          pb: 3,
          pt: 8
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              mb: 3
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Orders
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="primary"
              size="large"
              variant="contained"
            >
              Add
            </Button>
          </Box>
          <Card variant="outlined">
            <OrdersFilter
              mode={mode}
              onModeChange={handleModeChange}
              onQueryChange={handleQueryChange}
              query={query}
            />
            <Divider />
            <OrdersTable orders={data.data} />
            <Divider />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={orders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};
