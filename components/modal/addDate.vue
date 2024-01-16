<template>
    <BaseModal v-bind="$attrs" :width="1000"  @hide="hide"    >
        <template #header>
            <a-divider v-if="mode === 'edit'" dashed  plain orientation="left"><a-typography-title :level="4">{{ titleModal }}</a-typography-title></a-divider>
            <a-divider v-else dashed  plain orientation="left"><a-typography-title :level="4">Просмотр данных</a-typography-title></a-divider>
        </template>
        <template #content>
            {{ formState }}
            <a-form 
            :model="formState"
            name="dynamic_rule"
            :label-col="{ span: 8}"
            :wrapper-col="{ span: 16 }"
            >
                <a-divider dashed  plain orientation="left"><a-typography-title :level="5">Основная информация</a-typography-title></a-divider>
                <template v-for="(item, index) in mainCriteria" :key="item.key">
                        <a-form-item
                             v-if="tableStore.stateRef[checkKey(item.key, 'main')]"
                            :label="item.label"
                            :rules="tableStore.stateRef[checkKey(item.key, 'main')]"
                             >
                            <BaseSelect 
                                v-if="item.list" 
                                :class="{ 'readOnly': props.mode === 'viewing' }" 
                                :show-search="props.mode === 'edit'"
                                v-model:value="formState.main[checkKey(item.key, 'main')]" 
                                :options-list="item.list" placeholder="" />
                            <a-input v-else :readonly="props.mode === 'viewing'" v-model:value="formState.main[checkKey(item.key, 'main')]"  />
                            <span v-if="errorMessages(checkKey(item.key, 'main'))"  style="color: red;">{{errorMessages(checkKey(item.key, 'main')) }}</span> 
                    </a-form-item> 
                      
                </template>

                <a-collapse v-model:activeKey="activeKey" collapsible="header">
                    <a-collapse-panel key="1"  header="Дополнительная информация">
                        <template v-for="(item, index) in subCriteria" :key="item.key">
                            <a-form-item
                            :label="item.label"
                            >
                            <BaseSelect 
                                v-if="item.list" 
                                :class="{ 'readOnly': props.mode === 'viewing' }"
                                :show-search="props.mode === 'edit'" 
                                v-model:value="formState.sub[checkKey(item.key, 'sub')]" 
                                :options-list="item.list"  />
                            <a-input v-else  
                                :readonly="props.mode === 'viewing'" 
                                v-model:value="formState.sub[checkKey(item.key, 'sub')]"  />
                        </a-form-item>                 
                    </template>
                    </a-collapse-panel>
                  </a-collapse>

                
            </a-form>
        </template>
          <template #footer>
            <a-form-item v-if="props.mode === 'edit'" :wrapper-col="{ offset:8, span: 24 }" style="margin-top: 10px;">
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
import {  checkKey, getRandomId } from '@/service/helper';
import {type IFormState, type IListCrieria} from '@/interface/index'
import { Form } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import type { PropType } from 'vue';
import lodash from 'lodash'

const props = defineProps({
    info: {
        type: Object as PropType<IFormState>,
        default: () => (null),            
    },
    mode: {
        type: String as  PropType<'edit' | 'viewing'>,
        default: 'edit'
    }
})
const emit = defineEmits(['update:open'])
const tableStore = useTableStore()
const errList = ref<any[]>([])
const errorMessages = computed(() => {
    return(err: string)  => {
    const findItem = errList.value.find((e:any) => e.name === err)
        if(findItem)
            return findItem.errors[0]
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

const { resetFields,   } = useForm(formState.main, tableStore.stateRef, {
    validateOnRuleChange: true
});

async function onSubmit(){
  const body = {
   ...formState,
  }
  if(props.info.id) {
        await updateDataInIndexedDB(props.info.id, body);
        message.success('Успешно изменено');
    } else {
        body.id =  getRandomId()        
        await addDataToIndexedDB(body);
        message.success('Успешно добавлено');
    }
        hide()
        resetFields()
    
//   validate()
//   .then(async() => {
//     if(props.info) {
//         await updateDataInIndexedDB(props.info.id, body);
//         message.success('Успешно изменено');
//     } else {
//         body.id =  getRandomId()        
//         await addDataToIndexedDB(body);
//         message.success('Успешно добавлено');
//     }
//         hide()
//         resetFields()
//     })
//     .catch(err => {
//       if('errorFields' in err) {
//         console.log(errList);
        
//         errList.value = err.errorFields
//         message.error('заполните все обязательные поля');
//       }

//     });

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
       const mainList = Object.entries(props.info.main)
       const subList = Object.entries(props.info.sub)
       const formStateList = Object.entries(formState.main)
       const formStateSubList = Object.entries(formState.sub)
       mainList.forEach(e => {
            const findElement = formStateList.find(t => t[0] === e[0])
 
            if(findElement) {
                formState.main[findElement[0]] = e[1]
            } else {
                formState.main[e[0]] = e[1]
            }
       })
       subList.forEach(e => {
        const findElement = formStateSubList.find(t => t[0] === e[0])
            if(findElement) {
                formState.sub[findElement[0]] = e[1]
            } else {
                formState.sub[e[0]] = e[1]
            }
       })
    mainCriteria.value = tableStore.mainListCrieria.filter(item => item.key.startsWith('main.')) as IListCrieria[];
    subCriteria.value = tableStore.mainListCrieria.filter(item => item.key.startsWith('sub.')) as IListCrieria[]; 
       
}
watch(() => props.info,() => {
    if(props.info) {
        fetchProps()
    }
})

watch(() => tableStore.formState, (newFormState) => {
    // Глубокое копирование для обновления вложенных объектов
    const updatedFormState = lodash.cloneDeep(newFormState);
    console.log(updatedFormState);
    
    const mainList = Object.entries(updatedFormState.main)
    const subList = Object.entries(updatedFormState.sub)
    const formStateList = Object.entries(formState.main)
    const formStateSubList = Object.entries(formState.sub)
       mainList.forEach(e => {
            const findElement = formStateList.find(t => t[0] === e[0])
 
            if(findElement) {
                formState.main[findElement[0]] = findElement[1]
            } else {
                formState.main[e[0]] = e[1]
            }
       })
       subList.forEach(e => {
        const findElement = formStateSubList.find(t => t[0] === e[0])
            if(findElement) {
                formState.sub[findElement[0]] = findElement[1]
            } else {
                formState.sub[e[0]] = e[1]
            }
       })
    mainCriteria.value = tableStore.mainListCrieria.filter(item => item.key.startsWith('main.')) as IListCrieria[];
    subCriteria.value = tableStore.mainListCrieria.filter(item => item.key.startsWith('sub.')) as IListCrieria[]; 
    console.log(formState);
    
}, {
    deep:true,
    immediate:true
});
onBeforeMount(() => {
    if(props.info) {     
        fetchProps()
    }

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
  .readOnly {
    pointer-events: none;
  }
</style>