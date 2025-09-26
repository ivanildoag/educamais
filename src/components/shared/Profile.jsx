import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Grid,
  Divider,
  Paper,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    bio: currentUser?.bio || '',
    school: currentUser?.school || '',
    subject: currentUser?.subject || '',
    class: currentUser?.class || '',
    notifications: {
      email: true,
      push: true,
      activities: true,
      announcements: true
    }
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as alterações
    console.log('Salvando alterações:', editedUser);
    setIsEditing(false);
    // Implementar atualização no contexto de autenticação
  };

  const handleCancel = () => {
    setEditedUser({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || '',
      bio: currentUser?.bio || '',
      school: currentUser?.school || '',
      subject: currentUser?.subject || '',
      class: currentUser?.class || '',
      notifications: {
        email: true,
        push: true,
        activities: true,
        announcements: true
      }
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const isTeacher = currentUser?.role === 'teacher';

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Meu Perfil
      </Typography>

      <Grid container spacing={3}>
        {/* Informações Básicas */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={currentUser?.avatar}
                alt={currentUser?.name}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              
              {isEditing ? (
                <TextField
                  fullWidth
                  value={editedUser.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                />
              ) : (
                <Typography variant="h5" gutterBottom>
                  {currentUser?.name}
                </Typography>
              )}

              <Chip 
                label={isTeacher ? 'Professor' : 'Aluno'} 
                color="primary" 
                sx={{ mb: 2 }}
              />

              {isEditing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={editedUser.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Conte um pouco sobre você..."
                  variant="outlined"
                  size="small"
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {currentUser?.bio || 'Nenhuma biografia adicionada.'}
                </Typography>
              )}

              <Box sx={{ mt: 2 }}>
                {!isEditing ? (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                    fullWidth
                  >
                    Editar Perfil
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                      size="small"
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                      size="small"
                    >
                      Cancelar
                    </Button>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Informações de Contato */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Informações de Contato
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary={
                    isEditing ? (
                      <TextField
                        value={editedUser.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        variant="standard"
                        size="small"
                        fullWidth
                      />
                    ) : (
                      currentUser?.email
                    )
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Telefone"
                  secondary={
                    isEditing ? (
                      <TextField
                        value={editedUser.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        variant="standard"
                        size="small"
                        fullWidth
                        placeholder="(11) 99999-9999"
                      />
                    ) : (
                      currentUser?.phone || 'Não informado'
                    )
                  }
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Endereço"
                  secondary={
                    isEditing ? (
                      <TextField
                        value={editedUser.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        variant="standard"
                        size="small"
                        fullWidth
                        placeholder="Cidade, Estado"
                      />
                    ) : (
                      currentUser?.address || 'Não informado'
                    )
                  }
                />
              </ListItem>
            </List>
          </Paper>

          {/* Informações Acadêmicas */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Informações Acadêmicas
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Escola"
                  secondary={
                    isEditing ? (
                      <TextField
                        value={editedUser.school}
                        onChange={(e) => handleInputChange('school', e.target.value)}
                        variant="standard"
                        size="small"
                        fullWidth
                        placeholder="Nome da escola"
                      />
                    ) : (
                      currentUser?.school || 'Escola Municipal Verde Vida'
                    )
                  }
                />
              </ListItem>

              {isTeacher ? (
                <ListItem>
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Matéria"
                    secondary={
                      isEditing ? (
                        <TextField
                          value={editedUser.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          variant="standard"
                          size="small"
                          fullWidth
                          placeholder="Matéria que leciona"
                        />
                      ) : (
                        currentUser?.subject || 'Não informado'
                      )
                    }
                  />
                </ListItem>
              ) : (
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Turma"
                    secondary={
                      isEditing ? (
                        <TextField
                          value={editedUser.class}
                          onChange={(e) => handleInputChange('class', e.target.value)}
                          variant="standard"
                          size="small"
                          fullWidth
                          placeholder="Sua turma"
                        />
                      ) : (
                        currentUser?.class || 'Não informado'
                      )
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>

          {/* Configurações de Notificação */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <NotificationsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Configurações de Notificação
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <List>
              <ListItem>
                <ListItemText
                  primary="Notificações por Email"
                  secondary="Receber notificações importantes por email"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={editedUser.notifications.email}
                      onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    />
                  }
                  label=""
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Notificações Push"
                  secondary="Receber notificações no navegador"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={editedUser.notifications.push}
                      onChange={(e) => handleNotificationChange('push', e.target.checked)}
                    />
                  }
                  label=""
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Atividades"
                  secondary="Notificações sobre novas atividades e prazos"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={editedUser.notifications.activities}
                      onChange={(e) => handleNotificationChange('activities', e.target.checked)}
                    />
                  }
                  label=""
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Anúncios"
                  secondary="Notificações sobre anúncios da escola"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={editedUser.notifications.announcements}
                      onChange={(e) => handleNotificationChange('announcements', e.target.checked)}
                    />
                  }
                  label=""
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;