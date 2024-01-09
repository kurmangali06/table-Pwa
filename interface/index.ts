export interface IMainInfo {
  fullName: string;
  position: string;
  gender: string;
  nationality :string
  education: string
  fieldOfActivity: string
  experience: string
  placeOfBirth: string
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
}
export interface IFormState {
    main: IMainInfo
    id: string
    sub: ISubInfo
  }

  export interface IValue {
    value: string
  }

  export interface IPercentages {
    value: string
    percentage: number
  }