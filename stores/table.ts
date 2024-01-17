import { defineStore } from 'pinia'
import { reactive } from 'vue';
import type { IColumn, IFormState, IListCrieria, IValue, RulesRefType } from '~/interface';

const STORE_ID = 'table'

export const useTableStore = defineStore(STORE_ID, {
  state: () => ({ 
    form: {
      main: {
        fullName: '',
        position: '',
        gender: '',
        nationality: '',
        education: '',
        fieldOfActivity: '',
        experience: '',
        placeOfBirth: ''
    },
    id: '',
    sub: {
        academicDegree: '',
        fameLevel: '',
        levelOfProfessionalism: '',
        reputation: '',
        managersExperience: '',
        religiousBeliefs: '',
        levelOfNotedAchievements: '',
        familyStatus: '',
        amountOfChildren: 0,
        scopeOfVision: '',
        leadershipType: '',
        militaryService: ''
    },
    status: 'active'
    },
    rulesRef: {
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
    } as RulesRefType,
    mainKeys: ['fullName', 'position', 'gender', 'nationality', 'education', 'fieldOfActivity', 'experience', 'placeOfBirth'],
    subKeys: ['academicDegree', 'fameLevel', 'levelOfProfessionalism', 'reputation', 'managersExperience', 'religiousBeliefs', 'levelOfNotedAchievements', 'familyStatus', 'amountOfChildren', 'scopeOfVision', 'leadershipType', 'militaryService'],
    columnsTitle : [
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
    ],
    mainListCrieria: [
        {
            label: 'ФИО клиента',
            key: 'main.fullName',
        },
        {
            label: 'Должность',
            key: 'main.position',
        },
       {
        label: 'Пол',
        key: 'main.gender',
        list: [
            { value: 'М', label: 'М' },
            { value: 'Ж', label: 'Ж'},
        ]
       },
       {
        label: 'Национальность',
        key: 'main.nationality',
        list: [
            {value:'Казах' },
            {value:'Русский' },
            {value:'Татарин' },
            {value:'Узбек' },
            {value:'Кыргыз' },
            {value:'Дунганин' },
            {value:'Чеченец' },
            {value:'Ингуш' },
            {value:'Кореец' },
            {value:'Армянин' },
        ]
       },
       {
        label: 'Образование',
        key: 'main.education',
        list: [
            {value:'Западное' },
            {value:'Российское' },
            {value:'Китайское' },
            {value:'Исламские страны' },
            {value:'Турецкое' },
            {value:'Казахстанское' },
            {value:'Азиатское' },
        ]
       },
       {
        label: 'Сфера деятельности',
        key: 'main.fieldOfActivity',
        list: [
            {value:'Экономика/бизнес' },
            {value:'Культура/спорт' },
            {value:'Наука/образование' },
            {value:'Государство/общество' },
        ]
       },
       {
        label: 'Опыт работы',
        key: 'main.experience',
        list: [
            {value:'Госслужба' },
            {value:'Квазигос' },
            {value:'Частная организация' },
            {value:'Международная/зарубежная' },
        ]
       },
       {
        label: 'Место рождения',
        key: 'main.placeOfBirth',
        list: [
            {value:'Север' },
            {value:'Юг' },
            {value:'Запад' },
            {value:'Восток' },
            {value:'Центр' },
            {value:'Зарубеж' },
        ]
       },
       {
        label: 'Ученая степень',
        key: 'sub.academicDegree',
        list: [
            {value:'Да' },
            {value:'Нет' },
        ]
       }, 
       {
        label: 'Уровень известности',
        key: 'sub.fameLevel',
        list: [
            {value:'Общеизвестный' },
            {value:'Неизвестный' },
            {value:'В своем кругу' },
        ]
       }, 
       {
        label: 'Уровень профессионализма',
        key: 'sub.levelOfProfessionalism',
        list: [
            {value:'Международный' },
            {value:'Национальный' },
            {value:'Региональный' },
        ]
       },
       {
        label: 'Репутация',
        key: 'sub.reputation',
        list: [
            {value:'Безупречная' },
            {value:'Скандальная/дискредитированная' },
        ]
       },
       {
        label: 'Опыт руководителя',
        key: 'sub.managersExperience',
        list: [
            {value:'Высшее звено' },
            {value:'Среднее звено' },
            {value:'Низшее звено' },
        ]
       }, 
       {
        label: 'Религиозные убеждения',
        key: 'sub.religiousBeliefs',
        list: [
            {value:'Традиционные' },
            {value:'Радикальные' },
            {value:'Светские' },
        ]
       }, 
       {
        label: 'Уровень отмеченных достижений',
        key: 'sub.levelOfNotedAchievements',
        list: [
            {value:'Городской/районный' },
            {value:'Областной' },
            {value:'Республиканский' },
            {value:'Международный' },
        ]
       }, 
       {
        label: 'Количество детей',
        key: 'sub.amountOfChildren',
       },
       {
        label: 'Масштаб видения',
        key: 'sub.scopeOfVision',
        list: [
            {value:'Стратегическое (глобальное)' },
            {value:'Тактическое' },
            {value:'Узкоспециализированное' },
        ]
       },
       {
        label: 'Тип лидерства',
        key: 'sub.leadershipType',
        list: [
            {value:'Харизматический' },
            {value:'Традиционный' },
            {value:'Героический' },
        ]
       },
       {
        label: 'Отношение к воинской служба',
        key: 'sub.militaryService',
        list: [
            {value:'Служил' },
            {value:'Не служил' },
            {value:'Военная кафедра' },
            {value:'Участие в военных действиях' },
        ]
       },
    ],
    listTable : [] as IFormState[]
    
  }),
  getters: {
    formState: (state) => state.form,
    stateRef: (state) => state.rulesRef,
    mainKey: (state) => state.mainKeys,
    subKey: (state) => state.subKeys,
    columns: (state) => state.columnsTitle,
    listCrieria: (state) => state.mainListCrieria,
    list: (state) => state.listTable
  },
  actions: {
    updatedForm(update: string, actions: 'main' | 'sub' ) {        
          const newKeys = {
            [update]: ''
          }
          console.log(update);
          
          if(actions === 'main')
            this.form.main = {...this.form.main, ...newKeys}
          else 
          this.form.sub = {...this.form.sub, ...newKeys}
        

    },
    updatedRules(newRules: string) {      
      const newRule = {
        [newRules]: [
          {
              required: true,
              message: 'Пожалуйста, заполните поле!'
          },
        ]
      }
     this.rulesRef = {
      ...this.rulesRef,
      ...newRule,
     }

    },
    setMainKeys(newKey: string) {
      this.mainKeys.push(newKey)
    },
    setSubKeys(newKey: string) {
      this.subKeys.push(newKey)
    },
    setColumns(newColum:IColumn){
      this.columnsTitle.push(newColum)
    },
    addCriteria(newCriteria: IListCrieria) {
      this.mainListCrieria.push(newCriteria)
    },
    addListCriteria(criteria: string, list: IValue) {
      const criteriaIndex = this.mainListCrieria.findIndex(e => e.label === criteria);
      if (criteriaIndex !== -1) {
        if (Array.isArray(this.mainListCrieria[criteriaIndex].list)) {
          console.log(list);
          
          this.mainListCrieria[criteriaIndex].list?.push(list)
        } else {
          this.mainListCrieria[criteriaIndex].list = [list];
        }
      }

    },
    setTable(newList: IFormState[]) {
      this.listTable = newList
    }
  },
})