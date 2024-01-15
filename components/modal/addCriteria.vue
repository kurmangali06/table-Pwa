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
                :key="`${listMain.length}${mainListCrieria.length}${switchByMainOfSub}`"
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
                    :disabled="!formStateCriteria.name" v-model:value="formStateCriteria.value" :options="subList" placeholder="выберите данные с первого списка" >
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
import { checkKey, getRandomId, mainInfoKeys, mainListCrieria, subInfoKeys } from '~/service/helper';
import { PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
import { rulesRef } from '~/service/table';

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
const tableStore =  useTableStore()
const itemsMain = ref<{value: string}[]>([]);
const itemsSub =  ref<{value: string}[]>([]);
const subList = ref<{value: string}[]>([]);
const listNewKeys = ref<string[]>([])
const listMain = computed(() => {    
   return  switchByMainOfSub.value ?  itemsMain.value : itemsSub.value
})
function seachElementByName(name: string) {
    formStateCriteria.value = ''
    const findElement = mainListCrieria.find((e) => e.label === name)
    if(findElement && findElement.list)
    subList.value = findElement.list
     
}
function addItem(actions: 'main' | 'sub') {
    if(actions === 'sub') {
        seachElementByName(formStateCriteria.name)
        subList.value.push({
            value: formStateCriteria.newValueSub
        })
        mainListCrieria.find((e) => {
        if(e.label === formStateCriteria.name && e.list) {
            return {
            ...e,
            list: [...e.list, {
                value: formStateCriteria.newValueSub
            }]
        }
        } else {
            return {
            ...e,
            list: [{
                value: formStateCriteria.newValueSub
            }]
        }
        }

    })
        formStateCriteria.newValueSub = ''
    } else {
        if(switchByMainOfSub.value) {
            const newCriteria = {
                label: formStateCriteria.newValueMian,
                key: `main.${getRandomId()}`
            }
            mainListCrieria.push(newCriteria)
            mainInfoKeys.push(formStateCriteria.newValueMian)
            itemsMain.value.push({
                value: formStateCriteria.newValueMian
            })
        
            const keyNew = checkKey(newCriteria.key, 'main')         
            tableStore.updatedRules(keyNew)
            listNewKeys.value.push(newCriteria.key)
            tableStore.updatedForm(keyNew, 'main')
            
        } else {
            const newKeysSub = {
                label: formStateCriteria.newValueSub,
                key: `sub.${getRandomId()}`
            }
            mainListCrieria.push(newKeysSub)
            subInfoKeys.push(formStateCriteria.newValueMian)
            const keyNew = checkKey(newKeysSub.key, 'sub')
            itemsSub.value.push({
                value: formStateCriteria.newValueMian
            })
            tableStore.updatedForm(keyNew, 'sub')
        }
   
        formStateCriteria.newValueMian = ''
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
  
}


onMounted(() => {
    mainListCrieria.forEach(t => {    
        if(mainInfoKeys.filter(e => e !== 'fullName' && e !== 'position').includes(checkKey(t.key, 'main'))) {
            itemsMain.value.push({ value : t.label})            
        }
         
        else if (subInfoKeys.filter(e => e !== 'amountOfChildren').includes(checkKey(t.key, 'sub'))) {
            itemsSub.value.push({ value : t.label})
        }
     })
})
</script>
<style lang="css" scoped>
    .btn {
        margin-right: 24px;
    }
</style>