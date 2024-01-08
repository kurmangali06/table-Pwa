export const columnsTitle = [
    {
      title: 'ФИО',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Пол',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Национальность',
      dataIndex: 'nationality',
      key: 'nationality',
    },
    {
        title: 'Образование',
        dataIndex: 'education',
        key: 'education',
    },
    {
        title: 'Сфера деятельности',
        dataIndex: 'fieldOfActivity',
        key: 'fieldOfActivity',
    },
    {
        title: 'Опыт работы',
        dataIndex: 'experience',
        key: 'experience',
    },
    {
        title: 'Место рождения',
        dataIndex: 'placeOfBirth',
        key: 'placeOfBirth',
    },
    {
        title: 'Ученая степень',
        dataIndex: 'academicDegree',
        key: 'academicDegree',
    },
    {
        title: 'Уровень известности',
        dataIndex: 'fameLevel',
        key: 'fameLevel',
    },
    {
        title: 'Уровень профессионализма',
        dataIndex: 'levelOfProfessionalism',
        key: 'levelOfProfessionalism',
    },
    {
        title: 'Репутация',
        dataIndex: 'reputation',
        key: 'reputation',
    },
    {
        title: 'Опыт руководителя',
        dataIndex: 'managersExperience',
        key: 'managersExperience',
    },
    {
        title: 'Религиозные убеждения',
        dataIndex: 'religiousBeliefs',
        key: 'religiousBeliefs',
    },
    {
        title: 'Уровень отмеченных достижений',
        dataIndex: 'levelOfNotedAchievements',
        key: 'levelOfNotedAchievements',
    },
    {
        title: 'Семейное положение',
        dataIndex: 'familyStatus',
        key: 'familyStatus',
    },
    {
        title: 'Количество детей',
        dataIndex: 'amountOfChildren',
        key: 'amountOfChildren',
    },
    {
        title: 'Масштаб видения',
        dataIndex: 'scopeOfVision',
        key: 'scopeOfVision',
    },
    {
        title: 'Тип лидерства',
        dataIndex: 'leadershipType',
        key: 'leadershipType',
    },
    {
        title: 'Отношение к воинской службе',
        dataIndex: 'militaryService',
        key: 'militaryService',
    },
];

export const rulesRef = reactive({
    fullName: [
      {
        required: true,
        message: 'Пожалуйста, введите  ФИО пользователя!'
      },
      {
        min: 3,
        message: 'Длина должна быть от 3',
        trigger: 'blur',
      },
    ],
    position: [
      {
        required: true,
        message: 'Пожалуйста, введите  должность пользователя!'
      },
      {
        min: 3,
        message: 'Длина должна быть от 3',
        trigger: 'blur',
      },
    ],
    nationality: [
        {
          required: true,
          message: 'Пожалуйста, выберите национальность!'
        },
    ],
    gender: [
        {
          required: true,
          message: 'Пожалуйста, выберите пол!'
        },
    ],
    education: [
        {
          required: true,
          message: 'Пожалуйста, выберите из списка!'
        },
    ],
    fieldOfActivity: [
        {
          required: true,
          message: 'Пожалуйста, выберите из списка!'
        },
    ],
    experience: [
        {
            required: true,
            message: 'Пожалуйста, выберите из списка!'
          }, 
    ],
    placeOfBirth:[
        {
            required: true,
            message: 'Пожалуйста, выберите из списка!'
          }, 
    ]
  });