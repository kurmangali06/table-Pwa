<template >
    <BaseModal v-bind="$attrs" :width="500"  @hide="hide">
        <template #header>
            <a-typography-title :level="4">Перенос в архив</a-typography-title>
        </template>
        <template #content>
            <a-form 
            :model="formState"
            name="dynamic_rule"
            :label-col="{ span: 8}"
            :wrapper-col="{ span: 16 }"
            > 
            <a-form-item
                label="Комментарий"
                >
                <a-input v-model:value="formState.comments" />
                </a-form-item>
            </a-form>
        </template>
        <template #footer>
            <a-form-item :wrapper-col="{ offset:6, span: 24 }" style="margin-top: 10px;">
                <a-button  type="primary" class="btn" @click="addArchive">Перенести в архив</a-button>
             </a-form-item>
          </template>
    </BaseModal>
</template>
<script setup lang="ts">
import type { IFormState } from '~/interface';
import { addDataToArchive } from '~/service/IndexedDBService';

const props = defineProps({
    info: {
        type: Object as PropType<IFormState>,
        required: true,            
    },
})

const formState = reactive({
    main: {
        fullName: '',
        position: '',
        gender: '',
        nationality: '',
        education: '',
        fieldOfActivity: '',
        experience: '',
        placeOfBirth: '',
        placeOfInfluence: '',
        zhus: '',
        age: ''
    },
    id: '',
    sub: {
        academicDegree: '',
        fameLevel: '',
        levelOfProfessionalism: '',
        reputation: '',
        managersExperience: '',
        religiousBeliefs: '',
        levelOfNotedAchievements: '',
        familyStatus: '',
        amountOfChildren: 0,
        scopeOfVision: '',
        leadershipType: '',
        militaryService: ''
    },
    status: 'active',
    comments: ''
} as unknown as IFormState)

const emit = defineEmits(['update:open'])

function hide() {
    emit('update:open', false);
}
// добавление в архив
async function addArchive() {
    const body = {
    ...formState,
    }
    body.status = 'archival'
    await addDataToArchive(body);
        message.success('Успешно добавлено в архив');
    hide()
}
onMounted(() => {
    const mainList = Object.entries(props.info.main)
       const subList = Object.entries(props.info.sub)
       const formStateList = Object.entries(formState.main)
       const formStateSubList = Object.entries(formState.sub)
       mainList.forEach(e => {
            const findElement = formStateList.find(t => t[0] === e[0])
 
            if(findElement) {
                formState.main[findElement[0]] = e[1]
            } else {
                formState.main[e[0]] = e[1]
            }
       })

       subList.forEach(e => {
        const findElement = formStateSubList.find(t => t[0] === e[0])
            if(findElement) {
                formState.sub[findElement[0]] = e[1]
            } else {
                formState.sub[e[0]] = e[1]
            }
       })
       formState.id = props.info.id
})
</script>
<style lang="">
    
</style>