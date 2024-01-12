export interface IMainInfo {
  fullName: string;
  position: string;
  gender: string;
  nationality :string
  education: string
  fieldOfActivity: string
  experience: string
  placeOfBirth: string
  [key: string]: any
}
export interface ISubInfo {
  academicDegree: string
  fameLevel:string
  levelOfProfessionalism: string
  reputation : string
  managersExperience: string
  religiousBeliefs: string
  levelOfNotedAchievements: string
  familyStatus: string
  amountOfChildren: number
  scopeOfVision: string
  leadershipType: string
  militaryService: string
  [key: string]: any
} 
export type KeysOfMainIMainInfo = keyof IMainInfo
export interface IFormState {
    main: IMainInfo
    id: string
    sub: ISubInfo
    status: 'active' | 'archival'
    [key: string]: any
  }

  export interface IValue {
    value: string
    label?: string
  }

  export interface IPercentages {
    value: string
    percentage: number
  }

 export  interface RulesRefType {
    [key: string]: Array<{ [key: string]: any }>;
}

export interface IListCrieria  {
  label: string
  key: string
  list?: IValue[] 
}