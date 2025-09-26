// Dados simulados para o protótipo

// Usuários
export const users = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria.silva@professor.edu.br',
    role: 'teacher',
    avatar: 'https://mui.com/static/images/avatar/1.jpg',
    subjects: ['Biologia', 'Ciências'],
    bio: 'Professora de Biologia com foco em sustentabilidade e meio ambiente'
  },
  {
    id: 2,
    name: 'João Oliveira',
    email: 'joao@aluno.edu.br',
    role: 'student',
    avatar: 'https://mui.com/static/images/avatar/2.jpg',
    grade: '9º ano',
    interests: ['Ciências', 'Tecnologia']
  },
  {
    id: 3,
    name: 'Ana Santos',
    email: 'ana@aluno.edu.br',
    role: 'student',
    avatar: 'https://mui.com/static/images/avatar/3.jpg',
    grade: '2º ano EM',
    interests: ['Literatura', 'Biologia']
  },
  {
    id: 4,
    name: 'Carlos Mendes',
    email: 'carlos.mendes@professor.edu.br',
    role: 'teacher',
    avatar: 'https://mui.com/static/images/avatar/4.jpg',
    subjects: ['Geografia', 'História'],
    bio: 'Professor de Geografia com experiência em projetos interdisciplinares'
  }
];

// Cursos/Disciplinas
export const courses = [
  {
    id: 1,
    title: 'Biologia e Sustentabilidade',
    description: 'Estudo dos ecossistemas e práticas sustentáveis',
    teacherId: 1,
    teacherName: 'Maria Silva',
    image: 'https://source.unsplash.com/random/300x200/?biology',
    students: [2, 3],
    grade: 'Ensino Médio',
    tags: ['sustentabilidade', 'ecologia', 'meio ambiente']
  },
  {
    id: 2,
    title: 'Geografia Ambiental',
    description: 'Estudo das transformações geográficas e impactos ambientais',
    teacherId: 4,
    teacherName: 'Carlos Mendes',
    image: 'https://source.unsplash.com/random/300x200/?geography',
    students: [2],
    grade: 'Ensino Médio',
    tags: ['geografia', 'meio ambiente', 'clima']
  },
  {
    id: 3,
    title: 'Ciências da Natureza',
    description: 'Fundamentos das ciências naturais para o ensino fundamental',
    teacherId: 1,
    teacherName: 'Maria Silva',
    image: 'https://source.unsplash.com/random/300x200/?science',
    students: [2, 3],
    grade: 'Ensino Fundamental',
    tags: ['ciências', 'natureza', 'experimentos']
  }
];

// Materiais de estudo
export const studyMaterials = [
  {
    id: 1,
    courseId: 1,
    title: 'Introdução aos Ecossistemas',
    type: 'document',
    description: 'Material introdutório sobre ecossistemas e biodiversidade',
    url: '#',
    createdAt: '2023-05-10',
    teacherId: 1
  },
  {
    id: 2,
    courseId: 1,
    title: 'Ciclos Biogeoquímicos',
    type: 'video',
    description: 'Vídeo-aula explicativa sobre os ciclos da natureza',
    url: '#',
    duration: '15:30',
    createdAt: '2023-05-15',
    teacherId: 1
  },
  {
    id: 3,
    courseId: 2,
    title: 'Mudanças Climáticas',
    type: 'document',
    description: 'Artigo sobre as causas e consequências das mudanças climáticas',
    url: '#',
    createdAt: '2023-04-22',
    teacherId: 4
  },
  {
    id: 4,
    courseId: 3,
    title: 'O Método Científico',
    type: 'presentation',
    description: 'Apresentação sobre o método científico e sua aplicação',
    url: '#',
    createdAt: '2023-06-05',
    teacherId: 1
  }
];

