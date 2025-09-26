import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import ForumIcon from '@mui/icons-material/Forum';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import RouteIcon from '@mui/icons-material/Route';
import BarChartIcon from '@mui/icons-material/BarChart';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const drawerWidth = 240;

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const isTeacher = currentUser?.role === 'teacher';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigateTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  // Menus diferentes para professor e aluno
  const teacherMenuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/teacher' },
    { text: 'Gerenciar Cursos', icon: <SchoolIcon />, path: '/teacher/courses' },
    { text: 'Criar Atividades', icon: <AssignmentIcon />, path: '/teacher/activities/create' },
    { text: 'Biblioteca Digital', icon: <BookIcon />, path: '/teacher/library' },
  ];

  const studentMenuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/student' },
    { text: 'Meus Cursos', icon: <SchoolIcon />, path: '/student/courses/1' },
    { text: 'Biblioteca Digital', icon: <BookIcon />, path: '/student/library' },
  ];

  const menuItems = isTeacher ? teacherMenuItems : studentMenuItems;

  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" color="primary" noWrap>
            EducaMais
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigateTo(item.path)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {isTeacher ? 'Área do Professor' : 'Área do Aluno'}
          </Typography>
          
          <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar 
              alt={currentUser?.name} 
              src={currentUser?.avatar}
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      
      {/* Menu de perfil */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { handleProfileMenuClose(); navigateTo(`/${currentUser?.role}/profile`); }}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Meu Perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
      
      {/* Menu de notificações */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            width: 320,
            maxHeight: 400,
            '& .MuiMenuItem-root': {
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              padding: '12px 16px',
              minHeight: 'auto',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ py: 1.5 }}>
          <Typography 
            variant="subtitle2" 
            color="primary"
            sx={{ 
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              lineHeight: 1.4
            }}
          >
            Nova atividade disponível
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 1.5 }}>
          <Typography 
            variant="body2"
            sx={{ 
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              lineHeight: 1.4,
              maxWidth: '100%'
            }}
          >
            O professor Silva publicou uma nova lista de exercícios de Matemática.
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 1.5 }}>
          <Typography 
            variant="subtitle2" 
            color="primary"
            sx={{ 
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              lineHeight: 1.4
            }}
          >
            Prazo de entrega se aproximando
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 1.5 }}>
          <Typography 
            variant="body2"
            sx={{ 
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              lineHeight: 1.4,
              maxWidth: '100%'
            }}
          >
            Lembrete: A lista de exercícios de Matemática deve ser entregue até 01/09/2023.
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 1.5 }}>
          <Typography 
            variant="subtitle2" 
            color="primary"
            sx={{ 
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              lineHeight: 1.4
            }}
          >
            Ver todas as notificações
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;