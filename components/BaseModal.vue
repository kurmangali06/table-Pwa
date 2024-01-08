<template>
    <div>
        <a-modal v-model:open="open" :title="title" @ok="closeModal" @cancel="closeModal">
         <slot/>
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
    open.value =false
    emit('closeModal')
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