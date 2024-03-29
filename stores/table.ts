import { defineStore } from 'pinia'
import { reactive } from 'vue';
import type { IColumn, IFormState, IListCrieria, ISearchForm, IValue, RulesRefType } from '~/interface';
import { getRandomId } from '~/service/helper';

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
        placeOfBirth: '',
        placeOfInfluence: ''
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
      ],
      placeOfInfluence:[
        {
            required: true,
            message: 'Пожалуйста, выберите из списка!'
          },
           
    ],
    zhus:[
      {
          required: true,
          message: 'Пожалуйста, выберите из списка!'
        },
         
    ],
    age:[
      {
          required: true,
          message: 'Пожалуйста, выберите из списка!'
        },
         
    ]
    } as RulesRefType,
    mainKeys: ['fullName', 'age', 'position', 'gender', 'nationality', 'education', 'fieldOfActivity', 'experience', 'placeOfBirth', 'placeOfInfluence', 'zhus'],
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
        title: 'Возраст',
        dataIndex: 'age',
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
        title: 'Место влияния',
        dataIndex: 'placeOfInfluence',
      },
      {
        title: 'Жуз/Ру',
        dataIndex: 'zhus',
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
    mainListCriteria: [
        {
            label: 'ФИО клиента',
            key: 'main.fullName',
            hasChildren:false,
            id: getRandomId()
        },
        {
            label: 'Должность',
            hasChildren:false,
            key: 'main.position',
            id: getRandomId()
        },
       {
        label: 'Пол',
        key: 'main.gender',
        id: getRandomId(),
        list: [
            { value: 'М', label: 'М' },
            { value: 'Ж', label: 'Ж'},
        ]
       },
       {
        label: 'Национальность',
        key: 'main.nationality',
        hasChildren:false,
        id: getRandomId(),
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
        label: 'Возраст',
        key: 'main.age',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Молодой (18-44 лет)' },
            {value:'Средний (45-59 лет)' },
            {value:'Пожилой (60-74 лет)' },
            {value:'75 лет и старше' },
        ]
       },
       {
        label: 'Образование',
        key: 'main.education',
        hasChildren:false,
        id: getRandomId(),
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
        hasChildren:false,
        id: getRandomId(),
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
        hasChildren:false,
        id: getRandomId(),
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
        hasChildren:false,
        id: getRandomId(),
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
        label: 'Место влияния',
        key: 'main.placeOfInfluence',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Север' },
            {value:'Юг' },
            {value:'Запад' },
            {value:'Восток' },
            {value:'Центр' },
            {value:'Зарубеж' },
            {value: 'Все регионы'}
        ]
       },
       {
        label: 'Жуз/Ру',
        key: 'main.zhus',
        hasChildren:true,
        id: getRandomId(),
        list: [
            { value:'Старший', 
              children : [
                {
                  value: 'Албан',
                },
                {
                  value: 'Дулат',
                },
                {
                  value: 'Суан',
                },
                {
                  value: 'Шапрашты',
                },
                {
                  value: 'Жалайыр',
                },
                {
                  value: 'Сары-уйсун',
                },
                {
                  value: 'Ысты',
                },
                {
                  value: 'Ошакты',
                },
                {
                  value: 'Сиргели',
                },
                {
                  value: 'Шанышкылы',
                },
                {
                  value: 'Канлы',
                },
                {
                  value: 'Шакшам',
                },
              ]
            },
            {
              value:'Средний' ,
              children: [
                {
                  value: 'Аргын',
                },
                {
                  value: 'Кыпшак',
                },
                {
                  value: 'Найман',
                },
                {
                  value: 'Конырат',
                },
                {
                  value: 'Керей',
                },
                {
                  value: 'Уак',
                },              
              ] 
             },
            {
              value:'Младший',
              children: [
                {
                  value: 'Алимулы',
                },
                {
                  value: 'Шекты',
                },
                {
                  value: 'Шомекей',
                },
                {
                  value: 'Кете',
                },
                {
                  value: 'Каракесек',
                },
                {
                  value: 'Карасакал',
                },
                {
                  value: 'Жетыру',
                },
                {
                  value: 'Табын',
                },
                {
                  value: 'Жагалбайлы',
                },
                {
                  value: 'Кереит',
                },
                {
                  value: 'Тама',
                },
                {
                  value: 'Телеу',
                },
                {
                  value: 'Кердери',
                },
                {
                  value: 'Рамадан',
                },
              ]
            },
        ]
       },
       {
        label: 'Ученая степень',
        key: 'sub.academicDegree',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Да' },
            {value:'Нет' },
        ]
       }, 
       {
        label: 'Уровень известности',
        key: 'sub.fameLevel',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Общеизвестный' },
            {value:'Неизвестный' },
            {value:'В своем кругу' },
        ]
       }, 
       {
        label: 'Уровень профессионализма',
        key: 'sub.levelOfProfessionalism',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Международный' },
            {value:'Национальный' },
            {value:'Региональный' },
        ]
       },
       {
        label: 'Репутация',
        key: 'sub.reputation',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Безупречная' },
            {value:'Скандальная/дискредитированная' },
        ]
       },
       {
        label: 'Опыт руководителя',
        key: 'sub.managersExperience',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Высшее звено' },
            {value:'Среднее звено' },
            {value:'Низшее звено' },
        ]
       }, 
       {
        label: 'Религиозные убеждения',
        key: 'sub.religiousBeliefs',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Традиционные' },
            {value:'Радикальные' },
            {value:'Светские' },
        ]
       }, 
       {
        label: 'Уровень отмеченных достижений',
        key: 'sub.levelOfNotedAchievements',
        hasChildren:false,
        id: getRandomId(),
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
        hasChildren:false,
        id: getRandomId(),
       },
       {
        label: 'Масштаб видения',
        key: 'sub.scopeOfVision',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Стратегическое (глобальное)' },
            {value:'Тактическое' },
            {value:'Узкоспециализированное' },
        ]
       },
       {
        label: 'Тип лидерства',
        key: 'sub.leadershipType',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Харизматический' },
            {value:'Традиционный' },
            {value:'Героический' },
        ]
       },
       {
        label: 'Отношение к воинской службе',
        key: 'sub.militaryService',
        hasChildren:false,
        id: getRandomId(),
        list: [
            {value:'Служил' },
            {value:'Не служил' },
            {value:'Военная кафедра' },
            {value:'Участие в военных действиях' },
        ]
       },
    ] as IListCrieria[],
    listTable : [] as IFormState[],
    searhForm: {} as ISearchForm
    
  }),
  getters: {
    formState: (state) => state.form,
    stateRef: (state) => state.rulesRef,
    mainKey: (state) => state.mainKeys,
    subKey: (state) => state.subKeys,
    columns: (state) => state.columnsTitle,
    listCriteria: (state) => state.mainListCriteria,
    list: (state) => state.listTable,
    searchForm: (state) => state.searhForm
  },
  actions: {
    updatedForm(update: string, actions: 'main' | 'sub' ) {        
          const newKeys = {
            [update]: ''
          }          
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
      this.listCriteria.push(newCriteria)
    },
    addListCriteria(criteria: string, list: IValue) {
      const criteriaIndex = this.listCriteria.findIndex(e => e.label === criteria);
      if (criteriaIndex !== -1) {
        if (Array.isArray(this.listCriteria[criteriaIndex].list)) {          
          this.listCriteria[criteriaIndex].list?.push(list)
        } else {
          this.listCriteria[criteriaIndex].list = [list];
        }
      }

    },
    setTable(newList: IFormState[]) {
      this.listTable = newList
    },
    setSeacrhForm(val: ISearchForm) {
      this.searhForm = val
    }
  },
})