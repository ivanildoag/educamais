import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Paper,
  LinearProgress
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { courses, activities, studyMaterials, notifications } from '../../data/mockData';

const StudentDashboard = () => {
  const { currentUser } = useAuth();

  // Filtrar dados específicos do aluno
  const studentCourses = courses.filter(course => course.class === currentUser?.class);
  
  // Filtrar atividades pendentes
  const pendingActivities = activities.filter(
    activity => studentCourses.some(course => course.id === activity.courseId) && 
    activity.status === 'active'
  );
  
  // Filtrar materiais recentes
  const recentMaterials = studyMaterials
    .filter(material => studentCourses.some(course => course.id === material.courseId))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  // Filtrar notificações do aluno
  const studentNotifications = notifications
    .filter(notification => 
      notification.userType === 'all' || 
      notification.userType === 'student' || 
      notification.userId === currentUser?.id
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {currentUser?.name}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Cards de resumo */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <MenuBookIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Meus Cursos</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {studentCourses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cursos matriculados
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Todos</Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Atividades</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {pendingActivities.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Atividades pendentes
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Todas</Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <NotificationsIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Notificações</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {studentNotifications.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Novas notificações
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Todas</Button>
            </CardActions>
          </Card>
        </Grid>
        
        {/* Atividades Pendentes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Atividades Pendentes
            </Typography>
            <List>
              {pendingActivities.slice(0, 4).map((activity) => (
                <Box key={activity.id}>
                  <ListItem>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {courses.find(c => c.id === activity.courseId)?.name} | 
                            Prazo: {activity.dueDate}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={activity.progress || 0} 
                                color={
                                  activity.progress < 30 ? "error" : 
                                  activity.progress < 70 ? "warning" : "success"
                                }
                              />
                            </Box>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {activity.progress || 0}%
                              </Typography>
                            </Box>
                          </Box>
                        </>
                      }
                    />
                    <Chip 
                      label={
                        activity.type === 'exercise' ? 'Exercício' : 
                        activity.type === 'assignment' ? 'Trabalho' : 
                        activity.type === 'project' ? 'Projeto' : 'Questionário'
                      } 
                      color="primary" 
                      size="small" 
                    />
                  </ListItem>
                  <Divider />
                </Box>
              ))}
              {pendingActivities.length === 0 && (
                <ListItem>
                  <ListItemText primary="Nenhuma atividade pendente" />
                </ListItem>
              )}
            </List>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="outlined" size="small">
                Ver Todas as Atividades
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Materiais Recentes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Materiais Recentes
            </Typography>
            <List>
              {recentMaterials.map((material) => (
                <Box key={material.id}>
                  <ListItem>
                    <ListItemText
                      primary={material.title}
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {courses.find(c => c.id === material.courseId)?.name} | 
                            {material.type === 'document' ? 'Documento' : 
                             material.type === 'video' ? 'Vídeo' : 
                             material.type === 'link' ? 'Link' : 'Apresentação'}
                          </Typography>
                        </>
                      }
                    />
                    <Button size="small" variant="outlined">Acessar</Button>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
              {recentMaterials.length === 0 && (
                <ListItem>
                  <ListItemText primary="Nenhum material disponível" />
                </ListItem>
              )}
            </List>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="outlined" size="small">
                Ver Biblioteca Completa
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Trilhas de Aprendizagem */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Trilhas de Aprendizagem sobre Sustentabilidade
            </Typography>
            <Grid container spacing={2}>
              {[
                { 
                  id: 1, 
                  title: 'Energia Renovável', 
                  description: 'Aprenda sobre fontes de energia renovável e seu impacto no meio ambiente.',
                  progress: 65,
                  image: 'https://source.unsplash.com/random/300x200/?renewable'
                },
                { 
                  id: 2, 
                  title: 'Consumo Consciente', 
                  description: 'Descubra práticas de consumo consciente e como reduzir seu impacto ambiental.',
                  progress: 30,
                  image: 'https://source.unsplash.com/random/300x200/?sustainable'
                },
                { 
                  id: 3, 
                  title: 'Biodiversidade', 
                  description: 'Explore a importância da biodiversidade para o equilíbrio dos ecossistemas.',
                  progress: 10,
                  image: 'https://source.unsplash.com/random/300x200/?biodiversity'
                }
              ].map((trail) => (
                <Grid item xs={12} sm={6} md={4} key={trail.id}>
                  <Card>
                    <Box 
                      sx={{ 
                        height: 140, 
                        backgroundImage: `url(${trail.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }} 
                    />
                    <CardContent>
                      <Typography variant="h6" color="primary">
                        {trail.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {trail.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={trail.progress} 
                            color={
                              trail.progress < 30 ? "error" : 
                              trail.progress < 70 ? "warning" : "success"
                            }
                          />
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {trail.progress}%
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Continuar</Button>
                      <Button size="small">Ver Detalhes</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        
        {/* Notificações */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Notificações Recentes
            </Typography>
            <List>
              {studentNotifications.map((notification) => (
                <Box key={notification.id}>
                  <ListItem>
                    <ListItemText
                      primary={notification.title}
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" display="block" color="text.secondary">
                            {new Date(notification.date).toLocaleDateString()} às {new Date(notification.date).toLocaleTimeString()}
                          </Typography>
                        </>
                      }
                    />
                    {!notification.read && (
                      <Chip label="Novo" color="primary" size="small" />
                    )}
                  </ListItem>
                  <Divider />
                </Box>
              ))}
              {studentNotifications.length === 0 && (
                <ListItem>
                  <ListItemText primary="Nenhuma notificação disponível" />
                </ListItem>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard;