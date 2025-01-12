// import React, { useState, useEffect } from 'react';
// import { Container, Box, Typography, Grid, Paper, List, ListItem, ListItemText, Drawer, Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Divider, Hidden } from '@mui/material';
// import { useSnackbar } from 'notistack';
// import { useNavigate } from 'react-router-dom';
// import { styled } from '@mui/system';
// import MenuIcon from '@mui/icons-material/Menu';

// // Styled components
// const VioletAppBar = styled(AppBar)({
//   backgroundColor: '#7a4fc5',
// });

// const VioletPaper = styled(Paper)({
//   backgroundColor: 'white', // Changed to white for scrollbar and sidebar
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

// const AccountSettings = () => {
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
//         console.log('Dashboard Data:', data);
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
//     navigate('/login');
//   };

//   // Function to handle file download
//   const handleDownload = (filename) => {
//     // Construct the download URL using the filename from the file object
//     const downloadUrl = `http://localhost:5000/download/${filename}`;
    
//     // Use the fetch API to initiate the download
//     fetch(downloadUrl)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('File download failed');
//         }
//         return response.blob();
//       })
//       .then(blob => {
//         // Create a temporary URL for the blob
//         const url = window.URL.createObjectURL(blob);
//         // Create a temporary anchor element to trigger the download
//         const link = document.createElement('a');
//         link.href = url;
//         link.download = filename;
//         document.body.appendChild(link);
//         link.click();
//         // Clean up by revoking the blob URL and removing the link
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(link);
//       })
//       .catch(error => {
//         console.error('Error downloading file:', error);
//         enqueueSnackbar('Error downloading file: ' + error.message, { variant: 'error' });
//       });
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '100vw', backgroundColor: '#D6EAF8' }}>
//       {/* Navbar */}
//       <VioletAppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
//             Account Settings
//           </Typography>
//           <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               edge="end"
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
//               <MenuItem onClick={() => { handleClose(); navigate('/dashboard'); }}>Dashboard</MenuItem>
//               <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
//             </Menu>
//           </Box>
//           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
//             <Button color="inherit" onClick={() => navigate('/dashboard')} sx={{ color: 'white' }}>
//               Dashboard
//             </Button>
//             <Button color="inherit" onClick={handleLogout} sx={{ color: 'white' }}>
//               Logout
//             </Button>
//           </Box>
//         </Toolbar>
//       </VioletAppBar>

//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1, backgroundColor: '#D6EAF8', borderRadius: 2, p: 2 }}>
//         <Typography variant="h4" gutterBottom sx={{ color: '#7a4fc5' }}>
//           Account Settings
//         </Typography>
//         <Grid container spacing={2}>
//           {/* Desktop Sidebar */}
//           <Grid item xs={12} sm={3}>
//             <VioletPaper sx={{ p: 2, mt: 1 }}>
//               <List>
//                 <ListItem button onClick={() => navigate('/dashboard')}>
//                   <ProfessionalSidebar primary={<Typography variant="subtitle1" sx={{ textDecoration: 'underline', color: '#7a4fc5' }}>Database</Typography>} />
//                 </ListItem>
//                 <ListItem button>
//                   <ProfessionalSidebar primary="File Download" />
//                 </ListItem>
//                 <ListItem button>
//                   <ProfessionalSidebar primary="Reset Password" />
//                 </ListItem>
//                 {/* Add more settings options */}
//                 <Divider />
//                 <ListItem button>
//                   <ProfessionalSidebar primary="Other Settings" />
//                 </ListItem>
//               </List>
//             </VioletPaper>
//           </Grid>

//           <Grid item xs={12} sm={9}>
//             <VioletPaper>
//               <Typography variant="h6" sx={{ p: 2 }}>Files</Typography>
//               <List sx={{ maxHeight: 300, overflowY: 'auto', backgroundColor: 'white' }}>
//                 {/* Reverse the array and take only the first 5 items */}
//                 {[...dashboardData.files].reverse().slice(0, 5).map((file, index) => (
//                   <ListItem key={index} divider>
//                     <ListItemText primary={file.filename} />
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => handleDownload(file.filename)}>Download</Button>
//                       <Typography variant="body2">{file.rowCount} rows</Typography>
//                     </Box>
//                   </ListItem>
//                 ))}
//               </List>
//             </VioletPaper>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default AccountSettings;


import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper, List, ListItem, ListItemText, Drawer, Button, AppBar, Toolbar, IconButton, Menu, MenuItem, Divider, Hidden } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';

const VioletAppBar = styled(AppBar)({
  backgroundColor: '#7a4fc5',
});

const VioletPaper = styled(Paper)({
  backgroundColor: 'white', 
  borderColor: '#7a4fc5',
  borderRadius: '16px',
});

const AccountSettings = () => {
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
        console.log('Dashboard Data:', data);
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
    navigate('/login');
  };

  // Function to handle file download
  const handleDownload = (filename) => {
    const downloadUrl = `http://localhost:5000/download/${filename}`;
    
    fetch(downloadUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('File download failed');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
        enqueueSnackbar('Error downloading file: ' + error.message, { variant: 'error' });
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '100vw', backgroundColor: '#D6EAF8' }}>
      {/* Navbar */}
      <VioletAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            Account Settings
          </Typography>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              edge="end"
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
              <MenuItem onClick={() => { handleClose(); navigate('/dashboard'); }}>Dashboard</MenuItem>
              <MenuItem onClick={() => { handleClose(); handleLogout(); }}>Logout</MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" onClick={() => navigate('/dashboard')} sx={{ color: 'white' }}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout} sx={{ color: 'white' }}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </VioletAppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1, backgroundColor: '#D6EAF8', borderRadius: 2, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#7a4fc5' }}>
          Account Settings
        </Typography>

        <Hidden mdDown>
          <Grid container spacing={2}>
            {/* Desktop Sidebar */}
            <Grid item xs={12} sm={3}>
              <VioletPaper sx={{ p: 2, mt: 1 }}>
                <List>
                  <ListItem button onClick={() => navigate('/dashboard')}>
                    <ListItemText primary={<Typography variant="subtitle1" sx={{ textDecoration: 'underline', color: '#7a4fc5' }}>Database</Typography>} />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="File Download" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Reset Password" />
                  </ListItem>
                  {/* Add more settings options */}
                  <Divider />
                  <ListItem button>
                    <ListItemText primary="Other Settings" />
                  </ListItem>
                </List>
              </VioletPaper>
            </Grid>

            <Grid item xs={12} sm={9}>
              <VioletPaper>
                <Typography variant="h6" sx={{ p: 2 }}>Files</Typography>
                <List sx={{ maxHeight: 300, overflowY: 'auto', backgroundColor: 'white' }}>
                  {[...dashboardData.files].reverse().slice(0, 5).map((file, index) => (
                    <ListItem key={index} divider>
                      <ListItemText primary={file.filename} />
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => handleDownload(file.filename)}>Download</Button>
                        <Typography variant="body2">{file.rowCount} rows</Typography>
                      </Box>
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
              <Typography variant="h6" sx={{ p: 2 }}>Files</Typography>
              <List sx={{ maxHeight: 300, overflowY: 'auto', backgroundColor: 'white' }}>
                {[...dashboardData.files].reverse().slice(0, 5).map((file, index) => (
                  <ListItem key={index} divider>
                    <ListItemText primary={file.filename} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => handleDownload(file.filename)}>Download</Button>
                      <Typography variant="body2">{file.rowCount} rows</Typography>
                    </Box>
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

export default AccountSettings;