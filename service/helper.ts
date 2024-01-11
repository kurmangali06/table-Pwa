import type { IMainInfo, KeysOfMainIMainInfo } from "~/interface";

export function getRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
} 
export function checkKey(e: string, actions: 'main' | 'sub'): string {
    if(actions === 'main') {
        const list  = e.split('.')
        if(list[0] === 'main')
        return list[1]
    return ''
    } else {
        const list  = e.split('.')
        if(list[0] === 'sub')
        return list[1]
    return ''
    }
 
}

export function translateName(name: KeysOfMainIMainInfo): string {

        switch (name) {
            case 'gender': 
             return 'Пол';
            case 'nationality': 
             return 'Национальность';
            case 'education': 
             return 'Образование';
            case 'fieldOfActivity': 
             return 'Сфера деятельности';
            case 'experience': 
             return 'Опыт работы';
            case 'placeOfBirth': 
             return 'Место рождения';
             case 'academicDegree': 
             return 'Ученая степен';
            case 'fameLevel': 
             return 'Уровень известности';
            case 'levelOfProfessionalism': 
             return 'Уровень профессионализма';
            case 'reputation': 
             return 'Репутация';
            case 'managersExperience': 
             return 'Опыт руководителя';
            case 'religiousBeliefs': 
             return 'Религиозные убеждения';
            case 'levelOfNotedAchievements': 
             return 'Уровень отмеченных достижений';
            case 'scopeOfVision': 
             return 'Масштаб видения';
            case 'leadershipType': 
             return 'Тип лидерства';
            case 'militaryService': 
             return 'Отношение к воинской служба';
            default: 
             return ''
        }


}
export const fieldOfActivityList = [
    {value:'Экономика, бизнес ' },
    {value:'Культура, спорт' },
    {value:'Наука, образование' },
    {value:'Государство, общество' },
]
export const mainListCrieria =  reactive([
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
        { value: 'Мужской', label: 'Мужской' },
        {value: 'Женский', label: 'Женский'},
    ]
   },
   {
    label: 'Национальность',
    key: 'main.nationality',
    list: [
        {value:'Казах' },
        {value:'Русский (славянин)' },
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
        {value:'Западное ' },
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
        {value:'Экономика, бизнес ' },
        {value:'Культура, спорт' },
        {value:'Наука, образование' },
        {value:'Государство, общество' },
    ]
   },
   {
    label: 'Опыт работы',
    key: 'main.experience',
    list: [
        {value:'Госслужба ' },
        {value:'Квазигос' },
        {value:'Частная организация' },
        {value:'Международная/зарубежная' },
    ]
   },
   {
    label: 'Место рождения',
    key: 'main.placeOfBirth',
    list: [
        {value:'Север ' },
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
        {value:'Да ' },
        {value:'Нет' },
    ]
   }, 
   {
    label: 'Уровень известности',
    key: 'sub.fameLevel',
    list: [
        {value:'Общеизвестный ' },
        {value:'Неизвестный' },
        {value:'В своем кругу' },
    ]
   }, 
   {
    label: 'Уровень профессионализма',
    key: 'sub.levelOfProfessionalism',
    list: [
        {value:'Международный  ' },
        {value:'Национальный ' },
        {value:'Региональный' },
    ]
   },
   {
    label: 'Репутация',
    key: 'sub.reputation',
    list: [
        {value:'Безупречная  ' },
        {value:'Скандальная/дискредитированная ' },
    ]
   },
   {
    label: 'Опыт руководителя',
    key: 'sub.managersExperience',
    list: [
        {value:'Высшее звено  ' },
        {value:'Среднее звено ' },
        {value:'Низшее звено ' },
    ]
   }, 
   {
    label: 'Религиозные убеждения',
    key: 'sub.religiousBeliefs',
    list: [
        {value:'Традиционные   ' },
        {value:'Радикальные ' },
        {value:'Светские ' },
    ]
   }, 
   {
    label: 'Уровень отмеченных достижений',
    key: 'sub.levelOfNotedAchievements',
    list: [
        {value:'Городской/районный   ' },
        {value:'Областной ' },
        {value:'Республиканский ' },
        {value:'Международный ' },
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
])
