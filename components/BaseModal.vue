<template>
    <div>
        <a-modal width="1000px" v-model:open="open" :title="title" @cancel="closeModal">
         <slot/>
         <template #footer></template>
        </a-modal>
      </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['closeModal'])

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    modelValue:{
        type: Boolean,
        default: false
    }
})
const open = ref(false)
function closeModal() {
    emit('closeModal')
    open.value = false
}
onMounted(() => {
    if(props.modelValue)
    open.value = props.modelValue
})
watch(() => props.modelValue,() => {
    open.value = props.modelValue
})

</script>
<style lang="">
    
</style>