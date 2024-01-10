<template >
    <div  v-if="!loading">

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
        <a-table 
         :dataSource="list" :columns="columnsTitle"  :scrollToFirstRowOnChange="true" :scroll="{x :100}"    :pagination="{ pageSize: 50 }"	  >
          <template #emptyText>Данных нет</template>
       
          <template #bodyCell="{ column, text , record}">
            
            <template v-if="column.dataIndex === 'mainName'">
              <NuxtLink @click="editModal(record)">{{ record.main.fullName }}</NuxtLink>
            </template>
            <template v-else-if="column.dataIndex === 'position'">
             {{ record.main.position }}
            </template>
            <template v-else-if="column.dataIndex === 'gender'">
              {{ record.main.gender }}
             </template>
             <template v-else-if="column.dataIndex === 'nationality'">
              {{ record.main.nationality }}
             </template>
             <template v-else-if="column.dataIndex === 'education'">
              {{ record.main.education }}
             </template>
             <template v-else-if="column.dataIndex === 'fieldOfActivity'">
              {{ record.main.fieldOfActivity }}
             </template>
             <template v-else-if="column.dataIndex === 'experience'">
              {{ record.main.experience }}
             </template>
             <template v-else-if="column.dataIndex === 'placeOfBirth'">
              {{ record.main.placeOfBirth }}
             </template>
             <template v-else-if="column.dataIndex === 'academicDegree'">
              {{ record.sub.academicDegree }}
             </template>
             <template v-else-if="column.dataIndex === 'fameLevel'">
              {{ record.sub.fameLevel }}
             </template>
             <template v-else-if="column.dataIndex === 'levelOfProfessionalism'">
              {{ record.sub.levelOfProfessionalism }}
             </template>
             <template v-else-if="column.dataIndex === 'reputation'">
              {{ record.sub.reputation }}
             </template>
             <template v-else-if="column.dataIndex === 'managersExperience'">
              {{ record.sub.managersExperience }}
             </template>
             <template v-else-if="column.dataIndex === 'religiousBeliefs'">
              {{ record.sub.managersExperience }}
             </template>
             <template v-else-if="column.dataIndex === 'levelOfNotedAchievements'">
              {{ record.sub.levelOfNotedAchievements }}
             </template>
             <template v-else-if="column.dataIndex === 'familyStatus'">
              {{ record.sub.familyStatus }}
             </template>
             <template v-else-if="column.dataIndex === 'amountOfChildren'">
              {{ record.sub.amountOfChildren }}
             </template>
             <template v-else-if="column.dataIndex === 'scopeOfVision'">
              {{ record.sub.scopeOfVision }}
             </template>
             <template v-else-if="column.dataIndex === 'leadershipType'">
              {{ record.sub.leadershipType }}
             </template>
             <template v-else-if="column.dataIndex === 'militaryService'">
              {{ record.sub.militaryService }}
             </template>
          </template>
        </a-table>
        <a-row>
          <a-col :span="24">
            <a-statistic title="Итого" :value="count" >
              <template #suffix>
                человек
              </template>
            </a-statistic>
          </a-col>
          </a-row>
      </div>
    </div>

    <a-space v-else class="spin">
      <a-spin size="small" />
      <a-spin />
      <a-spin size="large" />
    </a-space>
    <a-button type="dashed" @click="clearDate">Clear</a-button>
    <addDate v-if="showModal" v-model:open="showModal"  :info="currentItem"/>
</template>


<script setup lang="ts">
import {  getAllDataFromIndexedDB,clearIndexedDB, arrayLength } from '@/service/IndexedDBService'
import { ref, onMounted } from 'vue';
import addDate from '~/components/modal/addDate.vue';
import {type IFormState} from '@/interface/index'
import {  columnsTitle } from '~/service/table';

const loading = ref(false)
const list = ref<IFormState[]>([])
const showModal = ref<boolean>(false);
const search = ref<string>('')
const currentItem = ref()
const count = ref(0)

function getDate() {
  loading.value = true
  const resPromise = getAllDataFromIndexedDB()
  const resCount = arrayLength()
  resPromise.then((res) => {
    list.value = res.map((e: IFormState) => {
    return {
      key: e.id,
      ...e
    } 
  })
  resCount.then((res) => {
    if(res)
    count.value = res
  })
}).catch((error) => {
  console.error('Error:', error);
}).finally(() => {
  loading.value = false
});
}

async function clearDate() {
  await clearIndexedDB()
  getDate()
}


function openModal() {
  currentItem.value = null
  showModal.value = true;
}
function editModal(value: any) {
  currentItem.value = value
  showModal.value = true;

}

function onSearch(searchValue: string) {
  if(!searchValue)
   getDate()
  list.value = list.value.filter(person => person.main.fullName.includes(searchValue));
  count.value = list.value.length
}


watch(() => showModal.value, () => {
  if(showModal.value === false)
  getDate()
})

onMounted(() => {
  getDate()
})
</script>

<style lang="css" scoped>


.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
}
.spin {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>