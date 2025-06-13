import { React, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router"
import { Box, Container, Grid,TextField, InputAdornment,Button,Paper } from '@mui/material';
import Lock from '@mui/icons-material/Lock';
import Icon from '../../Assets/albertsons-logo.png';
import { UserContext } from "../../components/UserContext";
// const useAuth = () => {
//   const { userValue } = useContext(UserContext);
//   if (userValue === process.env.REACT_APP_ADMINPSD){
//       return true;
//   }
// };
const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUserValue } = useContext(UserContext);
   
    const [ userPSD, setUserPSD ] = useState('');    
    
    return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ 
        direction: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        boxShadow: 3
        }} 
      style={{ 
        padding: "30px", 
        height: '54vh'
      }}>
        
        <Box display="flex" flexDirection="row" marginLeft="10%">
          <Box display="flex">
            <img src={Icon} alt="Logo" height="100px" />
          </Box>
          <Box fontSize={30} fontWeight={600} display="flex" paddingTop="32.5px">
            SIGN IN
          </Box>
        </Box>

        <form onSubmit={(e) => {e.preventDefault(); setUserValue(userPSD); if(location.state?.from){navigate(location.state.from)}}}>
          <Grid 
              container
              direction="row"
              justify="center"
              alignItems="center"
          >
            <Grid item xs={9} sx={{marginLeft:"12%"}}>
              <TextField
              autoFocus
              onChange={(e) => setUserPSD(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="username-password"
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock color="disabled" /></InputAdornment>,
              }}
              />
            </Grid>
              
            <Grid item xs={9} mt={2} sx={{marginLeft:"12%", marginTop: "6%"}}>
              <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              m={2}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      </Container>
    );
};

export default Login;