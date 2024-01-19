import type { IFormState, IMainInfo, ISubInfo, KeysOfMainIMainInfo } from "~/interface";

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

export function translateName(name: string): string {
    const tableStore = useTableStore()
    const columnsTitle = tableStore.columns
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
             return 'Ученая степень';
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
             return 'Отношение к воинской службе';
            case 'placeOfInfluence':
                return 'Место влияния'
            case 'zhus':
                    return 'Жуз/Ру'
            case 'age':
                    return 'Возраст'
            default: 
               const findElemnt = columnsTitle.find(e => e.dataIndex === name)
               if(findElemnt)
                return findElemnt.title
                else 
                 return ''
        }
}
export function translateRuByEn(name: string): string {
    switch (name) {
        case 'Пол': 
         return 'gender';
        case 'Национальность': 
         return 'nationality';
        case 'Образование': 
         return 'education';
        case 'Сфера деятельности': 
         return 'fieldOfActivity';
        case 'Опыт работы': 
         return 'experience';
        case 'Место рождения': 
         return 'placeOfBirth';
         case 'Ученая степень': 
         return 'academicDegree';
        case 'Уровень известности': 
         return 'fameLevel';
        case 'Уровень профессионализма': 
         return 'levelOfProfessionalism';
        case 'Репутация': 
         return 'reputation';
        case 'Опыт руководителя': 
         return 'managersExperience';
        case 'Религиозные убеждения': 
         return 'religiousBeliefs';
        case 'Уровень отмеченных достижений': 
         return 'levelOfNotedAchievements';
        case 'Масштаб видения': 
         return 'scopeOfVision ';
        case 'Тип лидерства': 
         return 'leadershipType';
        case 'Отношение к воинской службе': 
         return 'militaryService';
        case 'ФИО': 
         return 'fullName';
        case 'Должность': 
         return 'position';
        case 'Количество детей': 
         return 'amountOfChildren';
        case 'Место влияния':
         return 'placeOfInfluence'
        case 'Жуз':
        case 'Ру':
         return 'zhus'
        case 'Возраст':
            return 'age'
        default:
            return '';
    }
}
export function transformExcellToArray(list: any[]): IFormState[] {
    const res =  list.map(e => {
       const editElement =  Object.entries(e).map(t => {
            return {
                [translateRuByEn(t[0].trim())]: t[1]
            }
        })
        const res =  editElement.reduce((acc, item) => {
           return {
            ...acc,
            ...item,
           }
        }, {})  
    return res   
    })
    return res as IFormState[] 
}

export function checkKeyFormObject(obj: any ): IFormState  {  
    const tableStore = useTableStore()
    const res =  Object.entries(obj).reduce(({ main, sub }: any, [key, value]) => {
      if (tableStore.mainKey.includes(key)) {
        main[key] = value;
      } else if (tableStore.subKey.includes(key)) {
        sub[key] = value;
      }
      return { main, sub };
    }, { main: {} as IMainInfo, sub: {} as ISubInfo });    
    return res as unknown as IFormState

}
export const fieldOfActivityList = [
    {value:'Экономика, бизнес' },
    {value:'Культура, спорт' },
    {value:'Наука, образование' },
    {value:'Государство, общество' },
]

export function isFormState(obj: any): obj is IFormState {
    return obj 
        && 'main' in obj 
        && 'id' in obj 
        && 'sub' in obj 
        && 'status' in obj;
}