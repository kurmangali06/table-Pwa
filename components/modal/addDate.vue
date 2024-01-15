<template>
    <BaseModal v-bind="$attrs" :width="1000"  @hide="hide"    >
        <template #header>
            <a-divider dashed  plain orientation="left"><a-typography-title :level="4">{{ titleModal }}</a-typography-title></a-divider>
        </template>
        <template #content>
            <a-form 
            :model="formState"
            name="dynamic_rule"
            :key="Object.keys(tableStore.formState).length"
            :label-col="{ span: 8}"
            :wrapper-col="{ span: 16 }"
            >
                <a-divider dashed  plain orientation="left"><a-typography-title :level="5">Основная информация</a-typography-title></a-divider>
                <template v-for="(item, index) in mainCriteria" :key="Object.keys(tableStore.stateRef).length">
                        <a-form-item
                         v-if="tableStore.rulesRef"
                            :label="item.label"
                            :rules="tableStore.stateRef[checkKey(item.key, 'main')]"
                             >
                            <BaseSelect v-if="item.list" v-model:value="formState.main[checkKey(item.key, 'main')]" :options-list="item.list" placeholder="" />
                            <a-input v-else v-model:value="formState.main[checkKey(item.key, 'main')]"  />
                            <span v-if="errorMessages(checkKey(item.key, 'main'))"  style="color: red;">{{errorMessages(checkKey(item.key, 'main')) }}</span> 
                    </a-form-item> 
                      
                </template>

                <a-collapse v-model:activeKey="activeKey" collapsible="header">
                    <a-collapse-panel key="1"  header="Дополнительная информация">
                        <template v-for="(item, index) in subCriteria" :key="Object.keys(tableStore.formState).length">
                            <a-form-item
                            :label="item.label"
                            >
                            <BaseSelect v-if="item.list" v-model:value="formState.sub[checkKey(item.key, 'sub')]" :options-list="item.list"  />
                            <a-input v-else v-model:value="formState.sub[checkKey(item.key, 'sub')]"  />
                        </a-form-item>                 
                    </template>
                    </a-collapse-panel>
                  </a-collapse>

                
            </a-form>
        </template>
          <template #footer>
            <a-form-item :wrapper-col="{ offset:8, span: 24 }" style="margin-top: 10px;">
                <a-button type="primary" @click="openModal"  class="btn">Изменить критерии</a-button>
                <a-button type="default" @click="onSubmit" class="btn">{{titleBtn}}</a-button>
                <a-button type="default"  class="btn" @click="hide">Отмена</a-button>
                <a-button type="primary" @click="addArchive">Перенести в архив</a-button>
             </a-form-item>  
          </template>
    </BaseModal>
    <ModalAddCriteria v-if="criteriaShow" v-model:open="criteriaShow" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { addDataToArchive, addDataToIndexedDB, updateDataInIndexedDB } from '@/service/IndexedDBService'
import {  checkKey, getRandomId, mainListCrieria } from '@/service/helper';
import {type IFormState, type IListCrieria} from '@/interface/index'
import { Form } from 'ant-design-vue';
import {  columnsTitle } from '@/service/table';
import { message } from 'ant-design-vue';
import type { PropType } from 'vue';
import lodash from 'lodash'

const props = defineProps({
    info: {
        type: Object as PropType<IFormState>,
        default: () => (null),            
    },
})
const emit = defineEmits(['update:open'])
const tableStore = useTableStore()
const errList = ref<any[]>([])
const errorMessages = computed(() => {
    return(err: string)  => {
    const findItem = errList.value.find((e:any) => e.name === err)
        if(findItem)
            return findItem.errors[0]
        else return 'Пожалуйста, заполните поле!'
    }
})
const useForm = Form.useForm;
const formState = reactive<IFormState>({
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
})

