import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { courses, studyMaterials } from '../../data/mockData';

const CourseManagement = () => {
  const [teacherCourses, setTeacherCourses] = useState(courses);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [openMaterialDialog, setOpenMaterialDialog] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState({ title: '', description: '', type: 'document', link: '' });
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (course = null) => {
    setCurrentCourse(course || { name: '', description: '', class: '', subject: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenMaterialDialog = (courseId) => {
    setCurrentMaterial({ ...currentMaterial, courseId });
    setOpenMaterialDialog(true);
  };

  const handleCloseMaterialDialog = () => {
    setOpenMaterialDialog(false);
  };

  const handleSaveCourse = () => {
    // Simulação de salvamento
    if (currentCourse.id) {
      setTeacherCourses(
        teacherCourses.map(course => 
          course.id === currentCourse.id ? currentCourse : course
        )
      );
    } else {
      const newCourse = {
        ...currentCourse,
        id: Date.now().toString(),
        teacher: '1', // ID do professor logado
      };
      setTeacherCourses([...teacherCourses, newCourse]);
    }
    handleCloseDialog();
  };

  const handleDeleteCourse = (courseId) => {
    setTeacherCourses(teacherCourses.filter(course => course.id !== courseId));
  };

  const handleSaveMaterial = () => {
    // Simulação de adição de material
    console.log('Material salvo:', currentMaterial);
    handleCloseMaterialDialog();
  };

  const getCourseMaterials = (courseId) => {
    return studyMaterials.filter(material => material.courseId === courseId);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Gerenciamento de Cursos</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Curso
        </Button>
      </Box>

      <Grid container spacing={3}>
        {teacherCourses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Turma: {course.class}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Disciplina: {course.subject}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {course.description}
                </Typography>
                
                <Box mt={2}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="course tabs">
                    <Tab label="Materiais" />
                    <Tab label="Atividades" />
                    <Tab label="Alunos" />
                  </Tabs>
                  
                  <Box sx={{ mt: 2 }}>
                    {tabValue === 0 && (
                      <Box>
                        <List>
                          {getCourseMaterials(course.id).map((material) => (
                            <Box key={material.id}>
                              <ListItem>
                                <ListItemText
                                  primary={material.title}
                                  secondary={material.description}
                                />
                                <IconButton size="small">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </ListItem>
                              <Divider />
                            </Box>
                          ))}
                          {getCourseMaterials(course.id).length === 0 && (
                            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                              Nenhum material disponível
                            </Typography>
                          )}
                        </List>
                        <Button 
                          size="small" 
                          startIcon={<AddIcon />}
                          onClick={() => handleOpenMaterialDialog(course.id)}
                          sx={{ mt: 1 }}
                        >
                          Adicionar Material
                        </Button>
                      </Box>
                    )}
                    
                    {tabValue === 1 && (
                      <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                        Gerenciamento de atividades em desenvolvimento
                      </Typography>
                    )}
                    
                    {tabValue === 2 && (
                      <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                        Lista de alunos em desenvolvimento
                      </Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
              <Box display="flex" justifyContent="flex-end" p={1}>
                <IconButton onClick={() => handleOpenDialog(course)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteCourse(course.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog para adicionar/editar curso */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentCourse?.id ? 'Editar Curso' : 'Novo Curso'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Curso"
            fullWidth
            variant="outlined"
            value={currentCourse?.name || ''}
            onChange={(e) => setCurrentCourse({...currentCourse, name: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={currentCourse?.description || ''}
            onChange={(e) => setCurrentCourse({...currentCourse, description: e.target.value})}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Turma"
                fullWidth
                variant="outlined"
                value={currentCourse?.class || ''}
                onChange={(e) => setCurrentCourse({...currentCourse, class: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Disciplina</InputLabel>
                <Select
                  value={currentCourse?.subject || ''}
                  label="Disciplina"
                  onChange={(e) => setCurrentCourse({...currentCourse, subject: e.target.value})}
                >
                  <MenuItem value="Matemática">Matemática</MenuItem>
                  <MenuItem value="Português">Português</MenuItem>
                  <MenuItem value="Ciências">Ciências</MenuItem>
                  <MenuItem value="História">História</MenuItem>
                  <MenuItem value="Geografia">Geografia</MenuItem>
                  <MenuItem value="Educação Ambiental">Educação Ambiental</MenuItem>
                  <MenuItem value="Interdisciplinar">Interdisciplinar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveCourse} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para adicionar material */}
      <Dialog open={openMaterialDialog} onClose={handleCloseMaterialDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar Material</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            fullWidth
            variant="outlined"
            value={currentMaterial.title}
            onChange={(e) => setCurrentMaterial({...currentMaterial, title: e.target.value})}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Descrição"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={currentMaterial.description}
            onChange={(e) => setCurrentMaterial({...currentMaterial, description: e.target.value})}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Tipo de Material</InputLabel>
            <Select
              value={currentMaterial.type}
              label="Tipo de Material"
              onChange={(e) => setCurrentMaterial({...currentMaterial, type: e.target.value})}
            >
              <MenuItem value="document">Documento</MenuItem>
              <MenuItem value="video">Vídeo</MenuItem>
              <MenuItem value="link">Link</MenuItem>
              <MenuItem value="presentation">Apresentação</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Link ou Caminho"
            fullWidth
            variant="outlined"
            value={currentMaterial.link}
            onChange={(e) => setCurrentMaterial({...currentMaterial, link: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMaterialDialog}>Cancelar</Button>
          <Button onClick={handleSaveMaterial} variant="contained">Adicionar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseManagement;