<template>
    <BaseModal  v-bind="$attrs" :width="1000" :title="titleModal" @hide="hide" >
        <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8}"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
            <a-divider dashed  plain orientation="left"><a-typography-title :level="5">Основная информация</a-typography-title></a-divider>
                <a-form-item
                label="ФИО клиента"
                v-bind="validateInfos.fullName"
                >
                <a-input v-model:value="formState.main.fullName"  />
                </a-form-item>
                <a-form-item
                label="Должность"
                v-bind="validateInfos.position"
            >
                <a-input v-model:value="formState.main.position" />
            </a-form-item>
            <a-form-item
                label="Пол"
                v-bind="validateInfos.gender"
            >
                <BaseSelect v-model:value="formState.main.gender" :options-list="genderList" placeholder="выберите пол" />
            </a-form-item>
            <a-form-item
                label="Национальность"
                v-bind="validateInfos.nationality"
                >
            <BaseSelect v-model:value="formState.main.nationality" :options-list="nationalityList" placeholder="выберите национальность" />
            </a-form-item>
            <a-form-item
            label="Образование"
                v-bind="validateInfos.education"
                >
                <BaseSelect v-model:value="formState.main.education" :options-list="educationList" placeholder="выберите образование" />
            </a-form-item>
            <a-form-item
                label="Сфера деятельности"
                v-bind="validateInfos.fieldOfActivity"
                >
                <BaseSelect v-model:value="formState.main.fieldOfActivity" :options-list="fieldOfActivityList" placeholder="выберите cферу деятельности" />
            </a-form-item>
            <a-form-item
                label="Опыт работы"
                v-bind="validateInfos.experience"
                >
                <BaseSelect v-model:value="formState.main.experience" :options-list="experienceList" placeholder="выберите опыт работы" />
                </a-form-item>
                <a-form-item
                label="Место рождения"
                v-bind="validateInfos.placeOfBirth"
                >
                <BaseSelect v-model:value="formState.main.placeOfBirth" :options-list="placeOfBirthList" placeholder="выберите опыт работы" />
                </a-form-item>

                <a-divider dashed  plain orientation="left"></a-divider>
                <a-collapse v-model:activeKey="activeKey" :bordered="false" style="margin-bottom: 10px;">
                    <a-collapse-panel key="1" header="Дополнительная информация">
                        <a-form-item
                        label="Ученая степень"
                        >
                        <BaseSelect v-model:value="formState.sub.academicDegree" :options-list="academicDegreeList" placeholder="выберите из списка " />
                        </a-form-item>
                        <a-form-item
                        label="Уровень известности"
                        >
                        <BaseSelect v-model:value="formState.sub.fameLevel" :options-list="fameLevelList" placeholder="выберите из списка " />
                        </a-form-item>
                        <a-form-item
                        label="Уровень профессионализма"
                        >
                        <BaseSelect v-model:value="formState.sub.levelOfProfessionalism" :options-list="levelOfProfessionalismList" placeholder="выберите из списка " />
                        </a-form-item>
                        <a-form-item
                        label="Репутация"
                        >
                        <BaseSelect v-model:value="formState.sub.reputation" :options-list="reputationList" placeholder="выберите из списка " />
                    </a-form-item>
                    <a-form-item
                        label="Опыт руководителя"
                        >
                        <BaseSelect v-model:value="formState.sub.managersExperience" :options-list="managersExperienceList" placeholder="выберите из списка " />
                    </a-form-item>
                    <a-form-item
                        label="Религиозные убеждения"
                        >
                        <BaseSelect v-model:value="formState.sub.religiousBeliefs" :options-list="religiousBeliefsList" placeholder="выберите из списка " />
                    </a-form-item>
                    <a-form-item
                        label="Уровень отмеченных достижений"
                        >
                        <BaseSelect v-model:value="formState.sub.levelOfNotedAchievements" :options-list="levelOfNotedAchievementsList" placeholder="выберите из списка " />
                    </a-form-item>
                    <a-form-item
                        label="Семейное положение"
                        >
                        <BaseSelect v-model:value="formState.sub.familyStatus" :options-list="familyStatusList" placeholder="выберите из списка " />
                    </a-form-item>
                    <a-form-item
                        label="Количество детей"
                        >
                        <a-input v-model:value.number="formState.sub.amountOfChildren"  />
                    </a-form-item>
                    <a-form-item
                        label="Масштаб видения"
                        >
                        <BaseSelect v-model:value="formState.sub.scopeOfVision" :options-list="scopeOfVisionList" placeholder="выберите из списка " />
                    </a-form-item>
                    <a-form-item
                        label="Тип лидерства"
                        >
                        <BaseSelect v-model:value="formState.sub.leadershipType" :options-list="leadershipTypeList" placeholder="выберите из списка " />
                    </a-form-item>
                    <a-form-item
                        label="Отношение к воинской служб"
                        >
                        <BaseSelect v-model:value="formState.sub.militaryService" :options-list="militaryServiceList" placeholder="выберите из списка " />
                    </a-form-item>
                    </a-collapse-panel>
                </a-collapse>
  
            <a-form-item :wrapper-col="{ offset:4, span: 24 }">
                <a-button type="primary" html-type="submit" class="btn">Изменить критерии</a-button>
                <a-button type="default" @click.prevent="onSubmit" class="btn">{{titleBtn}}</a-button>
                <a-button type="default"  class="btn" @click="hide">Отмена</a-button>
                <a-button type="primary" html-type="submit">Перенести в архив</a-button>
            </a-form-item>      
        </a-form>
    </BaseModal>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { addDataToIndexedDB, updateDataInIndexedDB } from '@/service/IndexedDBService'
import {  genderList, getRandomId, nationalityList, educationList, fieldOfActivityList, experienceList, placeOfBirthList, 
        academicDegreeList, fameLevelList, levelOfProfessionalismList, reputationList, managersExperienceList, religiousBeliefsList,
        levelOfNotedAchievementsList, familyStatusList, scopeOfVisionList, leadershipTypeList, militaryServiceList } from '@/service/helper';
import {type IFormState} from '@/interface/index'
import { Form } from 'ant-design-vue';
import { rulesRef, columnsTitle } from '@/service/table';
import { message } from 'ant-design-vue';

const props = defineProps({
    info: {
        type: Object as PropType<IFormState>,
        default: () => (null),            
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

})
const activeKey = ref(['1']);
const titleModal = computed(() => {
   return  props.info ? 'Редактирование данных' : 'Добавление данных' 
})
const titleBtn = computed(() => {
    return  props.info ? 'Изменить' : 'Cохранить' 
})
const emit = defineEmits(['update:open'])
const { resetFields, validate, validateInfos } = useForm(formState.main, rulesRef);

async function onSubmit(){
  const body = {
   ...formState,
  }
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
      console.log('error', err);
      message.error(err.message);
    });

};
function hide() {
    emit('update:open', false);
    resetFields()
    activeKey.value = ['0']
}
watch(() => props.info,() => {
    if(props.info) {     
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
}, {
    deep: true,
    immediate: true
})
</script>
<style lang="css" scoped>
.btn {
    margin-right: 10px;
  }  
</style>