<template >
    <div >

      <a-card class="title">
        <a-input-search
        v-model:value="search"
        placeholder="Поиск по ФИО"
        enter-button
        :disabled="loading"
        allow-clear
        @search="onSearch"

      />
      <div style="height: 10px;"></div>
        <a-button type="default"  :disabled="loading" @click="openModal">Создать</a-button>
        <a-button type="default" :disabled="loading" style="margin-left: 10px;" @click="openSearhModal">Поиск по критериям</a-button>
        <a-button type="primary"  :disabled="loading" style="margin-left: 10px;" @click="exportToExcel">Скачать в excell</a-button>
        <a-input type="file" style="margin-top: 10px;" :accept="rulesByFile" @change="handleFile" />
      </a-card>
      <a-card>
        <div>
          <a-tag closable @close="handleClose(item[1])" v-for="(item, index) in searchParamsMain" :key="index">{{ translateName(item[0]) }}:  {{ item[1] }}</a-tag>

        </div>
      </a-card>
      <div class="table" v-if="!loading">
        <ConfigProvider :locale="ruRU">
          <a-table 
            :dataSource="list" :columns="columnsTitle"  
            :scrollToFirstRowOnChange="true" 
            :scroll="{x :100}"   
            @change="changePage"
            :pagination="{ pageSize: pageSize, position:['bottomCenter'], pageSizeOptions: ['10', '20', '50', '100'] }" >
            <template #emptyText>
              <a-empty description="Данных нет" />
            </template>
            <template #footer>
              <a-row>
                <a-col :span="24" >
                  <a-statistic title="Итого" :value="count" >
                    <template #suffix>
                      человек
                    </template>
                  </a-statistic>
                </a-col>
                </a-row>
            </template>
            <template #bodyCell="{ column, text , record}">
              
              <template v-if="column.dataIndex === 'fullName'">
                <NuxtLink @click="editModal(record)">{{ record.main.fullName }}</NuxtLink>
              </template>
              <template v-else-if="column.dataIndex === 'position'">
              <div style="width: 300px;">{{ record.main.position }}</div>
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
        </ConfigProvider>
      </div>
      <div v-else class="loading">
        <a-skeleton-button 
          v-for="n in 10" 
          :key="n" 
          active 
          :block="loading" 
          :size=" n === 1 ? 'large' : 'small' " />
      </div>
      
    
    </div>


    <a-button type="dashed" @click="clearDate">Clear</a-button>
    <addDate v-if="showModal" v-model:open="showModal"  :info="currentItem"/>
    <ModalGlobalSearch v-if="showSearch" v-model:open="showSearch" @criteria-params="getParams" />
</template>


<script setup lang="ts">
import {  getAllDataFromIndexedDB,clearIndexedDB, arrayLength, addDataToIndexedDB } from '@/service/IndexedDBService'
import { ref, onMounted } from 'vue';
import addDate from '~/components/modal/addDate.vue';
import {type IFormState} from '@/interface/index'
import {  columnsTitle, rulesByFile } from '~/service/table';
import { checkKeyFormObject, getRandomId, transformExcellToArray, translateName } from '~/service/helper';
import { Excel } from "antd-table-saveas-excel";
import * as XLSX from 'xlsx';
import { ConfigProvider } from 'ant-design-vue';
import ruRU from 'ant-design-vue/es/locale/ru_RU';

const loading = ref(false)
const list = ref<IFormState[]>([])
const showModal = ref<boolean>(false);
const search = ref<string>('')
const currentItem = ref()
const count = ref(0)
const showSearch = ref(false)
const searchParamsMain = ref<string[][]>([])
const pageSize = ref(10)
function getDate(filterData?: any) {
  loading.value = true
  const resPromise = getAllDataFromIndexedDB(filterData)
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
  count.value = 0
  getDate()
}
function exportToExcel() {
  const excelList = list.value.map(e => {
    return {
      ...e.main,
      ...e.sub
    }
  })
    const excel = new Excel();
          excel
            .addSheet("test")
            .addColumns(columnsTitle)
            .addDataSource(excelList, {
              str2Percent: true
            })
            .saveAs("Excel.xlsx");
}

function openModal() {
  currentItem.value = null
  showModal.value = true;
}
function editModal(value: any) {
  currentItem.value = value
  showModal.value = true;

}
function openSearhModal() {
  showSearch.value = true
}
const handleFile = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e: any) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Предполагая, что ваши данные находятся на первом листе
    const firstSheetName = workbook.SheetNames[0]; 
    const worksheet = workbook.Sheets[firstSheetName];

    // Преобразование листа в массив объектов
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);
    
    const res =  transformExcellToArray(jsonData)

    const list =  res.map(t =>  checkKeyFormObject(t))
    if(list.length) {
      Promise.all(list.map(t => {
        const formData = {
          ...t,
          id: getRandomId(),
        };
        return addDataToIndexedDB(formData);
      }))
      .then(() => {
        message.success('Таблица excell добавлено');
        getDate();
      })
      .catch(error => {
        // Handle any errors here
        message.error('Ошибка',);
      });
    }
  };
  reader.readAsArrayBuffer(file);
};
function getParams(e: IFormState) {
  let mainParams: string[][] = []
  let subParams: string[][] = []
  if('main' in e)
     mainParams = Object.entries(e.main).filter(e => e[1] !== '');
  if('sub' in e)
    subParams = Object.entries(e.sub).filter(e => e[1] !== '' && e[1] !== 0)
  searchParamsMain.value = [...mainParams, ...subParams]
}

function changePage(e:any) {
  console.log(e);
  pageSize.value = e.pageSize
}
function handleClose(removedTag: string) {
    searchParamsMain.value =  searchParamsMain.value.filter(e => e[1] !== removedTag)
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

watch(() => searchParamsMain.value, () => {
  if(!searchParamsMain.value.length)
    getDate()
  filterData(searchParamsMain.value)
})

async function filterData(main: string[][]) {    
  const filterParam = main.reduce((acc, item) => {
    return {
      ...acc,
      [item[0]]: item[1]
    }
  }, {})
   getDate(filterParam)
   count.value = list.value.length
}

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
.loading {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
}
</style>