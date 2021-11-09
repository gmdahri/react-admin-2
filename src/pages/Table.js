import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {
  Input,
  // Avatar,
  Box,
  Button,
  Card,
  Container,
  FormHelperText,
  Grid,
  // MenuItem,
  TextField,
  Typography
} from '@material-ui/core';

const companySizeOptions = ['1-10', '11-30', '31-50', '50+'];

export const Table = () => {
  const formik = useFormik({
    initialValues: {
      companyName: 'ACME Corp LLC.',
      companySize: '1-10',
      banquetAddress: '',
      banquetName: '',
      banquetPrice: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string().max(255).required('Company name is required'),
      companySize: Yup
        .string()
        .max(255)
        .oneOf(companySizeOptions)
        .required('Company size is required'),
      // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      banquetAddress: Yup.string().max(255).required('Banquet Address is required'),
      banquetName: Yup.string().max(255).required('Full Name is required'),
      banquetPrice: Yup.string().max(255).required('Job name is required')
    }),
    onSubmit: async (values, helpers) => {
      axios.post('http://localhost:8080/banquet/addbanquet', values)
        .then((response) => {
          console.log('success', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
      try {
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>Add Banquet</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          pb: 3,
          pt: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            color="textPrimary"
            sx={{ mb: 3 }}
            variant="h4"
          >
            Enter A New Banquet.
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography
                color="textPrimary"
                variant="h6"
              >
                Banquet Details
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <Card
                variant="outlined"
                sx={{ p: 3 }}
              >
                <form onSubmit={formik.handleSubmit} enctyp="multipart/form-data">
                  <div>
                    {/* <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        pb: 3
                      }}
                    >
                      <Avatar
                        src=""
                        sx={{
                          height: 64,
                          mr: 2,
                          width: 64
                        }}
                      />
                    </Box> */}
                    <h3>Enter Required Data</h3>
                    <Grid
                      container
                      spacing={2}
                      sx={{ maxWidth: 420 }}
                    >
                      <Grid
                        item
                        xs={12}
                      >
                        <TextField
                          error={Boolean(formik.touched.banquetName && formik.errors.banquetName)}
                          fullWidth
                          helperText={formik.touched.banquetName && formik.errors.banquetName}
                          label="Banquet Name"
                          name="banquetName"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.banquetName}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                      >
                        <TextField
                          error={Boolean(formik.touched.banquetAddress
                            && formik.errors.banquetAddress)}
                          fullWidth
                          helperText={formik.touched.banquetAddress && formik.errors.banquetAddress}
                          label="Banquet Address"
                          name="banquetAddress"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          type="banquetAddress"
                          value={formik.values.banquetAddress}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                      >
                        <TextField
                          error={Boolean(formik.touched.banquetPrice && formik.errors.banquetPrice)}
                          fullWidth
                          helperText={formik.touched.banquetPrice && formik.errors.banquetPrice}
                          label="Price Per Booking"
                          name="banquetPrice"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.banquetPrice}
                          variant="outlined"
                        />
                      </Grid>
                      {/* <Grid
                        item
                        xs={12}
                      >
                        <TextField
                          error={Boolean(formik.touched.companySize && formik.errors.companySize)}
                          fullWidth
                          helperText={formik.touched.companySize && formik.errors.companySize}
                          label="Company size"
                          name="Number Of Banquets"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          select
                          value={formik.values.companySize}
                          variant="outlined"
                        >
                          {companySizeOptions.map((companySizeOption) => (
                            <MenuItem
                              key={companySizeOption}
                              value={companySizeOption}
                            >
                              {companySizeOption}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid> */}
                      {formik.errors.submit && (
                        <Grid
                          item
                          xs={12}
                        >
                          <FormHelperText error>
                            {formik.errors.submit}
                          </FormHelperText>
                        </Grid>
                      )}
                      <Grid
                        item
                        xs={12}
                      >
                        <h4>Insert Banquet Image</h4>
                        <Input
                          type="file"
                          name="banquetImage"
                        // onChange={handleChange('file')}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                      >
                        <Button
                          color="primary"
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Add Banquet
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
