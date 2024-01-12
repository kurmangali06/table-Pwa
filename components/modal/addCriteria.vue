<template>
    <BaseModal v-bind="$attrs" :width="500" title="Изменить критерии" @hide="hide" >
        <template #content>
            <a-form
            :model="formState"
            name="basic"
            :label-col="{ span: 8}"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            >
            <a-form-item
                label="Критерий"
                >
                <BaseSelect
                    v-if="items.length"
                    :key="items.length"
                    v-model:value="formState.name"
                    placeholder="custom dropdown render"
                    style="width: 300px"
                    :options="items"/>
            </a-form-item>
            <a-form-item
                label="Выпадающий список"
                >
                <a-select 
                :disabled="!formState.name" v-model:value="formState.value" :options="subList" placeholder="выберите данные с первого списка" >
                    <template #dropdownRender="{ menuNode: subList }">
                        <v-nodes :vnodes="subList" />
                        <a-divider style="margin: 4px 0" />
                        <a-space style="padding: 4px 8px">
                            <a-input  v-model:value="formState.newValue" placeholder="Пожалуйста, введите новый элемент списка" />
                            <a-button type="text" :disabled="!formState.newValue" @click="addItem">
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
import { mainListCrieria } from '~/service/helper';
import { PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

const emit = defineEmits(['update:open'])

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

const formState = reactive({
    name: '',
    value: '',
    newValue: ''
})

function hide() {
    emit('update:open', false);
}
const items = ref<{value: string}[]>([]);
const subList = ref<{value: string}[]>([]);
function seachElementByName(name: string) {
    formState.value = ''
    const findElement = mainListCrieria.find((e) => e.label === name)
    if(findElement && findElement.list)
    subList.value = findElement.list
     
}
function addItem() {
    seachElementByName(formState.name)
    subList.value.push({
        value: formState.newValue
    })
    mainListCrieria.find((e) => {
     if(e.label === formState.name && e.list)
      return {
        ...e,
        list: [...e.list, {
            value: formState.newValue
        } ]
    }   
    })
    formState.newValue = ''
}
watch(() => formState.name, () => {
    if(formState.name)
     seachElementByName(formState.name)
})
function save() {
    hide()
}
onMounted(() => {
    items.value = mainListCrieria.filter(e => e.list).map(e => {
        return {
            value: e.label
        }
    } )
})
</script>
<style lang="css" scoped>
    .btn {
        margin-right: 24px;
    }
</style>