<template>
    <div >
        <a-modal :width="width"  v-bind="$attrs" @cancel="closeModal">
         <slot/>
         <template #footer></template>
        </a-modal>
      </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:open', 'hide'])
defineProps({
    width: {
        type: Number,
        default: 389,
    },
});

function closeModal() {
    emit('hide')
}

</script>
<style lang="">
    
</style>