// Atividades
export const activities = [
  {
    id: 1,
    courseId: 1,
    title: 'Pesquisa sobre Biomas Brasileiros',
    description: 'Realizar uma pesquisa sobre os principais biomas brasileiros e suas características',
    type: 'assignment',
    dueDate: '2023-06-20',
    points: 10,
    status: 'active',
    teacherId: 1,
    submissions: [
      {
        studentId: 2,
        submissionDate: '2023-06-18',
        status: 'submitted',
        grade: null,
        feedback: null
      }
    ]
  },
  {
    id: 2,
    courseId: 1,
    title: 'Quiz sobre Ecossistemas',
    description: 'Teste seus conhecimentos sobre os diferentes tipos de ecossistemas',
    type: 'quiz',
    dueDate: '2023-06-15',
    points: 5,
    status: 'active',
    teacherId: 1,
    questions: [
      {
        id: 1,
        type: 'multiple_choice',
        question: 'Qual destes NÃO é um bioma brasileiro?',
        options: ['Cerrado', 'Caatinga', 'Savana Africana', 'Pantanal'],
        correctAnswer: 2
      },
      {
        id: 2,
        type: 'true_false',
        question: 'A Amazônia é considerada o pulmão do mundo.',
        correctAnswer: true
      }
    ],
    submissions: [
      {
        studentId: 3,
        submissionDate: '2023-06-14',
        status: 'graded',
        grade: 4,
        feedback: 'Bom trabalho!'
      }
    ]
  },
  {
    id: 3,
    courseId: 2,
    title: 'Análise de Impactos Ambientais',
    description: 'Analisar os impactos ambientais de uma atividade econômica em sua região',
    type: 'project',
    dueDate: '2023-07-10',
    points: 20,
    status: 'active',
    teacherId: 4,
    submissions: []
  }
];

// Recursos da biblioteca digital
export const libraryResources = [
  {
    id: 1,
    title: 'Guia de Práticas Sustentáveis',
    type: 'ebook',
    author: 'Instituto Ambiental',
    description: 'Guia completo com práticas sustentáveis para o dia a dia',
    tags: ['sustentabilidade', 'práticas', 'meio ambiente'],
    url: '#',
    thumbnail: 'https://source.unsplash.com/random/100x150/?sustainability'
  },
  {
    id: 2,
    title: 'Biodiversidade Brasileira',
    type: 'video',
    author: 'Canal Educação',
    description: 'Documentário sobre a rica biodiversidade do Brasil',
    tags: ['biodiversidade', 'fauna', 'flora', 'conservação'],
    url: '#',
    duration: '45:20',
    thumbnail: 'https://source.unsplash.com/random/100x150/?biodiversity'
  },
  {
    id: 3,
    title: 'Energia Renovável: Conceitos e Aplicações',
    type: 'article',
    author: 'Dra. Luísa Mendes',
    description: 'Artigo científico sobre fontes de energia renovável',
    tags: ['energia', 'renovável', 'sustentabilidade'],
    url: '#',
    thumbnail: 'https://source.unsplash.com/random/100x150/?renewable'
  },
  {
    id: 4,
    title: 'Atlas da Poluição Global',
    type: 'interactive',
    author: 'Organização Mundial Ambiental',
    description: 'Mapa interativo mostrando índices de poluição ao redor do mundo',
    tags: ['poluição', 'dados', 'global'],
    url: '#',
    thumbnail: 'https://source.unsplash.com/random/100x150/?pollution'
  },
  {
    id: 5,
    title: 'Horta Escolar: Manual Prático',
    type: 'ebook',
    author: 'Projeto Escola Verde',
    description: 'Guia passo a passo para implementação de hortas em escolas',
    tags: ['horta', 'escola', 'alimentação', 'sustentabilidade'],
    url: '#',
    thumbnail: 'https://source.unsplash.com/random/100x150/?garden'
  },
  {
    id: 6,
    title: 'Ciclo da Água e Conservação',
    type: 'presentation',
    author: 'Prof. Ricardo Almeida',
    description: 'Apresentação educativa sobre o ciclo da água e práticas de conservação',
    tags: ['água', 'conservação', 'ciclo'],
    url: '#',
    thumbnail: 'https://source.unsplash.com/random/100x150/?water'
  }
];

// Discussões do fórum
export const forumDiscussions = [
  {
    id: 1,
    courseId: 1,
    title: 'Como podemos aplicar práticas sustentáveis na escola?',
    author: {
      id: 1,
      name: 'Maria Silva',
      role: 'teacher'
    },
    createdAt: '2023-05-20',
    content: 'Gostaria de discutir ideias para implementarmos práticas sustentáveis em nossa escola. Quais sugestões vocês têm?',
    replies: [
      {
        id: 1,
        authorId: 2,
        authorName: 'João Oliveira',
        role: 'student',
        content: 'Poderíamos criar uma horta comunitária e usar os alimentos na cantina da escola.',
        createdAt: '2023-05-21'
      },
      {
        id: 2,
        authorId: 3,
        authorName: 'Ana Santos',
        role: 'student',
        content: 'Que tal implementarmos um sistema de coleta seletiva em cada sala de aula?',
        createdAt: '2023-05-21'
      }
    ]
  },
  {
    id: 2,
    courseId: 2,
    title: 'Impactos das mudanças climáticas na nossa região',
    author: {
      id: 4,
      name: 'Carlos Mendes',
      role: 'teacher'
    },
    createdAt: '2023-06-02',
    content: 'Vamos discutir os impactos das mudanças climáticas que podemos observar em nossa região. Alguém notou alguma alteração nos últimos anos?',
    replies: [
      {
        id: 3,
        authorId: 2,
        authorName: 'João Oliveira',
        role: 'student',
        content: 'Tenho percebido que os períodos de chuva estão mais intensos e concentrados.',
        createdAt: '2023-06-03'
      }
    ]
  }
];