const mainCriteria  = ref<IListCrieria[]>([])
const subCriteria  = ref<IListCrieria[]>([])
const criteriaShow = ref(false)
const activeKey = ref(['0']);
const titleModal = computed(() => {
   return  props.info ? 'Редактирование данных' : 'Добавление данных' 
})
const titleBtn = computed(() => {
    return  props.info ? 'Изменить' : 'Cохранить' 
})

const { resetFields, validate,  } = useForm(formState.main, tableStore.stateRef, {
    validateOnRuleChange: true
});

async function onSubmit(){
  const body = {
   ...formState,
  }
  if(props.info) {
        await updateDataInIndexedDB(props.info.id, body);
        message.success('Успешно изменено');
    } else {
        body.id =  getRandomId()        
        await addDataToIndexedDB(body);
        message.success('Успешно добавлено');
    }
        hide()
        resetFields()
    
  validate()
  .then(async() => {
    if(props.info) {
        await updateDataInIndexedDB(props.info.id, body);
        message.success('Успешно изменено');
    } else {
        body.id =  getRandomId()        
        await addDataToIndexedDB(body);
        message.success('Успешно добавлено');
    }
        hide()
        resetFields()
    })
    .catch(err => {
      if('errorFields' in err) {
        console.log(errList);
        
        errList.value = err.errorFields
        message.error('заполните все обязательные поля');
      }

    });

};

async function addArchive() {
    const body = {
    ...formState,
    }
    body.status = 'archival'
    await addDataToArchive(body);
        message.success('Успешно добавлено в архив');
    hide()
}
function hide() {
    emit('update:open', false);
    resetFields()
    activeKey.value = ['0']
}
function openModal() {
    criteriaShow.value = true
}

function fetchProps() { 
        formState.sub.academicDegree = props.info.sub.academicDegree;
        formState.sub.amountOfChildren = props.info.sub.amountOfChildren;
        formState.main.education = props.info.main.education;
        formState.main.experience = props.info.main.experience;
        formState.sub.fameLevel = props.info.sub.fameLevel;
        formState.sub.familyStatus = props.info.sub.familyStatus;
        formState.main.fieldOfActivity = props.info.main.fieldOfActivity;
        formState.main.fullName = props.info.main.fullName;
        formState.main.gender = props.info.main.gender;
        formState.id = props.info.id;
        formState.sub.leadershipType = props.info.sub.leadershipType;
        formState.sub.levelOfNotedAchievements = props.info.sub.levelOfNotedAchievements
        formState.main.position = props.info.main.position
        formState.main.nationality = props.info.main.nationality;
        formState.main.placeOfBirth = props.info.main.placeOfBirth;
        formState.sub.levelOfProfessionalism = props.info.sub.levelOfProfessionalism;
        formState.sub.reputation = props.info.sub.reputation;
        formState.sub.managersExperience = props.info.sub.managersExperience;
        formState.sub.religiousBeliefs = props.info.sub.religiousBeliefs;
        formState.sub.scopeOfVision = props.info.sub.scopeOfVision;
        formState.sub.militaryService = props.info.sub.militaryService;
       
}
watch(() => props.info,() => {
    if(props.info) {
        fetchProps()
    }
})

watch(() => tableStore.formState, (newFormState) => {
    // Глубокое копирование для обновления вложенных объектов
    const updatedFormState = lodash.cloneDeep(newFormState);

    // Обновление formState
    Object.assign(formState, updatedFormState);
    mainCriteria.value = mainListCrieria.filter(item => item.key.startsWith('main.'));
    subCriteria.value = mainListCrieria.filter(item => item.key.startsWith('sub.')); 
}, {
    deep:true,
    immediate:true
});
onBeforeMount(() => {
    if(props.info) {     
        fetchProps()
    }
    mainCriteria.value = mainListCrieria.filter(item => item.key.startsWith('main.'));
    subCriteria.value = mainListCrieria.filter(item => item.key.startsWith('sub.')); 
})
</script>
<style lang="css" scoped>
.btn {
    margin-right: 10px;
  }  
  .spin {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>