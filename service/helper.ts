export function getRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
} 

export const genderList = [
    { value: 'Мужской', label: 'Мужской' },
    {value: 'Женский', label: 'Женский'},
]

export const nationalityList = [
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

export const educationList = [
    {value:'Западное ' },
    {value:'Российское' },
    {value:'Китайское' },
    {value:'Исламские страны' },
    {value:'Турецкое' },
    {value:'Казахстанское' },
    {value:'Азиатское' },
]

export const fieldOfActivityList = [
    {value:'Экономика, бизнес ' },
    {value:'Культура, спорт' },
    {value:'Наука, образование' },
    {value:'Государство, общество' },
]
export const experienceList = [
    {value:'Госслужба ' },
    {value:'Квазигос' },
    {value:'Частная организация' },
    {value:'Международная/зарубежная' },
]

export const placeOfBirthList = [
    {value:'Север ' },
    {value:'Юг' },
    {value:'Запад' },
    {value:'Восток' },
    {value:'Центр' },
    {value:'Зарубеж' },
]
export const academicDegreeList = [
    {value:'Да ' },
    {value:'Нет' },
]
export const fameLevelList = [
    {value:'Общеизвестный ' },
    {value:'Неизвестный' },
    {value:'В своем кругу' },
]
export const levelOfProfessionalismList = [
    {value:'Международный  ' },
    {value:'Национальный ' },
    {value:'Региональный' },
]
export const reputationList = [
    {value:'Безупречная  ' },
    {value:'Скандальная/дискредитированная ' },
]

export const managersExperienceList = [
    {value:'Высшее звено  ' },
    {value:'Среднее звено ' },
    {value:'Низшее звено ' },
]
export const religiousBeliefsList = [
    {value:'Традиционные   ' },
    {value:'Радикальные ' },
    {value:'Светские ' },
]
export const levelOfNotedAchievementsList = [
    {value:'Городской/районный   ' },
    {value:'Областной ' },
    {value:'Республиканский ' },
    {value:'Международный ' },
]

export const familyStatusList = [
    {value:'Женат/замужем' },
    {value:'В разводе ' },
    {value:'Не женат/не замужем' },
    {value:'Вдовец/вдова' },
]

export const scopeOfVisionList = [
    {value:'Стратегическое (глобальное)' },
    {value:'Тактическое' },
    {value:'Узкоспециализированное' },
]
export const leadershipTypeList = [
    {value:'Харизматический' },
    {value:'Традиционный' },
    {value:'Героический' },
]
export const militaryServiceList = [
    {value:'Служил' },
    {value:'Не служил' },
    {value:'Военная кафедра' },
    {value:'Участие в военных действиях' },
]