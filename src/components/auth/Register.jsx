import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');

  const steps = ['Informações Pessoais', 'Credenciais', 'Confirmação'];

  const handleNext = () => {
    if (activeStep === 0) {
      if (!name) {
        setError('Por favor, informe seu nome');
        return;
      }
      setError('');
      setActiveStep((prevStep) => prevStep + 1);
    } else if (activeStep === 1) {
      if (!email || !password || !confirmPassword) {
        setError('Por favor, preencha todos os campos');
        return;
      }
      if (password !== confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }
      setError('');
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const success = register(name, email, password, userType);
      
      if (success) {
        // Redirecionar para a página apropriada com base no tipo de usuário
        if (userType === 'teacher') {
          navigate('/teacher/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      } else {
        setError('Erro ao criar conta');
      }
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome Completo"
              name="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
              <FormLabel component="legend">Tipo de Usuário</FormLabel>
              <RadioGroup
                row
                aria-label="user-type"
                name="user-type"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <FormControlLabel value="student" control={<Radio />} label="Aluno" />
                <FormControlLabel value="teacher" control={<Radio />} label="Professor" />
              </RadioGroup>
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Senha"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Confirme seus dados
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Nome:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">{name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Email:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">{email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Tipo de Usuário:</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  {userType === 'teacher' ? 'Professor' : 'Aluno'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Passo desconhecido';
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mb: 3
        }}>
          <SchoolIcon color="primary" sx={{ fontSize: 50, mb: 1 }} />
          <Typography component="h1" variant="h4" color="primary">
            EducaMais
          </Typography>
          <Typography component="h2" variant="h5">
            Cadastro
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={activeStep === steps.length - 1 ? handleSubmit : undefined} sx={{ mt: 1, width: '100%' }}>
          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Voltar
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Cadastrar
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Próximo
              </Button>
            )}
          </Box>
        </Box>

        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
          <Grid item>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Já tem uma conta? Faça login
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;