import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// import { format } from 'date-fns';
import {
  // Box,
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  // Typography
} from '@material-ui/core';
import { Scrollbar } from './scrollbar';

const statusVariant = [
  {
    label: 'Placed',
    value: 'placed'
  },
  {
    label: 'Processed',
    value: 'processed'
  },
  {
    label: 'Delivered',
    value: 'delivered'
  },
  {
    label: 'Complete',
    value: 'complete'
  }
];

export const OrdersTable = (props) => {
  const { orders } = props;
  console.log('data', orders);

  // const renderTable = () => {
  //   return orders.map(user => {
  //     return (
  //       <tr>
  //         <td>{user.banquetName}</td>
  //         <td>{user.banquetAddress}</td>
  //         <td>{user.banquetPrice}</td>
  //         <td>{user.banquetImage}</td>
  //       </tr>
  //     )
  //   })
  // }

  return (
    <div>
      <Scrollbar>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                Number
              </TableCell>
              <TableCell>
                BanquetName
              </TableCell>
              <TableCell>
                BanquetPrice
              </TableCell>
              <TableCell>
                banquetAddress
              </TableCell>
              <TableCell>
                banquetImage
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders ? orders.map((user, index) => {
              if (user.banquetName === 'hi') console.log('hi');

              return (
                <TableRow>
                  <TableCell>
                    <Link
                      color="inherit"
                      component={RouterLink}
                      to="#"
                      underline="none"
                      variant="subtitle2"
                    >
                      {/* {`#${key}`} */}
                      {index}
                    </Link>
                  </TableCell>
                  {/* <TableCell>
                    <Box>
                      <Typography
                        color="inherit"
                        variant="inherit"
                      >
                        {format(new Date(order.createdAt), 'dd MMM yyyy')}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="inherit"
                      >
                        {format(new Date(order.createdAt), 'HH:mm')}
                      </Typography>
                    </Box>
                  </TableCell> */}

                  <TableCell>
                    {user.banquetName}
                  </TableCell>
                  <TableCell>
                    {user.banquetAddress}
                  </TableCell>
                  <TableCell>
                    {user.banquetPrice}
                  </TableCell>
                  <TableCell>
                    {user.banquetImage}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statusVariant.label}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              );
            }) : null}
          </TableBody>
        </Table>
        {/* <table id="users">
          <thead>
            <tr>
              <th>Banquet Name</th>
              <th>Banquet Address</th>
              <th>Banquet Price</th>
              <th>Banquet Image</th>
            </tr>
          </thead>
          {/* <tbody>{renderTable()}</tbody> }
          <tbody>
            {orders ? orders.map((user) => {
              if (user.banquetName === 'hi') console.log('hi');
              return (
                <tr>
                  <td>{user.banquetName}</td>
                  <td>{user.banquetAddress}</td>
                  <td>{user.banquetPrice}</td>
                  <td>{user.banquetImage}</td>
                </tr>
              );
            }) : null }
          </tbody>
        </table> */}
      </Scrollbar>
    </div>
  );
};

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired
};
