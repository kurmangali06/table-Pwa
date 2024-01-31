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
                :key="`${listMain.length}${tableStore.listCriteria.length}${switchByMainOfSub}`"
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
                    :key="`${listMain.length}${tableStore.listCriteria.length}${switchByMainOfSub}`"
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
import type { IListCrieria } from '~/interface';
import { updateCriteria } from '~/service/IndexedDBService';


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
const itemsMain = ref<{value: string}[]>([]);
const itemsSub =  ref<{value: string}[]>([]);
const subList = ref<{value: string}[]>([]);
const listNewKeys = ref<string[]>([])
const curentCritiria = ref<IListCrieria>()
const listMain = computed(() => {    
   return  switchByMainOfSub.value ?  itemsMain.value : itemsSub.value
})

function hide() {
    emit('update:open', false);
}


// поиск по главном селектору так как него может быть list для  выпадающего списка
function seachElementByName(name: string) {
    formStateCriteria.value = ''
    const findElement = tableStore.listCriteria.find((e) => e.label === name)
    if(findElement && findElement.list)
    subList.value = findElement.list
     
}

// добавление кретерий в форму
async function addItem(actions: 'main' | 'sub') {
    if(actions === 'sub') {
        const newList = { value: formStateCriteria.newValueSub, label: formStateCriteria.newValueSub };
        tableStore.addListCriteria(formStateCriteria.name, newList);
        formStateCriteria.newValueSub = '';
        if(curentCritiria.value) {
            const body  = {
                ...curentCritiria.value,
                list: [newList]
            }
            await updateCriteria(curentCritiria.value.id, body)
        }
    } else {
    //зависмости от чекбокса добавление происходит в основ или доп 
     addCriteria(switchByMainOfSub.value, formStateCriteria.newValueMian)    
    }
    seachElementByName(formStateCriteria.name);
}

function addCriteria(switchByMainOfSub: boolean, val: string) {
    const newCriteria = {
            label: formStateCriteria.newValueMian,
            key: `main.${getRandomId()}`,
            hasChildren: false,
            id: getRandomId(),
        };
    const newCriteriaSub:IListCrieria = {
                label: formStateCriteria.newValueMian,
                key: `sub.${getRandomId()}`,
                hasChildren: false,
                id: getRandomId(),
    };
        const newColumn = {
            title: formStateCriteria.newValueMian,
            dataIndex: checkKey(newCriteria.key, 'main') 
        };
        const newColumnSub = {
            title: formStateCriteria.newValueMian,
            dataIndex: checkKey(newCriteriaSub.key, 'sub') 
        };
    if(switchByMainOfSub) {
             // добавление в заголовок нового кретерия в таблицы
            tableStore.setColumns(newColumn);
             // добавление в ключей для доп логики
           tableStore.setMainKeys(newColumn.dataIndex);
           // добавление в текущий список в селекторе
           itemsMain.value.push({ value: val });
           const keyNew = checkKey(newCriteria.key, 'main');
              // добавление в валидация обязательную форму
           tableStore.updatedRules(keyNew);
           listNewKeys.value.push(newCriteria.key);
           // добавление в форму нового ключа
           tableStore.updatedForm(keyNew, 'main');
           curentCritiria.value = newCriteria
    } else {
        tableStore.setColumns(newColumnSub);
        const keyNew = checkKey(newCriteriaSub.key, 'sub');        
        itemsSub.value.push({ value:val });
        tableStore.updatedForm(keyNew, 'sub');
        tableStore.addCriteria(newCriteriaSub);
        listNewKeys.value.push(keyNew)
        tableStore.setSubKeys(newColumnSub.dataIndex)
        curentCritiria.value = newCriteriaSub
    }

    tableStore.addCriteria(newCriteria);
    formStateCriteria.name = formStateCriteria.newValueMian
    formStateCriteria.newValueMian = '';
}

watch(() => formStateCriteria.name, () => {
    if(formStateCriteria.name)
     seachElementByName(formStateCriteria.name)
})
watch(() => switchByMainOfSub.value, () => {
    formStateCriteria.name = ''
})

// да не правильно....нельзя так делать на сохарнения не происходит основная логика !! фу быть таким
function save() {
 hide() 
}
// отфильтровуем field оставляем только selects
function fetchList() {    
    tableStore.listCriteria.forEach(t => {    
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