// Notificações
export const notifications = [
  {
    id: 1,
    userId: 2,
    title: 'Nova atividade disponível',
    message: 'A atividade "Quiz sobre Ecossistemas" foi adicionada ao curso de Biologia e Sustentabilidade.',
    type: 'activity',
    read: false,
    createdAt: '2023-06-10'
  },
  {
    id: 2,
    userId: 2,
    title: 'Feedback recebido',
    message: 'Você recebeu feedback na atividade "Pesquisa sobre Biomas Brasileiros".',
    type: 'feedback',
    read: true,
    createdAt: '2023-06-05'
  },
  {
    id: 3,
    userId: 3,
    title: 'Novo material disponível',
    message: 'O material "Ciclos Biogeoquímicos" foi adicionado ao curso de Biologia e Sustentabilidade.',
    type: 'material',
    read: false,
    createdAt: '2023-05-15'
  }
];

// Desempenho dos alunos
export const studentPerformance = [
  {
    studentId: 2,
    courseId: 1,
    overallGrade: 8.5,
    activitiesCompleted: 5,
    activitiesPending: 2,
    lastAccess: '2023-06-18',
    participationRate: 90,
    feedback: 'Bom desempenho, participativo nas discussões.'
  },
  {
    studentId: 3,
    courseId: 1,
    overallGrade: 7.8,
    activitiesCompleted: 4,
    activitiesPending: 3,
    lastAccess: '2023-06-15',
    participationRate: 75,
    feedback: 'Precisa melhorar a participação nas discussões do fórum.'
  },
  {
    studentId: 2,
    courseId: 2,
    overallGrade: 9.0,
    activitiesCompleted: 3,
    activitiesPending: 1,
    lastAccess: '2023-06-17',
    participationRate: 95,
    feedback: 'Excelente desempenho e participação ativa.'
  }
];

// Trilhas de aprendizagem sobre sustentabilidade
export const learningPaths = [
  {
    id: 1,
    title: 'Introdução à Sustentabilidade',
    description: 'Trilha introdutória sobre conceitos básicos de sustentabilidade',
    image: 'https://source.unsplash.com/random/300x200/?sustainability',
    modules: [
      {
        id: 1,
        title: 'O que é Sustentabilidade?',
        type: 'video',
        duration: '10:15',
        completed: true
      },
      {
        id: 2,
        title: 'Os 17 Objetivos de Desenvolvimento Sustentável da ONU',
        type: 'reading',
        duration: '15 min',
        completed: true
      },
      {
        id: 3,
        title: 'Quiz: Conceitos Básicos',
        type: 'quiz',
        questions: 5,
        completed: false
      }
    ],
    progress: 66
  },
  {
    id: 2,
    title: 'Energia Renovável',
    description: 'Aprenda sobre diferentes fontes de energia renovável e sua importância',
    image: 'https://source.unsplash.com/random/300x200/?renewable-energy',
    modules: [
      {
        id: 4,
        title: 'Tipos de Energia Renovável',
        type: 'video',
        duration: '12:30',
        completed: false
      },
      {
        id: 5,
        title: 'Energia Solar: Funcionamento e Aplicações',
        type: 'interactive',
        duration: '20 min',
        completed: false
      },
      {
        id: 6,
        title: 'Projeto: Construa um Mini Gerador Eólico',
        type: 'project',
        duration: '1 semana',
        completed: false
      }
    ],
    progress: 0
  },
  {
    id: 3,
    title: 'Consumo Consciente',
    description: 'Práticas para um consumo mais consciente e sustentável no dia a dia',
    image: 'https://source.unsplash.com/random/300x200/?conscious-consumption',
    modules: [
      {
        id: 7,
        title: 'Impactos do Consumismo',
        type: 'reading',
        duration: '10 min',
        completed: true
      },
      {
        id: 8,
        title: 'Reduzir, Reutilizar, Reciclar',
        type: 'video',
        duration: '8:45',
        completed: false
      },
      {
        id: 9,
        title: 'Desafio: Uma Semana Sem Plástico',
        type: 'challenge',
        duration: '1 semana',
        completed: false
      }
    ],
    progress: 33
  }
];