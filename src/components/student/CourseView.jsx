import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Paper,
  Chip,
  LinearProgress
} from '@mui/material';
import { courses, studyMaterials, activities } from '../../data/mockData';

const CourseView = () => {
  const { courseId } = useParams();
  const [tabValue, setTabValue] = useState(0);
  
  // Encontrar o curso pelo ID
  const course = courses.find(c => c.id === courseId) || courses[0];
  
  // Filtrar materiais do curso
  const courseMaterials = studyMaterials.filter(material => material.courseId === course.id);
  
  // Filtrar atividades do curso
  const courseActivities = activities.filter(activity => activity.courseId === course.id);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {course.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {course.subject} | Turma: {course.class}
      </Typography>
      <Typography variant="body1" paragraph>
        {course.description}
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="course tabs">
          <Tab label="Materiais de Estudo" />
          <Tab label="Atividades" />
          <Tab label="Fórum de Discussão" />
        </Tabs>
      </Box>
      
      {/* Materiais de Estudo */}
      {tabValue === 0 && (
        <Box>
          <Grid container spacing={3}>
            {courseMaterials.map((material) => (
              <Grid item xs={12} sm={6} md={4} key={material.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {material.title}
                    </Typography>
                    <Chip 
                      label={
                        material.type === 'document' ? 'Documento' : 
                        material.type === 'video' ? 'Vídeo' : 
                        material.type === 'link' ? 'Link' : 'Apresentação'
                      } 
                      size="small" 
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="body2">
                      {material.description}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                      Adicionado em: {new Date(material.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <Box display="flex" justifyContent="flex-end" p={1}>
                    <Button size="small" variant="contained">Acessar</Button>
                  </Box>
                </Card>
              </Grid>
            ))}
            {courseMaterials.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="body1">
                    Nenhum material disponível para este curso.
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
      
      {/* Atividades */}
      {tabValue === 1 && (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Atividades Pendentes
              </Typography>
              <List>
                {courseActivities
                  .filter(activity => activity.status === 'active')
                  .map((activity) => (
                    <Box key={activity.id}>
                      <Paper sx={{ p: 2, mb: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                          <Box>
                            <Typography variant="h6" color="primary">
                              {activity.title}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {activity.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                              <Box sx={{ width: '100%', mr: 1, maxWidth: 300 }}>
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
                          </Box>
                          <Box>
                            <Chip 
                              label={
                                activity.type === 'exercise' ? 'Exercício' : 
                                activity.type === 'assignment' ? 'Trabalho' : 
                                activity.type === 'project' ? 'Projeto' : 'Questionário'
                              } 
                              color="primary" 
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary" display="block">
                              Prazo: {activity.dueDate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" display="block">
                              Pontos: {activity.points || 10}
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" justifyContent="flex-end" mt={2}>
                          <Button variant="outlined" sx={{ mr: 1 }}>Ver Detalhes</Button>
                          <Button variant="contained">Iniciar</Button>
                        </Box>
                      </Paper>
                    </Box>
                  ))}
                {courseActivities.filter(activity => activity.status === 'active').length === 0 && (
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1">
                      Nenhuma atividade pendente para este curso.
                    </Typography>
                  </Paper>
                )}
              </List>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Atividades Concluídas
              </Typography>
              <List>
                {courseActivities
                  .filter(activity => activity.status === 'completed')
                  .map((activity) => (
                    <Box key={activity.id}>
                      <ListItem>
                        <ListItemText
                          primary={activity.title}
                          secondary={
                            <>
                              <Typography variant="caption" display="block">
                                Concluído em: {activity.completedDate || '01/06/2023'}
                              </Typography>
                              <Typography variant="caption" display="block">
                                Nota: {activity.grade || 'Pendente'}
                              </Typography>
                            </>
                          }
                        />
                        <Button size="small">Ver</Button>
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                {courseActivities.filter(activity => activity.status === 'completed').length === 0 && (
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1">
                      Nenhuma atividade concluída.
                    </Typography>
                  </Paper>
                )}
              </List>
            </Grid>
          </Grid>
        </Box>
      )}
      
      {/* Fórum de Discussão */}
      {tabValue === 2 && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Iniciar Nova Discussão
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Compartilhe suas dúvidas, ideias ou reflexões sobre o curso com seus colegas e professores.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained">Nova Discussão</Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          
          <Typography variant="h6" gutterBottom>
            Discussões Recentes
          </Typography>
          
          <List>
            {[
              {
                id: 1,
                title: 'Dúvida sobre o conceito de energia renovável',
                author: 'Maria Silva',
                date: '2023-06-10T14:30:00',
                replies: 5,
                lastActivity: '2023-06-12T09:15:00'
              },
              {
                id: 2,
                title: 'Compartilhando um artigo interessante sobre sustentabilidade',
                author: 'João Santos',
                date: '2023-06-08T10:45:00',
                replies: 3,
                lastActivity: '2023-06-09T16:20:00'
              },
              {
                id: 3,
                title: 'Sugestão de projeto para a feira de ciências',
                author: 'Ana Oliveira',
                date: '2023-06-05T08:30:00',
                replies: 8,
                lastActivity: '2023-06-11T11:05:00'
              }
            ].map((discussion) => (
              <Box key={discussion.id}>
                <Paper sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6" color="primary">
                    {discussion.title}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Typography variant="body2" color="text.secondary">
                      Iniciado por {discussion.author} em {new Date(discussion.date).toLocaleDateString()}
                    </Typography>
                    <Chip label={`${discussion.replies} respostas`} size="small" />
                  </Box>
                  <Typography variant="caption" display="block" color="text.secondary" mt={1}>
                    Última atividade: {new Date(discussion.lastActivity).toLocaleDateString()}
                  </Typography>
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button variant="outlined">Ver Discussão</Button>
                  </Box>
                </Paper>
              </Box>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default CourseView;