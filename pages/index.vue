<template >
    <div >
      <a-card class="title">
        <a-input-search
        v-model:value="search"
        placeholder="Поиск по ФИО"
        enter-button
        allow-clear
        @search="onSearch"
      />
      <div style="height: 10px;"></div>
        <a-button type="default"  @click="openModal">Создать</a-button>
      </a-card>
      <div class="table">
        <a-table @change="selecteted" :dataSource="list" :columns="columnsTitle" bordered  >
          <template #emptyText>Данных нет</template>
        </a-table>
      </div>

    </div>
    <a-button type="dashed" @click="clearDate" html-type="submit">Clear</a-button>
    <BaseModal v-model="showModal" title="Добавление данных" @close-modal="closeModal" >
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
        <a-input v-model:value="formState.fullName"  />
      </a-form-item>
      <a-form-item
      label="Должность"
      v-bind="validateInfos.position"
    >
      <a-input v-model:value="formState.position" />
    </a-form-item>
    <a-form-item
      label="Пол"
      v-bind="validateInfos.gender"
    >
      <BaseSelect v-model:value="formState.gender" :options-list="genderList" placeholder="выберите пол" />
    </a-form-item>
    <a-form-item
        label="Национальность"
        v-bind="validateInfos.nationality"
      >
    <BaseSelect v-model:value="formState.nationality" :options-list="nationalityList" placeholder="выберите национальность" />
   </a-form-item>
    <a-form-item
    label="Образование"
      v-bind="validateInfos.education"
      >
      <BaseSelect v-model:value="formState.education" :options-list="educationList" placeholder="выберите образование" />
    </a-form-item>
    <a-form-item
      label="Сфера деятельности"
      v-bind="validateInfos.fieldOfActivity"
        >
      <BaseSelect v-model:value="formState.fieldOfActivity" :options-list="fieldOfActivityList" placeholder="выберите cферу деятельности" />
    </a-form-item>
    <a-form-item
      label="Опыт работы"
      v-bind="validateInfos.experience"
      >
      <BaseSelect v-model:value="formState.experience" :options-list="experienceList" placeholder="выберите опыт работы" />
      </a-form-item>
      <a-form-item
        label="Место рождения"
        v-bind="validateInfos.placeOfBirth"
      >
      <BaseSelect v-model:value="formState.placeOfBirth" :options-list="placeOfBirthList" placeholder="выберите опыт работы" />
      </a-form-item>
      <a-divider dashed  plain orientation="left"><a-typography-title :level="5">Дополнительная информация</a-typography-title></a-divider>
      <a-form-item
        label="Ученая степень"
       >
        <BaseSelect v-model:value="formState.academicDegree" :options-list="academicDegreeList" placeholder="выберите из списка " />
      </a-form-item>
      <a-form-item
        label="Уровень известности"
        >
        <BaseSelect v-model:value="formState.fameLevel" :options-list="fameLevelList" placeholder="выберите из списка " />
      </a-form-item>
      <a-form-item
        label="Уровень профессионализма"
        >
        <BaseSelect v-model:value="formState.levelOfProfessionalism" :options-list="levelOfProfessionalismList" placeholder="выберите из списка " />
      </a-form-item>
      <a-form-item
      label="Репутация"
      >
      <BaseSelect v-model:value="formState.reputation" :options-list="reputationList" placeholder="выберите из списка " />
    </a-form-item>
    <a-form-item
      label="Опыт руководителя"
      >
      <BaseSelect v-model:value="formState.managersExperience" :options-list="managersExperienceList" placeholder="выберите из списка " />
    </a-form-item>
    <a-form-item
      label="Религиозные убеждения"
      >
      <BaseSelect v-model:value="formState.religiousBeliefs" :options-list="religiousBeliefsList" placeholder="выберите из списка " />
    </a-form-item>
    <a-form-item
      label="Уровень отмеченных достижений"
      >
      <BaseSelect v-model:value="formState.levelOfNotedAchievements" :options-list="levelOfNotedAchievementsList" placeholder="выберите из списка " />
    </a-form-item>
    <a-form-item
      label="Семейное положение"
      >
      <BaseSelect v-model:value="formState.familyStatus" :options-list="familyStatusList" placeholder="выберите из списка " />
     </a-form-item>
     <a-form-item
        label="Количество детей"
        >
        <a-input v-model:value.number="formState.amountOfChildren"  />
    </a-form-item>
    <a-form-item
      label="Масштаб видения"
      >
      <BaseSelect v-model:value="formState.scopeOfVision" :options-list="scopeOfVisionList" placeholder="выберите из списка " />
    </a-form-item>
    <a-form-item
        label="Тип лидерства"
        >
        <BaseSelect v-model:value="formState.leadershipType" :options-list="leadershipTypeList" placeholder="выберите из списка " />
    </a-form-item>
    <a-form-item
      label="Отношение к воинской служб"
      >
      <BaseSelect v-model:value="formState.militaryService" :options-list="militaryServiceList" placeholder="выберите из списка " />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset:4, span: 24 }">
        <a-button type="primary" html-type="submit" class="btn">Изменить критерии</a-button>
        <a-button type="default" @click.prevent="onSubmit" class="btn">Cохранить</a-button>
        <a-button type="default"  class="btn" @click="closeModal">Отмена</a-button>
        <a-button type="primary" html-type="submit">Перенести в архив</a-button>
     </a-form-item>      
    </a-form>
    </BaseModal>
</template>


<script setup lang="ts">
import { addDataToIndexedDB, getAllDataFromIndexedDB,clearIndexedDB } from '@/service/IndexedDBService'
import { ref, onMounted, computed } from 'vue';
import {  genderList, getRandomId, nationalityList, educationList, fieldOfActivityList, experienceList, placeOfBirthList, 
        academicDegreeList, fameLevelList, levelOfProfessionalismList, reputationList, managersExperienceList, religiousBeliefsList,
        levelOfNotedAchievementsList, familyStatusList, scopeOfVisionList, leadershipTypeList, militaryServiceList } from '~/service/helper';
import {type IFormState} from '@/interface/index'
import { Form } from 'ant-design-vue';
import { rulesRef, columnsTitle } from '~/service/table';


const list = ref<IFormState[]>([])
const showModal = ref<boolean>(false);
const search = ref<string>('')
const useForm = Form.useForm;
const formState = reactive<IFormState>({
  fullName: '',
  position: '',
  gender: '',
  nationality: '',
  education: '',
  fieldOfActivity: '',
  experience: '',
  placeOfBirth: '',
  id: '',
  // доп информация не обязательно
  academicDegree: '',
  levelOfProfessionalism: '',
  reputation: '',
  managersExperience: '',
  levelOfNotedAchievements: '',
  familyStatus: '',
  amountOfChildren: 0,
  scopeOfVision: '', 
  leadershipType: ''
})

const { resetFields, validate, validateInfos } = useForm(formState, rulesRef);
function getDate() {
  const resPromise = getAllDataFromIndexedDB()
  resPromise.then((res) => {
    list.value = res.map((e: IFormState) => {
    return {
      key: e.id,
      ...e
    } 
  })
}).catch((error) => {
  console.error('Error:', error);
});
}

async function clearDate() {
  await clearIndexedDB()
  getDate()
}


function openModal() {
  showModal.value = true;
}
function closeModal() {
  resetFields()
  showModal.value = false;
}
function onSearch(searchValue: string) {
  if(!searchValue)
   getDate()
  list.value = list.value.filter(person => person.fullName.includes(searchValue));
  
}
async function onSubmit  (){
  const body = {
   ...formState,
    id: getRandomId()
  }
  validate()
  .then(async() => {
      const addedItemId = await addDataToIndexedDB(body);
        console.log(`Added object with ID: ${addedItemId} to IndexedDB`);
        closeModal()
        resetFields()
        getDate()
    })
    .catch(err => {
      console.log('error', err);
    });

};

function selecteted(e: any) {
  console.log(e);
  
}

onMounted(() => {
  getDate()
})
</script>

<style lang="css" scoped>
.btn {
  margin-right: 10px;
}
.table {
  width: 100%;
  overflow-y: auto;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
}
</style>