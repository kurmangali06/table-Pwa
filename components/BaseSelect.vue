<template >
        <a-select
        v-bind="$attrs"
        show-search
        :placeholder="placeholder"
        :options="optionsList"
        style="width: 100%;"
        @change="selectedValue"
        notFoundContent="Ничего не найдено"
        >
        <slot/>
        </a-select>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import type { SelectProps } from 'ant-design-vue'

const props = defineProps({
    optionsList: {
        type: Array as PropType<SelectProps['options']>,
        default: () => [],
    },
    placeholder: {
        type: String,
        default: ''
    },
})
const emit= defineEmits(['modelValue:value', 'change'])
const value = ref<string>('');

function selectedValue(e :any) {    
    emit('modelValue:value', e)
    emit('change', e)
}


</script>
<style lang="css" scoped>
    
</style>