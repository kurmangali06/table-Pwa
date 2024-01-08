<template >
    <div >
      <a-button type="primary" @click="openModal">Добавить</a-button>
      <a-table :dataSource="dataSource" :columns="columns" bordered  >
        <template #emptyText>Данных нет</template>
      </a-table>
    </div>
    <a-button type="dashed" @click="clearDate" html-type="submit">Clear</a-button>
    <BaseModal v-model="showModal" title="Добавление данных" @close-modal="closeModal" >
      <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="ФИО клиента"
        name="fullName"
        :rules="[{ required: true, message: 'Пожалуйста, введите  ФИО пользователя!' }]"
      >
        <a-input v-model:value="formState.fullName" />
      </a-form-item>
      <a-form-item
      label="Должность"
      name="position"
      :rules="[{ required: true, message: 'Пожалуйста, выберите пол!' }]"
    >
      <a-input v-model:value="formState.position" />
    </a-form-item>
    <a-form-item
      label="Пол"
      name="gender"
      :rules="[{ required: true, message: 'Пожалуйста, введите  должность пользователя!' }]"
    >
      <a-input v-model:value="formState.gender" />
    </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
    </BaseModal>
</template>


<script setup lang="ts">
import { addDataToIndexedDB, getAllDataFromIndexedDB,clearIndexedDB } from '@/service/IndexedDBService'
import { ref, onMounted, computed } from 'vue';
import { getRandomId } from '~/service/helper';
import {type IFormState} from '@/interface/index'



const message = ref('');
const list = ref<IFormState[]>([])
const showModal = ref<boolean>(false);
const formState = reactive<IFormState>({
  fullName: '',
  position: '',
  gender: '',
  nationality: '',
  education: '',
  fieldOfActivity: '',
  experience: '',
  placeOfBirth: 0,
  id: ''
})


function getDate() {
  const resPromise = getAllDataFromIndexedDB()
  resPromise.then((res) => {
    list.value = res
}).catch((error) => {
  console.error('Error:', error);
});
}

async function clearDate() {
  await clearIndexedDB()
  getDate()
}
const columns = [
          {
            title: 'ФИО',
            dataIndex: 'fullName',
            key: 'fullName',
          },
          {
            title: 'Должность',
            dataIndex: 'position',
            key: 'position',
          },
          {
            title: 'Пол',
            dataIndex: 'gender',
            key: 'gender',
          },
];
const dataSource = computed(() => {
  return list.value.map((e: IFormState) => {
    return {
      key: e.id,
      fullName: e.fullName,
      gender: e.gender,
      position: e.position
    } 
  })
})

function closeModal() {
  showModal.value = false;
}
function openModal() {
  showModal.value = true;
}
const onFinish = async (values: IFormState) => {
  const body = {
   ...values,
    id: getRandomId()
  }
  try {
        const addedItemId = await addDataToIndexedDB(body);
        console.log(`Added object with ID: ${addedItemId} to IndexedDB`);
        message.value = ''
        getDate()
      } catch (error) {
        console.error('Failed to add object to IndexedDB', error);
      }
  closeModal()
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
onMounted(() => {
  getDate()
})
</script>
<style lang="scss" scoped>
    
</style>