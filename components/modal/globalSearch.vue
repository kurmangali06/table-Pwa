<template >
    <BaseModal v-bind="$attrs" :width="1000" title="Поиск по критериям" @hide="hide" >
        <template #content>
            <a-form 
            :model="formState"
            name="dynamic_rule"
            :label-col="{ span: 8}"
            :wrapper-col="{ span: 16 }"
            >
            <a-divider dashed  plain orientation="left"><a-typography-title :level="5">Основная информация</a-typography-title></a-divider>
                <template v-for="(item, index) in mainCriteria" :key="index">
                        <a-form-item
                            :label="item.label"
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
                                v-model:value="formState.main[checkKey(item.key, 'main')]" 
                                :options-list="item.list" placeholder="" />
                           
                         </template>
                            <a-input v-else v-model:value="formState.main[checkKey(item.key, 'main')]"  />
                    </a-form-item> 
                      
                </template>
                <a-collapse v-model:activeKey="activeKey" collapsible="header">
                    <a-collapse-panel key="1"  header="Дополнительная информация">
                        <template v-for="(item, index) in subCriteria" :key="index">
                            <a-form-item
                            :label="item.label"
                            >
                            <BaseSelect v-if="item.list" v-model:value="formState.sub[checkKey(item.key, 'sub')]" :options-list="item.list"  />
                            <a-input v-else v-model:value="formState.sub[checkKey(item.key, 'sub')]"  />
                        </a-form-item>                 
                    </template>
                    </a-collapse-panel>
                  </a-collapse>
             
          
                <a-form-item :wrapper-col="{ offset:12, span: 24 }">
                    <a-button type="default" @click="onSubmit" class="btn">Поиск</a-button>
                 </a-form-item>  
            </a-form>
        </template>
    </BaseModal>
</template>
<script lang="ts" setup>
import type { IListCrieria, IFormState } from '~/interface';
import { checkKey } from '~/service/helper';


const emit = defineEmits(['update:open', 'criteriaParams'])
const tableStore = useTableStore()
const props = defineProps({
    params: {
        type: Object as PropType<IFormState>,
        default: () => ({})
    }
})
function hide() {
    emit('update:open', false);
}
const activeKey = ref(['0']);
const formState = reactive({
main: {
    gender: '',
    nationality: '',
    education: '',
    fieldOfActivity: '',
    experience: '',
    placeOfBirth: '',
    placeOfInfluence: '',
    zhus: ''
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

} as IFormState)
const mainCriteria  = ref<IListCrieria[]>([])
const subCriteria  = ref<IListCrieria[]>([])

function onSubmit() {
    emit('criteriaParams', formState)
    hide()
}
function fetchProps() { 
    const mainList =  Object.entries(props.params)
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
       formStateSubList.forEach(e => {
        const findElementSub = formStateList.find(p => p[0] === e[0])
        if(findElementSub) {
                formState.sub[findElementSub[0]] = e[1]
            } else {
                formState.sub[e[0]] = e[1]
            }
       })
       
}
watch(() => props.params,() => {
    if(props.params)
     fetchProps()
})
console.log(tableStore.listTable);
onMounted(() => {
    if(props.params) {
        fetchProps()
    }
    mainCriteria.value = tableStore.listCriteria.filter(item => item.key.startsWith('main.')).filter((e) => e.list?.length) as IListCrieria[];
    subCriteria.value = tableStore.listCriteria.filter(item => item.key.startsWith('sub.')).filter((e) => e.list?.length) as IListCrieria[];
})
</script>
<style lang="css" scoped>
    .btn {
        margin-top: 20px;
    }
</style>