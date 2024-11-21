import React from 'react';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CustomFormHeading from '../components/customForms/CustomFormHeading';
import FormBoxMain from '../components/customForms/FormBoxMain';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';


const LoggedOutPage = () => {
 

  return (
    <>
    <Grid container flexDirection={"row"} justifyContent={"center"}>
        <Grid item xs={12} sm={6} md={4} lg={3} pt={6}>
          <CustomFormHeading title="" />
          <FormBoxMain>
            <form onSubmit="">
              <Grid item xs={12}>
                You are now logged out from the system.
              </Grid>
             
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                component={Link}
                to="/"
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<HomeIcon />}            
                >
                  Home Page
                </Button>
               
              </Grid>
            </form>
          </FormBoxMain>
        </Grid>
      </Grid>
   
    </>
  );
};

export default LoggedOutPage;
