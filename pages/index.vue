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
        <a-button type="default" :disabled="loading" style="margin-left: 10px;" @click="openSearhModal()">Поиск по критериям</a-button>
        <a-button type="primary"  :disabled="loading" style="margin-left: 10px;" @click="exportToExcel">Скачать в excell</a-button>
        <a-input type="file" style="margin-top: 10px;" :accept="rulesByFile" @change="handleFile" />
      </a-card>
      <a-card v-if="searchParamsMain.length">
        <div>
          <a-tag closable @close="handleClose(item[1])" v-for="(item, index) in searchParamsMain" :key="item[0]">{{ translateName(item[0]) }}:  {{ item[1] }}</a-tag>
          <a-button v-if="searchParamsMain.length" type="default"  :disabled="loading" @click="openSearhModal()">Все категорий</a-button>
        </div>
      </a-card>
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="Активные">
          <Table v-if="!loading" :columns="tableStore.columns"  :count="count" :list="list" @edit-modal="editModal"/>
          <div v-else class="loading">
            <a-skeleton-button 
              v-for="n in 10" 
              :key="n" 
              active 
              :block="loading" 
              :size=" n === 1 ? 'large' : 'small' " />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Архивные">
          <Table @edit-modal="editModalArchive" v-if="!loading" :columns="tableStore.columns"  :count="count" :list="listArchive"/>
          <div v-else class="loading">
            <a-skeleton-button 
              v-for="n in 10" 
              :key="n" 
              active 
              :block="loading" 
              :size=" n === 1 ? 'large' : 'small' " />
          </div>
        </a-tab-pane>
      </a-tabs>    
    </div>


    <a-button type="dashed" @click="clearDate">Clear</a-button>
    <addDate v-if="showModal" v-model:open="showModal"  :info="currentItem"/>
    <addDate v-if="showModalArchive" v-model:open="showModalArchive"  :info="currentItemArchive" mode="viewing"/>
    <ModalGlobalSearch v-if="showSearch" v-model:open="showSearch" @criteria-params="getParams" :params="searchFilterParams" />
</template>


<script setup lang="ts">
import {  getAllDataFromIndexedDB,clearIndexedDB, arrayLength, addDataToIndexedDB, getAllStatusArchival } from '@/service/IndexedDBService'
import { ref, onMounted } from 'vue';
import addDate from '~/components/modal/addDate.vue';
import {type IFormState} from '@/interface/index'
import {  rulesByFile } from '~/service/table';
import { checkKeyFormObject, getRandomId, transformExcellToArray, translateName } from '~/service/helper';
import { Excel } from "antd-table-saveas-excel";
import * as XLSX from 'xlsx';

const loading = ref(false)
const list = ref<IFormState[]>([])
const listArchive = ref<IFormState[]>(([]))
const showModal = ref<boolean>(false);
const showModalArchive = ref<boolean>(false);
const search = ref<string>('')
const currentItem = ref()
const currentItemArchive = ref()
const count = ref(0)
const showSearch = ref(false)
const activeKey = ref('1');
const searchFilterParams = ref()
const searchParamsMain = ref<string[][]>([])
const tableStore = useTableStore()
function getDate(filterData?: any) {
  loading.value = true
  const resPromise = getAllDataFromIndexedDB(filterData)
  const archivalData =  getAllStatusArchival()
  resPromise.then((res) => {
    list.value = res.map((e: IFormState) => {
    return {
      key: e.id,
      ...e
    } 
  })
  archivalData.then((res) => {
    listArchive.value =  res.map((e: IFormState) => {
    return {
      key: e.id,
      ...e
    } 
    
  })})
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
            .addColumns(tableStore.columns)
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
function editModalArchive(val: any) {
  currentItemArchive.value = val
  showModalArchive.value = true;
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
  activeKey.value = '1'
  let mainParams: string[][] = []
  let subParams: string[][] = []
  if('main' in e)
     mainParams = Object.entries(e.main).filter(e => e[1] !== '' && e[1] !== undefined);
  if('sub' in e)
    subParams = Object.entries(e.sub).filter(e => e[1] !== '' && e[1] !== 0 && e[1] !== undefined)
  let newParams = [...mainParams, ...subParams];
  if (searchParamsMain.value.length) {
    // Update existing values or add new values
    newParams.forEach(param => {
      const index = searchParamsMain.value.findIndex(existingParam => existingParam[0] === param[0]);
      if (index !== -1) {
        // Update existing value
        searchParamsMain.value[index] = param;
      } else {
        // Add new value
        searchParamsMain.value.push(param);
      }
    });
  } else {
    searchParamsMain.value = newParams;
  }
  if(searchParamsMain.value)
    filterData(searchParamsMain.value)

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

watch(() => searchParamsMain.value, () => {
  filterData(searchParamsMain.value)
})

watch(() => showModal.value, () => {
  if(showModal.value === false)
    getDate(searchFilterParams.value)
})



watch(() => activeKey.value,() => {
  if(activeKey.value == '1')
   count.value = list.value.length
  else
   count.value = listArchive.value.length
})

watch(() => list.value, () => {
  count.value = list.value.length
})

async function filterData(main: string[][]) {    
  const filterParam = main.reduce((acc, item) => {
    return {
      ...acc,
      [item[0]]: item[1]
    }
  }, {})
  searchFilterParams.value = filterParam
   getDate(filterParam)
   console.log(list.value.length);
   
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