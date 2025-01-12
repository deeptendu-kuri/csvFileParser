// import React, { useState, useEffect } from 'react';
// import { Container, Box, Typography, Grid, Paper, List, ListItem, ListItemText, AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Divider, Hidden } from '@mui/material';
// import { useSnackbar } from 'notistack';
// import { useNavigate } from 'react-router-dom';
// import { styled } from '@mui/system';
// import MenuIcon from '@mui/icons-material/Menu';

// // Styled components
// const VioletAppBar = styled(AppBar)({
//   backgroundColor: '#7a4fc5',
// });

// const VioletPaper = styled(Paper)({
//   backgroundColor: 'white',
//   borderColor: '#7a4fc5',
//   borderRadius: '16px',
// });

// const ProfessionalSidebar = styled(ListItemText)({
//   padding: '10px 15px',
//   '&:hover': {
//     backgroundColor: 'rgba(122, 79, 197, 0.1)',
//     borderRadius: '8px',
//   },
// });

// const ProfessionalInfoCard = styled(Paper)({
//   p: 2,
//   backgroundColor: 'white',
//   borderColor: '#7a4fc5',
//   border: '1px solid',
//   borderRadius: '8px',
//   textAlign: 'center',
// });

// const MainDashboard = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [dashboardData, setDashboardData] = useState({ files: [], lastUpdated: '', databaseCount: 0, totalFiles: 0, currentDateTime: '' });
//   const { enqueueSnackbar } = useSnackbar();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/files');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setDashboardData(data);
//       } catch (error) {
//         console.error('Error fetching files:', error);
//         enqueueSnackbar('Error fetching dashboard data: ' + error.message, { variant: 'error' });
//       }
//     };

//     fetchFiles();
//   }, [enqueueSnackbar]);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     enqueueSnackbar('Logged out successfully', { variant: 'success' });
//     navigate('/');
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '100vw', backgroundColor: '#D6EAF8' }}>
//       {/* Navbar */}
//       <VioletAppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
//             Dashboard
//           </Typography>
//           <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               onClick={handleClick}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               keepMounted
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <MenuItem onClick={() => { handleClose(); navigate('/account-settings'); }}>Account Settings</MenuItem>
//               <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
//             </Menu>
//           </Box>
//           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//             <Button color="inherit" onClick={() => navigate('/account-settings')} sx={{ color: 'white' }}>
//               Account Settings
//             </Button>
//             <Button color="inherit" onClick={handleLogout} sx={{ color: 'white' }}>
//               Logout
//             </Button>
//           </Box>
//         </Toolbar>
//       </VioletAppBar>

//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1, backgroundColor: '#D6EAF8', borderRadius: 2, p: 2 }}>
//         <Typography variant="h4" gutterBottom sx={{ color: '#7a4fc5' }}>
//           Dashboard
//         </Typography>
        
//         {/* Information Cards */}
//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           {['Current Time', 'Last Update', 'DB Count', 'Total Files'].map((title, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <ProfessionalInfoCard>
//                 <Typography component="h2" variant="subtitle2" color="#7a4fc5" gutterBottom>
//                   {title}
//                 </Typography>
//                 <Typography component="p" variant="caption">
//                   {index === 0 ? dashboardData.currentDateTime : 
//                    index === 1 ? dashboardData.lastUpdated : 
//                    index === 2 ? dashboardData.databaseCount : 
//                    dashboardData.totalFiles}
//                 </Typography>
//               </ProfessionalInfoCard>
//             </Grid>
//           ))}
//         </Grid>

//         <Grid container spacing={2}>
//           {/* Desktop Sidebar */}
//           <Grid item xs={12} sm={3}>
//             <VioletPaper sx={{ p: 2, mt: 1 }}>
//               <List>
//                 <ListItem button onClick={() => navigate('/dashboard')}>
//                   <ProfessionalSidebar primary={<Typography variant="subtitle1" sx={{ textDecoration: 'underline', color: '#7a4fc5' }}>Dashboard</Typography>} />
//                 </ListItem>
//                 <ListItem button onClick={() => navigate('/account-settings')}>
//                   <ProfessionalSidebar primary="Account Settings" />
//                 </ListItem>
//                 {/* Add more dashboard options if needed */}
//               </List>
//             </VioletPaper>
//           </Grid>

//           <Grid item xs={12} sm={9}>
//             <VioletPaper>
//               <Typography variant="h6" sx={{ p: 2 }}>Recent Items</Typography>
//               <List sx={{ maxHeight: 300, overflowY: 'auto', backgroundColor: 'white' }}>
//                 {/* Reverse the array before mapping */}
//                 {[...dashboardData.files].reverse().map((item, index) => (
//                   <ListItem key={index} divider>
//                   <ListItemText 
//                     primary={item.filename.split('_')[1]} // Extracts the date part
//                     secondary={`${item.filename}`} 
//                   />
//                   <Typography variant="body2" color="text.secondary">
//                     Row Count: {item.rowCount}
//                   </Typography>
//                 </ListItem>
//                 ))}
//               </List>
//             </VioletPaper>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default MainDashboard;

