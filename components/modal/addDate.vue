<template>
    <BaseModal v-bind="$attrs" :width="1000"  @hide="hide"    >
        <template #header>
            <a-divider v-if="mode === 'edit'" dashed  plain orientation="left"><a-typography-title :level="4">{{ titleModal }}</a-typography-title></a-divider>
            <a-divider v-else dashed  plain orientation="left"><a-typography-title :level="4">Просмотр данных</a-typography-title></a-divider>
        </template>
        <template #content>
            <a-form 
            :model="formState"
            name="dynamic_rule"
            :label-col="{ span: 8}"
            :wrapper-col="{ span: 16 }"
            >
                <a-divider dashed  plain orientation="left"><a-typography-title :level="5">Основная информация</a-typography-title></a-divider>
                <div v-for="(item, index) in mainCriteria" :key="item.key">
                    <a-form-item
                             v-if="tableStore.stateRef[checkKey(item.key, 'main')]"
                            :label="item.label"
                            :rules="tableStore.stateRef[checkKey(item.key, 'main')]"
                             >
                             <template v-if="item.list">
                                <div v-if="item.hasChildren">
                                    <a-tree-select
                                        v-model:value="formState.main[checkKey(item.key, 'main')]" 
                                        show-search
                                        style="width: 100%"
                                        placeholder="Please select"
                                        allow-clear
                                        tree-default-expand-all
                                        :tree-data="item.list"
                                        tree-node-filter-prop="label"
                                        >
                                        <template #title="{ value: val }">
                                           {{ val }}
                                          </template>
                                    </a-tree-select>
                                </div>
                                <BaseSelect 
                                     v-else
                                    :class="{ 'readOnly': props.mode === 'viewing' }" 
                                    :show-search="props.mode === 'edit'"
                                    v-model:value="formState.main[checkKey(item.key, 'main')]" 
                                    :options-list="item.list" placeholder="" />
                               
                             </template>
                         
                            <a-input v-else :readonly="props.mode === 'viewing'" v-model:value="formState.main[checkKey(item.key, 'main')]"  />
                            <span v-if="errorMessages(checkKey(item.key, 'main'))"  style="color: red;">{{errorMessages(checkKey(item.key, 'main')) }}</span> 
                    </a-form-item> 
                      
                </div>

                <a-collapse v-model:activeKey="activeKey" class="subInfo" collapsible="header">
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
            <a-form-item v-if="props.mode === 'edit'" :wrapper-col="{ offset:6, span: 24 }" style="margin-top: 10px;">
                <a-button type="primary" @click="openModal"  class="btn">Изменить критерии</a-button>
                <a-button type="default" @click="onSubmit" class="btn">{{titleBtn}}</a-button>
                <a-button type="default"  class="btn" @click="hide">Отмена</a-button>
                <a-button type="primary" class="btn" @click="addArchive">Перенести в архив</a-button>
                <a-button type="primary" @click="printPage">Скачать PDF</a-button>
             </a-form-item>
             <a-form-item v-else-if="props.mode === 'viewing'" :wrapper-col="{ offset:10, span: 24 }" style="margin-top: 10px;">
                <a-button type="primary" class="btn" @click="addActive">Перенести в активные</a-button>
             </a-form-item>    
          </template>
    </BaseModal>
    <ModalAddCriteria v-if="criteriaShow" v-model:open="criteriaShow" />
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { addDataToArchive, addDataToIndexedDB, deleteoArchive, updateDataInIndexedDB } from '@/service/IndexedDBService'
import {  checkKey, getRandomId, translateName } from '@/service/helper';
import {type IFormState, type IListCrieria} from '@/interface/index'
import { Form } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import type { PropType } from 'vue';
import lodash from 'lodash'
import { usePDF } from 'vue3-pdfmake';

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
const dateInfoRef = ref();
const emit = defineEmits(['update:open'])
const tableStore = useTableStore()
const errList = ref<any[]>([])
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
        placeOfBirth: '',
        placeOfInfluence: '',
        zhus: '',
        age: ''
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

// валадция ошибок
const errorMessages = computed(() => {
    return(err: string)  => {
    const findItem = errList.value.find((e:any) => e.name === err)
        if(findItem)
            return findItem.errors[0]
    }
})
const titleModal = computed(() => {
   return  props.info ? 'Редактирование данных' : 'Добавление данных' 
})
const titleBtn = computed(() => {
    return  props.info ? 'Изменить' : 'Cохранить' 
})

