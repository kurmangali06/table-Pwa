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
                            <BaseSelect v-if="item.list" v-model:value="formState.main[checkKey(item.key, 'main')]" :options-list="item.list" placeholder="" />
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
import { checkKey, mainListCrieria } from '~/service/helper';


const emit = defineEmits(['update:open', 'criteriaParams'])

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

} as IFormState)
const mainCriteria  = ref<IListCrieria[]>([])
const subCriteria  = ref<IListCrieria[]>([])

function onSubmit() {
    emit('criteriaParams', formState)
    hide()
}
onBeforeMount(() => {
    mainCriteria.value = mainListCrieria.filter(item => item.key.startsWith('main.')).filter((e) => e.list?.length);
    subCriteria.value = mainListCrieria.filter(item => item.key.startsWith('sub.')).filter((e) => e.list?.length);; 
})
</script>
<style lang="css" scoped>
    .btn {
        margin-top: 20px;
    }
</style>