import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper, List, ListItem, ListItemText, AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Divider, Hidden } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';

// Styled components
const VioletAppBar = styled(AppBar)({
  backgroundColor: '#7a4fc5',
});

const VioletPaper = styled(Paper)({
  backgroundColor: 'white',
  borderColor: '#7a4fc5',
  borderRadius: '16px',
});

const ProfessionalInfoCard = styled(Paper)({
  p: 2,
  backgroundColor: 'white',
  borderColor: '#7a4fc5',
  border: '1px solid',
  borderRadius: '8px',
  textAlign: 'center',
});

const MainDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dashboardData, setDashboardData] = useState({ files: [], lastUpdated: '', databaseCount: 0, totalFiles: 0, currentDateTime: '' });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('http://localhost:5000/files');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching files:', error);
        enqueueSnackbar('Error fetching dashboard data: ' + error.message, { variant: 'error' });
      }
    };

    fetchFiles();
  }, [enqueueSnackbar]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    enqueueSnackbar('Logged out successfully', { variant: 'success' });
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '100vw', backgroundColor: '#D6EAF8' }}>
      {/* Navbar */}
      <VioletAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            Dashboard
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { handleClose(); navigate('/account-settings'); }}>Account Settings</MenuItem>
              <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" onClick={() => navigate('/account-settings')} sx={{ color: 'white' }}>
              Account Settings
            </Button>
            <Button color="inherit" onClick={handleLogout} sx={{ color: 'white' }}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </VioletAppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1, backgroundColor: '#D6EAF8', borderRadius: 2, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#7a4fc5' }}>
          Dashboard
        </Typography>
        
        {/* Information Cards */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {['Current Time', 'Last Update', 'DB Count', 'Total Files'].map((title, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProfessionalInfoCard>
                <Typography component="h2" variant="subtitle2" color="#7a4fc5" gutterBottom>
                  {title}
                </Typography>
                <Typography component="p" variant="caption">
                  {index === 0 ? dashboardData.currentDateTime : 
                   index === 1 ? dashboardData.lastUpdated : 
                   index === 2 ? dashboardData.databaseCount : 
                   dashboardData.totalFiles}
                </Typography>
              </ProfessionalInfoCard>
            </Grid>
          ))}
        </Grid>

        <Hidden mdDown>
          <Grid container spacing={2}>
            {/* Desktop Sidebar */}
            <Grid item xs={12} sm={3}>
              <VioletPaper sx={{ p: 2, mt: 1 }}>
                <List>
                  <ListItem button onClick={() => navigate('/dashboard')}>
                    <ListItemText primary={<Typography variant="subtitle1" sx={{ textDecoration: 'underline', color: '#7a4fc5' }}>Dashboard</Typography>} />
                  </ListItem>
                  <ListItem button onClick={() => navigate('/account-settings')}>
                    <ListItemText primary="Account Settings" />
                  </ListItem>
                  {/* Add more dashboard options if needed */}
                </List>
              </VioletPaper>
            </Grid>

            <Grid item xs={12} sm={9}>
              <VioletPaper>
                <Typography variant="h6" sx={{ p: 2 }}>Recent Items</Typography>
                <List sx={{ maxHeight: 300, overflowY: 'auto', backgroundColor: 'white' }}>
                  {/* Reverse the array before mapping */}
                  {[...dashboardData.files].reverse().map((item, index) => (
                    <ListItem key={index} divider>
                      <ListItemText 
                        primary={item.filename.split('_')[1]} // Extracts the date part
                        secondary={`${item.filename}`} 
                      />
                      <Typography variant="body2" color="text.secondary">
                        Row Count: {item.rowCount}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </VioletPaper>
            </Grid>
          </Grid>
        </Hidden>

        <Hidden mdUp>
          <Grid item xs={12}>
            <VioletPaper>
              <Typography variant="h6" sx={{ p: 2 }}>Recent Items</Typography>
              <List sx={{ maxHeight: 300, overflowY: 'auto', backgroundColor: 'white' }}>
                {/* Reverse the array before mapping */}
                {[...dashboardData.files].reverse().map((item, index) => (
                  <ListItem key={index} divider>
                    <ListItemText 
                      primary={item.filename.split('_')[1]} // Extracts the date part
                      secondary={`${item.filename}`} 
                    />
                    <Typography variant="body2" color="text.secondary">
                      Row Count: {item.rowCount}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </VioletPaper>
          </Grid>
        </Hidden>
      </Container>
    </Box>
  );
};

export default MainDashboard;