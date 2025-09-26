import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  TextField, 
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';

const DigitalLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  
  // Dados simulados para a biblioteca digital
  const libraryItems = [
    {
      id: 1,
      title: 'Guia de Energia Renovável',
      type: 'document',
      subject: 'Ciências',
      tags: ['sustentabilidade', 'energia', 'meio ambiente'],
      description: 'Um guia completo sobre fontes de energia renovável e seu impacto no meio ambiente.',
      author: 'Instituto Ambiental',
      date: '2023-03-15',
      thumbnail: 'https://picsum.photos/300/200?random=20'
    },
    {
      id: 2,
      title: 'Consumo Consciente na Prática',
      type: 'document',
      subject: 'Geografia',
      tags: ['sustentabilidade', 'consumo', 'reciclagem'],
      description: 'Manual prático com dicas para reduzir o consumo e adotar práticas sustentáveis no dia a dia.',
      author: 'Maria Santos',
      date: '2023-02-10',
      thumbnail: 'https://picsum.photos/300/200?random=21'
    },
    {
      id: 3,
      title: 'Biodiversidade Brasileira',
      type: 'video',
      subject: 'Biologia',
      tags: ['biodiversidade', 'ecossistemas', 'conservação'],
      description: 'Documentário sobre a rica biodiversidade brasileira e a importância de sua conservação.',
      author: 'Canal Educação Ambiental',
      date: '2023-04-22',
      thumbnail: 'https://picsum.photos/300/200?random=22'
    },
    {
      id: 4,
      title: 'Matemática da Sustentabilidade',
      type: 'presentation',
      subject: 'Matemática',
      tags: ['sustentabilidade', 'estatísticas', 'gráficos'],
      description: 'Apresentação com dados estatísticos e gráficos sobre sustentabilidade global.',
      author: 'Prof. Carlos Oliveira',
      date: '2023-01-30',
      thumbnail: 'https://picsum.photos/300/200?random=23'
    },
    {
      id: 5,
      title: 'Água: Recurso Vital',
      type: 'document',
      subject: 'Ciências',
      tags: ['água', 'recursos hídricos', 'conservação'],
      description: 'Estudo sobre a importância da água e estratégias para sua conservação.',
      author: 'Fundação Água Viva',
      date: '2023-03-22',
      thumbnail: 'https://picsum.photos/300/200?random=24'
    },
    {
      id: 6,
      title: 'Literatura e Meio Ambiente',
      type: 'document',
      subject: 'Português',
      tags: ['literatura', 'meio ambiente', 'análise'],
      description: 'Análise de obras literárias que abordam temas ambientais.',
      author: 'Profa. Ana Beatriz',
      date: '2023-05-05',
      thumbnail: 'https://picsum.photos/300/200?random=25'
    },
    {
      id: 7,
      title: 'Experimentos Sustentáveis',
      type: 'video',
      subject: 'Ciências',
      tags: ['experimentos', 'ciência', 'sustentabilidade'],
      description: 'Série de vídeos com experimentos científicos relacionados à sustentabilidade.',
      author: 'Laboratório Verde',
      date: '2023-04-10',
      thumbnail: 'https://picsum.photos/300/200?random=26'
    },
    {
      id: 8,
      title: 'História da Conservação Ambiental',
      type: 'presentation',
      subject: 'História',
      tags: ['história', 'conservação', 'meio ambiente'],
      description: 'Linha do tempo com os principais marcos da conservação ambiental no Brasil e no mundo.',
      author: 'Instituto Histórico Ambiental',
      date: '2023-02-28',
      thumbnail: 'https://picsum.photos/300/200?random=27'
    }
  ];
  
  // Filtrar itens com base na pesquisa e filtros
  const filteredItems = libraryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || item.type === filter || item.subject === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Paginação
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const displayedItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Biblioteca Digital
      </Typography>
      <Typography variant="body1" paragraph>
        Explore nossa coleção de materiais educacionais sobre sustentabilidade e temas interdisciplinares.
      </Typography>
      
      {/* Filtros e Pesquisa */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Pesquisar por título, descrição ou tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Filtrar por Tipo</InputLabel>
            <Select
              value={filter}
              label="Filtrar por Tipo"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">Todos os Tipos</MenuItem>
              <MenuItem value="document">Documentos</MenuItem>
              <MenuItem value="video">Vídeos</MenuItem>
              <MenuItem value="presentation">Apresentações</MenuItem>
              <MenuItem value="link">Links</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Filtrar por Disciplina</InputLabel>
            <Select
              value={filter}
              label="Filtrar por Disciplina"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">Todas as Disciplinas</MenuItem>
              <MenuItem value="Ciências">Ciências</MenuItem>
              <MenuItem value="Matemática">Matemática</MenuItem>
              <MenuItem value="Português">Português</MenuItem>
              <MenuItem value="História">História</MenuItem>
              <MenuItem value="Geografia">Geografia</MenuItem>
              <MenuItem value="Biologia">Biologia</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
      {/* Resultados */}
      <Grid container spacing={3}>
        {displayedItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box 
                sx={{ 
                  height: 160, 
                  backgroundImage: `url(${item.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <Chip 
                  label={
                    item.type === 'document' ? 'Documento' : 
                    item.type === 'video' ? 'Vídeo' : 
                    item.type === 'presentation' ? 'Apresentação' : 'Link'
                  }
                  color="primary"
                  size="small"
                  sx={{ position: 'absolute', top: 10, right: 10 }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.subject} | {new Date(item.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" paragraph>
                  {item.description}
                </Typography>
                <Box mt={1}>
                  {item.tags.map((tag) => (
                    <Chip 
                      key={tag} 
                      label={tag} 
                      size="small" 
                      sx={{ mr: 0.5, mb: 0.5 }} 
                      onClick={() => setSearchTerm(tag)}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" startIcon={<BookmarkIcon />}>
                  Salvar
                </Button>
                <Button size="small" startIcon={<DownloadIcon />}>
                  Baixar
                </Button>
                <Button size="small" startIcon={<ShareIcon />}>
                  Compartilhar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
        
        {displayedItems.length === 0 && (
          <Grid item xs={12}>
            <Box textAlign="center" py={4}>
              <Typography variant="h6">
                Nenhum resultado encontrado para sua pesquisa.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tente outros termos ou remova os filtros aplicados.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      
      {/* Paginação */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handleChangePage} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
};

export default DigitalLibrary;