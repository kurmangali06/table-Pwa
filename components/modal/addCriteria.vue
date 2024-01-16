<template>
    <BaseModal v-bind="$attrs" :width="800" title="Изменить критерии" @hide="hide" >
        <template #content>
            <a-form
            name="basic"
            :label-col="{ span: 12 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            >
            <a-form-item
                label="Дополнительные/Основные"
                >
                <a-switch v-model:checked="switchByMainOfSub" />
            </a-form-item>
            <a-form-item
                label="Критерий"
                >
                <a-select 
                :key="`${listMain.length}${tableStore.mainListCrieria.length}${switchByMainOfSub}`"
                v-model:value="formStateCriteria.name"
                :options="listMain" >
                <template #dropdownRender="{ menuNode: listMain }">
                    <v-nodes :vnodes="listMain" />
                    <a-divider style="margin: 4px 0" />
                    <a-space style="padding: 4px 8px">
                        <a-input  v-model:value="formStateCriteria.newValueMian" placeholder="Пожалуйста, введите новый элемент списка" />
                        <a-button type="text" :disabled="!formStateCriteria.newValueMian" @click="addItem('main')">
                          <template #icon>
                            <plus-outlined />
                          </template>
                        </a-button>
                    </a-space>
                </template>
            </a-select>
        
            </a-form-item>
            <a-form-item
                label="Выпадающий список"
                >
                <a-select 
                    :disabled="!formStateCriteria.name" 
                    v-model:value="formStateCriteria.value" 
                    :options="subList" 
                    :key="`${listMain.length}${tableStore.mainListCrieria.length}${switchByMainOfSub}`"
                    placeholder="выберите данные с первого списка"
                    notFoundContent="Ничего не найдено">
                    <template #dropdownRender="{ menuNode: subList }">
                        <v-nodes :vnodes="subList" />
                        <a-divider style="margin: 4px 0" />
                        <a-space style="padding: 4px 8px">
                            <a-input  v-model:value="formStateCriteria.newValueSub" placeholder="Пожалуйста, введите новый элемент списка" />
                            <a-button type="text" :disabled="!formStateCriteria.newValueSub" @click="addItem('sub')">
                              <template #icon>
                                <plus-outlined />
                              </template>
                            </a-button>
                        </a-space>
                    </template>
                </a-select>
            </a-form-item>
            <a-form-item :wrapper-col="{ offset:8, span: 12 }">
                <a-button type="primary"  class="btn" @click="save" >Сохранить</a-button>
                <a-button type="default" @click="hide" >Отмена</a-button>
            </a-form-item>   
        </a-form>
        </template>

    </BaseModal>
</template>
<script setup lang="ts">
import { checkKey, getRandomId } from '~/service/helper';
import { PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';


const emit = defineEmits(['update:open', 'newRules'])

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});
const tableStore = useTableStore()
const formStateCriteria = reactive({
    name: '',
    value: '',
    newValueMian: '',
    newValueSub: ''
})
const switchByMainOfSub = ref(true)
function hide() {
    emit('update:open', false);
}
const itemsMain = ref<{value: string}[]>([]);
const itemsSub =  ref<{value: string}[]>([]);
const subList = ref<{value: string}[]>([]);
const listNewKeys = ref<string[]>([])
const listMain = computed(() => {    
   return  switchByMainOfSub.value ?  itemsMain.value : itemsSub.value
})
function seachElementByName(name: string) {
    formStateCriteria.value = ''
    const findElement = tableStore.mainListCrieria.find((e) => e.label === name)
    if(findElement && findElement.list)
    subList.value = findElement.list
     
}
function addItem(actions: 'main' | 'sub') {
    if(actions === 'sub') {
        seachElementByName(formStateCriteria.name);
        const newList = { value: formStateCriteria.newValueSub, label: formStateCriteria.newValueSub };
        tableStore.addListCriteria(formStateCriteria.name, newList);
        formStateCriteria.newValueSub = '';
        seachElementByName(formStateCriteria.name);
    } else {
        const newCriteria = {
            label: formStateCriteria.newValueMian,
            key: `main.${getRandomId()}`
        };
        const newCriteriaSub = {
            label: formStateCriteria.newValueMian,
            key: `sub.${getRandomId()}`
        };
        const newColumn = {
            title: formStateCriteria.newValueMian,
            dataIndex: checkKey(newCriteria.key, 'main') 
        };
        const newColumnSub = {
            title: formStateCriteria.newValueMian,
            dataIndex: checkKey(newCriteriaSub.key, 'sub') 
        };
   
        if(switchByMainOfSub.value) {
            tableStore.setColumns(newColumn);
            tableStore.setMainKeys(newColumn.dataIndex);
            itemsMain.value.push({ value: formStateCriteria.newValueMian });
            const keyNew = checkKey(newCriteria.key, 'main');
            tableStore.updatedRules(keyNew);
            listNewKeys.value.push(newCriteria.key);
            tableStore.updatedForm(keyNew, 'main');
        } else {
            tableStore.setColumns(newColumnSub);
            const keyNew = checkKey(newCriteriaSub.key, 'sub');        
            itemsSub.value.push({ value: formStateCriteria.newValueMian });
            tableStore.updatedForm(keyNew, 'sub');
            tableStore.addCriteria(newCriteriaSub);
            listNewKeys.value.push(keyNew)
            tableStore.setSubKeys(newColumnSub.dataIndex);
        }

        tableStore.addCriteria(newCriteria);
        formStateCriteria.name = formStateCriteria.newValueMian
        formStateCriteria.newValueMian = '';
        
    }
}

watch(() => formStateCriteria.name, () => {
    if(formStateCriteria.name)
     seachElementByName(formStateCriteria.name)
})
watch(() => switchByMainOfSub.value, () => {
    formStateCriteria.name = ''
})
function save() {
 hide() 
}

function fetchList() {    
    tableStore.listCrieria.forEach(t => {    
        if(tableStore.mainKey.filter(e => e !== 'fullName' && e !== 'position').includes(checkKey(t.key, 'main'))) {
            itemsMain.value.push({ value : t.label})            
        }
         
        else if (tableStore.subKey.filter(e => e !== 'amountOfChildren').includes(checkKey(t.key, 'sub'))) {
            itemsSub.value.push({ value : t.label})
        }
     })
}

onMounted(() => {
    fetchList()
})
</script>
<style lang="css" scoped>
    .btn {
        margin-right: 24px;
    }
</style>