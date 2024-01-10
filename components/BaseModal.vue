<template>
    <Teleport to="#main_container">
        <a-modal  :width="width"  v-bind="$attrs" @cancel="closeModal">
         <slot/>
         <template #footer>
            <slot name="footer">
            </slot>
         </template>
        </a-modal>
     </Teleport>
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
<style >

</style>