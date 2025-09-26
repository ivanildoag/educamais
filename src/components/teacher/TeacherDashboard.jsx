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
  Paper
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { courses, activities, users } from '../../data/mockData';

const TeacherDashboard = () => {
  const { currentUser } = useAuth();
  const [teacherCourses, setTeacherCourses] = useState(
    courses.filter(course => course.teacher === currentUser?.id)
  );
  
  const [teacherActivities, setTeacherActivities] = useState(
    activities.filter(activity => activity.teacher === currentUser?.id && activity.status === 'active')
  );

  // Simulação de alunos nas turmas do professor
  const teacherStudents = users.filter(u => 
    u.userType === 'student' && 
    teacherCourses.some(course => u.class === course.class)
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {currentUser?.name}
      </Typography>
      
      <Grid container spacing={3}>
        {/* Resumo */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Minhas Turmas</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {teacherCourses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Turmas ativas
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Detalhes</Button>
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
                {teacherActivities.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Atividades pendentes
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Detalhes</Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <VideoLibraryIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Materiais</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Materiais publicados
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ver Detalhes</Button>
            </CardActions>
          </Card>
        </Grid>
        
        {/* Atividades Recentes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Atividades Recentes
            </Typography>
            <List>
              {teacherActivities.map((activity) => (
                <Box key={activity.id}>
                  <ListItem>
                    <ListItemText
                      primary={activity.title}
                      secondary={`Prazo: ${activity.dueDate}`}
                    />
                    <Chip 
                      label={activity.type === 'exercise' ? 'Exercício' : 
                             activity.type === 'assignment' ? 'Trabalho' : 'Projeto'} 
                      color="primary" 
                      size="small" 
                    />
                  </ListItem>
                  <Divider />
                </Box>
              ))}
              {teacherActivities.length === 0 && (
                <ListItem>
                  <ListItemText primary="Nenhuma atividade pendente" />
                </ListItem>
              )}
            </List>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="outlined" size="small">
                Criar Nova Atividade
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Alunos */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Alunos Recentes
            </Typography>
            <List>
              {teacherStudents.slice(0, 5).map((student) => (
                <Box key={student.id}>
                  <ListItem>
                    <Avatar src={student.avatar} sx={{ mr: 2 }} />
                    <ListItemText
                      primary={student.name}
                      secondary={`Turma: ${student.class}`}
                    />
                    <Button size="small">Ver Perfil</Button>
                  </ListItem>
                  <Divider />
                </Box>
              ))}
              {teacherStudents.length === 0 && (
                <ListItem>
                  <ListItemText primary="Nenhum aluno encontrado" />
                </ListItem>
              )}
            </List>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="outlined" size="small">
                Ver Todos os Alunos
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Próximas Aulas */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Próximas Aulas
            </Typography>
            <Grid container spacing={2}>
              {teacherCourses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="primary">
                        {course.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Turma: {course.class}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {course.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Gerenciar</Button>
                      <Button size="small">Adicionar Material</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard;