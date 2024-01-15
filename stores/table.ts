import { defineStore } from 'pinia'
import { reactive } from 'vue';
import type { IFormState, RulesRefType } from '~/interface';

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
    } as RulesRefType
  }),
  getters: {
    formState: (state) => state.form,
    stateRef: (state) => state.rulesRef,
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

    }
  },
})