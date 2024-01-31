<template >
    <div >

      <a-card class="title">
        <div class="title_sub">
          <div>
            <a-input-search
            v-model:value="search"
            placeholder="Поиск по ФИО"
            enter-button
            :disabled="loading"
            allow-clear
            @search="onSearch"
            />
          <div style="height: 10px;"></div>
          <a-button type="default" :disabled="loading"  @click.stop="openModal()">Создать</a-button>
            <a-button type="default" :disabled="loading || !list.length" style="margin-left: 10px;" @click="openSearhModal()">Поиск по критериям</a-button>
            <a-button type="primary"  :disabled="loading" style="margin-left: 10px;" @click="exportToExcel">Скачать в Excel </a-button>
            <a-button type="dashed" style="margin-left: 10px;" @click="clearDate">Очистить таблицу</a-button>
          </div>

          <div class="clearfix">
              <a-upload :accept="rulesByFile" :file-list="fileList" :before-upload="beforeUpload" @remove="handleRemove">
                <a-button>
                  <upload-outlined></upload-outlined>
                  Загрузить Excel
                </a-button>
              </a-upload>
              <a-button
                type="primary"
                :disabled="!fileList?.length"
                :loading="uploading"
                style="margin-top: 16px"
                @click="handleUpload"
              >
                {{ uploading ? 'Загрузка' : 'Начать загрузку' }}
              </a-button>
          </div>
        </div>

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


    <addDate v-if="showModal" v-model:open="showModal"  :info="currentItem"/>
    <addDate v-if="showModalArchive" v-model:open="showModalArchive"  :info="currentItemArchive" mode="viewing"/>
    <ModalGlobalSearch v-if="showSearch" v-model:open="showSearch" @criteria-params="getParams" :params="searchFilterParams" />
</template>


<script setup lang="ts">
import {  getAllDataFromIndexedDB,clearIndexedDB, arrayLength, addDataToIndexedDB, getAllStatusArchival } from '@/service/IndexedDBService'
import { ref, onMounted } from 'vue';
import addDate from '~/components/modal/addDate.vue';
import {type IColumn, type IFormState, type ISearchForm} from '@/interface/index'
import {  rulesByFile } from '~/service/table';
import { checkKeyFormObject, getRandomId, transformExcellToArray, translateName } from '~/service/helper';
import { Excel } from "antd-table-saveas-excel";
import * as XLSX from 'xlsx';
import type { UploadProps } from 'ant-design-vue';

const loading = ref(false)
const uploading = ref<boolean>(false);

const list = ref<IFormState[]>([])
const listArchive = ref<IFormState[]>(([]))
const showModal = ref<boolean>(false);
const showModalArchive = ref<boolean>(false);
const search = ref<string>('')
const currentItem = ref()
const currentItemArchive = ref()
const count = ref(0)
const fileList = ref<UploadProps['fileList']>([]);
const showSearch = ref(false)
const activeKey = ref('1');
const searchFilterParams = ref()
const searchParamsMain = ref<string[][]>([])

const tableStore = useTableStore()
const titleTableArhive = ref<IColumn[]>([])

// запросы в бд
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
  tableStore.setTable(list.value)
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

// взаимодествие с модалками
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
// РАБОТА С ФАЙЛОМИ
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


const handleFile = (file: File) => {  
  // Показать индикатор загрузки
  const hideLoading = message.loading('Внимание! Дубликаты не будут добавлены!', 0);
  
  if (!file) {
    hideLoading(); // Скрываем индикатор загрузки, если файл не выбран
    return;
  }

  const reader = new FileReader();
  reader.onload = (e: any) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const firstSheetName = workbook.SheetNames[0]; 
    const worksheet = workbook.Sheets[firstSheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet); 
  
    const res = transformExcellToArray(jsonData)

    let listExcell = res.map(t => checkKeyFormObject(t))
    list.value.forEach(e => {
      listExcell = listExcell.filter(e => e.main.fullName.trim() !== e.main.fullName.trim())
    })

    if (listExcell.length) {
      Promise.all(listExcell.map(t => {
        const formData = {
          ...t,
          id: getRandomId(),
        };
        return addDataToIndexedDB(formData);
      }))
      .then(() => {
        hideLoading(); // Скрываем индикатор загрузки после успешного выполнения
        message.success('Таблица excell добавлено');
        getDate();
      })
      .catch(error => {
        hideLoading(); // Скрываем индикатор загрузки в случае ошибки
        message.error('Ошибка');
      });
    } else {
      hideLoading(); // Скрываем индикатор загрузки, если данные уже имеются
      message.error('Данные уже имеются! Проверьте, чтобы ФИО не совпадали с данной таблицей');
    }
  };

  reader.readAsArrayBuffer(file);
};
const handleUpload = () => {
  fileList.value?.forEach(e => {
    handleFile(e as  any)
    
  })
  
}
const handleRemove: UploadProps['onRemove'] = file => {
  if(fileList.value) {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
  }
};

const beforeUpload: UploadProps['beforeUpload'] = file => {
  fileList.value = [...(fileList.value || []), file];
  return false;
};


// ПОИСК
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
function onSearch(searchValue: string) {
  if(!searchValue)
   getDate()
   list.value = list.value.filter(person => 
    person.main.fullName?.toLowerCase().includes(searchValue.toLowerCase())
  );
  count.value = list.value.length
}

watch(() => search.value, () => {
  if(search.value.length === 0)
    getDate()
})

function handleClose(removedTag: string) {
    searchParamsMain.value =  searchParamsMain.value.filter(e => e[1] !== removedTag)
}

function fetchSearchParams(form: ISearchForm) {
  const searchList = Object.entries(form).filter(e => e[1] !== '' && e[1] !== undefined);
  searchParamsMain.value = searchList

}
watch(() => searchParamsMain.value, () => {
  filterData(searchParamsMain.value)
})

watch(() => showModal.value, () => {
  if(showModal.value === false)
    getDate(searchFilterParams.value)
})

watch(() => showModalArchive.value, () => {
  if(showModalArchive.value === false)
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
  tableStore.setSeacrhForm(filterParam as ISearchForm)
   getDate(filterParam)
   
}

onMounted(() => {
  if(tableStore.list.length) {
    list.value = tableStore.list
    fetchSearchParams(tableStore.searchForm)
  } else {
    getDate()
  }
  titleTableArhive.value = tableStore.columnsTitle
})
</script>

<style lang="css" scoped>


.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
}
.title_sub {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  max-height: 100px;
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
.clearfix {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>