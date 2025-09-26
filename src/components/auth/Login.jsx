import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Link,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
  Paper
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simulação de login
    // Em um sistema real, verificaríamos as credenciais no backend
    let demoEmail = userType === 'teacher' ? 'maria.silva@professor.edu.br' : 'joao@aluno.edu.br';
    
    // Se o usuário digitou um email, use-o; caso contrário, use o email de demonstração
    const loginEmail = email || demoEmail;
    
    const result = login(loginEmail, password);
    
    if (result.success) {
      // Redirecionar com base no tipo de usuário
      navigate(result.user.role === 'teacher' ? '/teacher' : '/student');
    } else {
      setError('Credenciais inválidas. Use os emails de demonstração.');
    }
  };

  // Função para login de demonstração
  const handleDemoLogin = (type) => {
    setUserType(type);
    const demoEmail = type === 'teacher' ? 'maria.silva@professor.edu.br' : 'joao@aluno.edu.br';
    setEmail(demoEmail);
    const result = login(demoEmail, '123456');
    
    if (result.success) {
      navigate(type === 'teacher' ? '/teacher' : '/student');
    } else {
      setError('Erro ao fazer login de demonstração. Tente novamente.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100vw',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <SchoolIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              EducaMais
            </Typography>
            <Typography variant="subtitle1">
              Plataforma Educacional Sustentável
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="h5" component="h2" gutterBottom>
              Login
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Entrar como:
                </Typography>
                <RadioGroup
                  row
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Aluno"
                  />
                  <FormControlLabel
                    value="teacher"
                    control={<Radio />}
                    label="Professor"
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={userType === 'teacher' ? 'maria.silva@professor.edu.br' : 'joao@aluno.edu.br'}
              />

              <TextField
                fullWidth
                label="Senha"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite qualquer senha para o protótipo"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  onClick={() => handleDemoLogin('student')}
                >
                  Demo Aluno
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDemoLogin('teacher')}
                >
                  Demo Professor
                </Button>
              </Box>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Link component={RouterLink} to="/register" variant="body2">
                  Não tem uma conta? Cadastre-se
                </Link>
                <br />
                <Link href="#" variant="body2" sx={{ mt: 1, display: 'inline-block' }}>
                  Esqueceu sua senha?
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;