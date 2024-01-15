import type { RulesRefType } from "~/interface";

export const columnsTitle = [
    {
      title: 'ФИО',
      dataIndex: 'fullName',
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

export const rulesRef: RulesRefType = reactive({

});

export const rulesByFile = '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'