const { resetFields,   } = useForm(formState.main, tableStore.stateRef, {
    validateOnRuleChange: true
});
const pdfmake = usePDF()
// печать  в пдф
function printPage() {
    const mainInfoByPdf = []
    const subInfoByPdf = []
    for (const [key, value] of Object.entries(formState.main)) {
            if (value) {
                mainInfoByPdf.push([{ text: translateName(key), bold: true }, value]);
            }
    }
    for (const [key, value] of Object.entries(formState.sub)) {
            if (value) {
                subInfoByPdf.push([{ text: translateName(key), bold: true }, value]);
            }
    }
    const content = [];

    if (mainInfoByPdf.length > 0) {
        content.push({
            margin: [0, 50, 0, 0],
            layout: 'lightHorizontalLines',
            table: {
                headerRows: 1,
                widths: ['*', 'auto'],
                body: [
                    [{ text: 'Основная информация', bold: true, fontSize: 16, colSpan: 2, alignment: 'center' }, {}],
                    ...mainInfoByPdf
                ]
            }
        });
    }

    if (subInfoByPdf.length > 0) {
        // Добавляем отступ между таблицами, если обе таблицы присутствуют
        if (content.length > 0) {
            content.push({ text: '', margin: [0, 10, 0, 10] });
        }

        content.push({
            layout: 'lightHorizontalLines',
            table: {
                headerRows: 1,
                widths: ['*', 'auto'],
                body: [
                    [{ text: 'Дополнительная информация', fontSize: 16, bold: true, colSpan: 2, alignment: 'center' }, {}],
                    ...subInfoByPdf
                ]
            }
        });
    }

    // Создание PDF только если есть контент
    if (content.length > 0) {
        pdfmake.createPdf({
            content: content,
            pageSize: 'A4',
            pageOrientation: 'portrait'
        }).download(`${formState.main.fullName}.pdf`);
    } else {
        // Здесь можно обработать случай, когда нет данных для отображения
        message.error("Нет данных для отображения в PDF");
    }
}
async function onSubmit(){
  const body = {
   ...formState,
  }
  try {
    if(props.info.id) {
        body.id = props.info.id
        await updateDataInIndexedDB(props.info.id, body);
        message.success('Успешно изменено');
    } else {
        body.id =  getRandomId()        
        await addDataToIndexedDB(body);
        message.success('Успешно добавлено');
    }
        hide()
        resetFields()
    
  } catch (error) {
          if(error instanceof Error) {
            console.log(error);
            message.error('заполните все обязательные поля');
      }
  }

    

};
// добавление в архив
async function addArchive() {
    const body = {
    ...formState,
    }
    body.status = 'archival'
    await addDataToArchive(body);
        message.success('Успешно добавлено в архив');
    hide()
}
// добавление в активные 
async function addActive() {
    const body = {
    ...formState,
    }
    await deleteoArchive(body.id)
    body.status = 'active'
    await addDataToIndexedDB(body);
        message.success('Успешно добавлено в активные');
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
// динамические добавление пропосов связанно с тем что кретерий могут быть новые
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
       formState.id = props.info.id
       console.log(formState);
       
    mainCriteria.value = tableStore.listCriteria.filter(item => item.key.startsWith('main.')) as IListCrieria[];
    subCriteria.value = tableStore.listCriteria.filter(item => item.key.startsWith('sub.')) as IListCrieria[]; 
       
}
watch(() => props.info,() => {
    if(props.info) {
        fetchProps()
    }
})
// добаление новых кретерий
watch(() => tableStore.formState, (newFormState) => {
    // Глубокое копирование для обновления вложенных объектов
    const updatedFormState = lodash.cloneDeep(newFormState);
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
       formState.id = props.info?.id ? props.info.id: ''
       subList.forEach(e => {
        const findElement = formStateSubList.find(t => t[0] === e[0])
            if(findElement) {
                formState.sub[findElement[0]] = findElement[1]
            } else {
                formState.sub[e[0]] = e[1]
            }
       })
    mainCriteria.value = tableStore.listCriteria.filter(item => item.key.startsWith('main.')) as IListCrieria[];
    subCriteria.value = tableStore.listCriteria.filter(item => item.key.startsWith('sub.')) as IListCrieria[]; 
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