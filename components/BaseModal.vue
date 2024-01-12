<template>
    <Teleport to="#main_container">
        <a-modal  :width="width"  v-bind="$attrs" @cancel="closeModal" :footer="false">
            <slot name="header"></slot>
            <slot name="content">
            </slot>
            <slot name="footer">
            </slot>
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