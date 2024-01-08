<template >
        <a-select
        v-model:value="value"
        show-search
        :placeholder="placeholder"
        :options="optionsList"
        notFoundContent="Ничего не найдено"
        >
        </a-select>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { IValue } from '~/interface';
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
    modelValueValue: {
        type: String,
        default: ''
    }
})
const emit= defineEmits(['modelValue:value'])
const value = ref<string>('');

onMounted(() => {
    if(props.modelValueValue)
    value.value = props.modelValueValue
})

watch(() => props.modelValueValue, () => {
    if(props.modelValueValue) {
        value.value = props.modelValueValue
        emit('modelValue:value', value.value)
    }
    
})
</script>
<style lang="">
    
</style>