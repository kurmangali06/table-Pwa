import type { RulesRefType } from "~/interface";

export const columnsTitle = [
    {
      title: 'ФИО',
      dataIndex: 'mainName',
    },
    {
      title: 'Должность',
      dataIndex: 'position',
    },
    {
      title: 'Пол',
      dataIndex: 'gender',
    },
    {
      title: 'Национальность',
      dataIndex: 'nationality',
    },
    {
        title: 'Образование',
        dataIndex: 'education',
    },
    {
        title: 'Сфера деятельности',
        dataIndex: 'fieldOfActivity',
    },
    {
        title: 'Опыт работы',
        dataIndex: 'experience',
    },
    {
        title: 'Место рождения',
        dataIndex: 'placeOfBirth',
    },
    {
        title: 'Ученая степень',
        dataIndex: 'academicDegree',
    },
    {
        title: 'Уровень известности',
        dataIndex: 'fameLevel',
    },
    {
        title: 'Уровень профессионализма',
        dataIndex: 'levelOfProfessionalism',
    },
    {
        title: 'Репутация',
        dataIndex: 'reputation',
    },
    {
        title: 'Опыт руководителя',
        dataIndex: 'managersExperience',
    },
    {
        title: 'Религиозные убеждения',
        dataIndex: 'religiousBeliefs',
    },
    {
        title: 'Уровень отмеченных достижений',
        dataIndex: 'levelOfNotedAchievements',
    },
    {
        title: 'Семейное положение',
        dataIndex: 'familyStatus',
    },
    {
        title: 'Количество детей',
        dataIndex: 'amountOfChildren',
    },
    {
        title: 'Масштаб видения',
        dataIndex: 'scopeOfVision',
    },
    {
        title: 'Тип лидерства',
        dataIndex: 'leadershipType',
    },
    {
        title: 'Отношение к воинской службе',
        dataIndex: 'militaryService',
    },
];

export const rulesRef: RulesRefType = {
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
};