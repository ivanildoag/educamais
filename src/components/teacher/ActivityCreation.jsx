import { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid, 
  Paper,
  Chip,
  IconButton,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { courses } from '../../data/mockData';

const ActivityCreation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activity, setActivity] = useState({
    title: '',
    description: '',
    type: 'exercise',
    courseId: '',
    dueDate: null,
    points: 10,
    questions: [],
    attachments: []
  });
  
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    type: 'multiple_choice',
    options: ['', '', '', ''],
    correctAnswer: 0
  });
  
  const [currentAttachment, setCurrentAttachment] = useState({
    name: '',
    type: 'document',
    link: ''
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddQuestion = () => {
    setActivity({
      ...activity,
      questions: [...activity.questions, { ...currentQuestion, id: Date.now() }]
    });
    setCurrentQuestion({
      question: '',
      type: 'multiple_choice',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const handleRemoveQuestion = (questionId) => {
    setActivity({
      ...activity,
      questions: activity.questions.filter(q => q.id !== questionId)
    });
  };

  const handleAddAttachment = () => {
    setActivity({
      ...activity,
      attachments: [...activity.attachments, { ...currentAttachment, id: Date.now() }]
    });
    setCurrentAttachment({
      name: '',
      type: 'document',
      link: ''
    });
  };

  const handleRemoveAttachment = (attachmentId) => {
    setActivity({
      ...activity,
      attachments: activity.attachments.filter(a => a.id !== attachmentId)
    });
  };

  const handleSaveActivity = () => {
    // Simulação de salvamento
    console.log('Atividade salva:', activity);
    // Aqui seria feita a integração com a API
    alert('Atividade criada com sucesso!');
    // Reset do formulário
    setActivity({
      title: '',
      description: '',
      type: 'exercise',
      courseId: '',
      dueDate: null,
      points: 10,
      questions: [],
      attachments: []
    });
    setActiveStep(0);
  };

  const steps = ['Informações Básicas', 'Questões', 'Anexos', 'Revisão'];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Criar Nova Atividade
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Paper sx={{ p: 3 }}>
        {activeStep === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Título da Atividade"
                fullWidth
                value={activity.title}
                onChange={(e) => setActivity({ ...activity, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descrição"
                fullWidth
                multiline
                rows={4}
                value={activity.description}
                onChange={(e) => setActivity({ ...activity, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Atividade</InputLabel>
                <Select
                  value={activity.type}
                  label="Tipo de Atividade"
                  onChange={(e) => setActivity({ ...activity, type: e.target.value })}
                >
                  <MenuItem value="exercise">Exercício</MenuItem>
                  <MenuItem value="assignment">Trabalho</MenuItem>
                  <MenuItem value="project">Projeto</MenuItem>
                  <MenuItem value="quiz">Questionário</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Curso/Disciplina</InputLabel>
                <Select
                  value={activity.courseId}
                  label="Curso/Disciplina"
                  onChange={(e) => setActivity({ ...activity, courseId: e.target.value })}
                >
                  {courses.map(course => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name} - {course.class}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data de Entrega"
                  value={activity.dueDate}
                  onChange={(newValue) => setActivity({ ...activity, dueDate: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pontuação"
                type="number"
                fullWidth
                value={activity.points}
                onChange={(e) => setActivity({ ...activity, points: parseInt(e.target.value) })}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
              />
            </Grid>
          </Grid>
        )}
        
        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Adicionar Questões
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <TextField
                  label="Pergunta"
                  fullWidth
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Questão</InputLabel>
                  <Select
                    value={currentQuestion.type}
                    label="Tipo de Questão"
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value })}
                  >
                    <MenuItem value="multiple_choice">Múltipla Escolha</MenuItem>
                    <MenuItem value="true_false">Verdadeiro/Falso</MenuItem>
                    <MenuItem value="short_answer">Resposta Curta</MenuItem>
                    <MenuItem value="essay">Dissertativa</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              {currentQuestion.type === 'multiple_choice' && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Opções:
                  </Typography>
                  {currentQuestion.options.map((option, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1}>
                      <TextField
                        label={`Opção ${index + 1}`}
                        fullWidth
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...currentQuestion.options];
                          newOptions[index] = e.target.value;
                          setCurrentQuestion({ ...currentQuestion, options: newOptions });
                        }}
                        sx={{ mr: 1 }}
                      />
                      <FormControl>
                        <Button
                          variant={currentQuestion.correctAnswer === index ? "contained" : "outlined"}
                          size="small"
                          onClick={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: index })}
                        >
                          Correta
                        </Button>
                      </FormControl>
                    </Box>
                  ))}
                </Grid>
              )}
              
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddQuestion}
                  disabled={!currentQuestion.question}
                >
                  Adicionar Questão
                </Button>
              </Grid>
            </Grid>
            
            <Typography variant="h6" gutterBottom>
              Questões Adicionadas
            </Typography>
            
            {activity.questions.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhuma questão adicionada ainda.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {activity.questions.map((q, index) => (
                  <Grid item xs={12} key={q.id}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="subtitle1">
                            {index + 1}. {q.question}
                          </Typography>
                          <Chip 
                            label={
                              q.type === 'multiple_choice' ? 'Múltipla Escolha' :
                              q.type === 'true_false' ? 'Verdadeiro/Falso' :
                              q.type === 'short_answer' ? 'Resposta Curta' : 'Dissertativa'
                            } 
                            size="small" 
                            color="primary" 
                            sx={{ mt: 1 }}
                          />
                        </Box>
                        <IconButton onClick={() => handleRemoveQuestion(q.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
        
        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Adicionar Anexos
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nome do Anexo"
                  fullWidth
                  value={currentAttachment.name}
                  onChange={(e) => setCurrentAttachment({ ...currentAttachment, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Anexo</InputLabel>
                  <Select
                    value={currentAttachment.type}
                    label="Tipo de Anexo"
                    onChange={(e) => setCurrentAttachment({ ...currentAttachment, type: e.target.value })}
                  >
                    <MenuItem value="document">Documento</MenuItem>
                    <MenuItem value="image">Imagem</MenuItem>
                    <MenuItem value="video">Vídeo</MenuItem>
                    <MenuItem value="link">Link</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Link ou Caminho"
                  fullWidth
                  value={currentAttachment.link}
                  onChange={(e) => setCurrentAttachment({ ...currentAttachment, link: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddAttachment}
                  disabled={!currentAttachment.name || !currentAttachment.link}
                >
                  Adicionar Anexo
                </Button>
              </Grid>
            </Grid>
            
            <Typography variant="h6" gutterBottom>
              Anexos Adicionados
            </Typography>
            
            {activity.attachments.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhum anexo adicionado ainda.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {activity.attachments.map((attachment) => (
                  <Grid item xs={12} sm={6} md={4} key={attachment.id}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box>
                          <Typography variant="subtitle1">
                            {attachment.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {attachment.type.charAt(0).toUpperCase() + attachment.type.slice(1)}
                          </Typography>
                        </Box>
                        <IconButton onClick={() => handleRemoveAttachment(attachment.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
        
        {activeStep === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Revisão da Atividade
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Título:</Typography>
                <Typography variant="body1">{activity.title}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Tipo:</Typography>
                <Typography variant="body1">
                  {activity.type === 'exercise' ? 'Exercício' :
                   activity.type === 'assignment' ? 'Trabalho' :
                   activity.type === 'project' ? 'Projeto' : 'Questionário'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Descrição:</Typography>
                <Typography variant="body1">{activity.description}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Curso:</Typography>
                <Typography variant="body1">
                  {courses.find(c => c.id === activity.courseId)?.name || 'Não selecionado'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Data de Entrega:</Typography>
                <Typography variant="body1">
                  {activity.dueDate ? new Date(activity.dueDate).toLocaleDateString() : 'Não definida'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Pontuação:</Typography>
                <Typography variant="body1">{activity.points} pontos</Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Questões ({activity.questions.length}):
                </Typography>
                {activity.questions.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Nenhuma questão adicionada.
                  </Typography>
                ) : (
                  activity.questions.map((q, index) => (
                    <Box key={q.id} mb={2}>
                      <Typography variant="body1">
                        {index + 1}. {q.question}
                      </Typography>
                      <Chip 
                        label={
                          q.type === 'multiple_choice' ? 'Múltipla Escolha' :
                          q.type === 'true_false' ? 'Verdadeiro/Falso' :
                          q.type === 'short_answer' ? 'Resposta Curta' : 'Dissertativa'
                        } 
                        size="small" 
                        sx={{ mt: 0.5 }}
                      />
                    </Box>
                  ))
                )}
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Anexos ({activity.attachments.length}):
                </Typography>
                {activity.attachments.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    Nenhum anexo adicionado.
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {activity.attachments.map((attachment) => (
                      <Grid item xs={12} sm={6} md={4} key={attachment.id}>
                        <Paper variant="outlined" sx={{ p: 1 }}>
                          <Typography variant="body2">
                            {attachment.name} ({attachment.type})
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Voltar
          </Button>
          <Box>
            {activeStep === steps.length - 1 ? (
              <Button 
                variant="contained" 
                onClick={handleSaveActivity}
                disabled={!activity.title || !activity.courseId}
              >
                Finalizar e Salvar
              </Button>
            ) : (
              <Button 
                variant="contained" 
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && (!activity.title || !activity.courseId))
                }
              >
                Próximo
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ActivityCreation;