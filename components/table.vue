<template>
    <div >
        <ConfigProvider :locale="ruRU">
          <a-table 
            :dataSource="list" :columns="columns"  
            :scroll="{ x: 2800, y: 650 }"
            class="table"
            bordered  
            @change="changePage"
            :pagination="{ pageSize: pageSize, position:['bottomCenter'], pageSizeOptions: ['10', '20', '50', '100'] }" >
            <template #headerCell="{ column, title}">
              <div class="titleTable">
                {{ title  }} 
              </div>
            </template>
            <template #emptyText>
              <a-empty description="Данных нет" />
            </template>
            <template #footer>
              <a-row>
                <a-col :span="24" >
                  <a-statistic title="Итого" :value="count" >
                    <template #suffix>
                      человек
                    </template>
                  </a-statistic>
                </a-col>
                </a-row>
            </template>
            <template #bodyCell="{ column, text , record}">
              <template v-if="column.dataIndex === 'fullName'">
                <NuxtLink @click="editModal(record)">{{ record.main.fullName || '__' }}</NuxtLink>
              </template>
              <template v-else-if="column.dataIndex === 'position'">
                <a-tooltip>
                    <template #title>{{ record.main.position}}</template>
                    <div class="truncate" >{{ record.main.position }}</div>
                  </a-tooltip>
             
              </template>
              <template v-else-if="column.dataIndex === 'gender'">
                {{ record.main.gender }}
              </template>
              <template v-else-if="column.dataIndex === 'nationality'">
                {{ record.main.nationality }}
              </template>
              <template v-else-if="column.dataIndex === 'education'">
                {{ record.main.education }}
              </template>
              <template v-else-if="column.dataIndex === 'fieldOfActivity'">
                {{ record.main.fieldOfActivity }}
              </template>
              <template v-else-if="column.dataIndex === 'experience'">
                {{ record.main.experience }}
              </template>
              <template v-else-if="column.dataIndex === 'placeOfBirth'">
                {{ record.main.placeOfBirth }}
              </template>
              <template v-else-if="column.dataIndex === 'academicDegree'">
                {{ record.sub.academicDegree }}
              </template>
              <template v-else-if="column.dataIndex === 'fameLevel'">
                {{ record.sub.fameLevel }}
              </template>
              <template v-else-if="column.dataIndex === 'levelOfProfessionalism'">
                {{ record.sub.levelOfProfessionalism }}
              </template>
              <template v-else-if="column.dataIndex === 'reputation'">
                {{ record.sub.reputation }}
              </template>
              <template v-else-if="column.dataIndex === 'managersExperience'">
                {{ record.sub.managersExperience }}
              </template>
              <template v-else-if="column.dataIndex === 'religiousBeliefs'">
                {{ record.sub.religiousBeliefs }}
              </template>
              <template v-else-if="column.dataIndex === 'levelOfNotedAchievements'">
                {{ record.sub.levelOfNotedAchievements }}
              </template>
              <template v-else-if="column.dataIndex === 'familyStatus'">
                {{ record.sub.familyStatus }}
              </template>
              <template v-else-if="column.dataIndex === 'amountOfChildren'">
                {{ record.sub.amountOfChildren }}
              </template>
              <template v-else-if="column.dataIndex === 'scopeOfVision'">
                {{ record.sub.scopeOfVision }}
              </template>
              <template v-else-if="column.dataIndex === 'leadershipType'">
                {{ record.sub.leadershipType }}
              </template>
              <template v-else-if="column.dataIndex === 'militaryService'">
                {{ record.sub.militaryService }}
              </template>
              <template v-else>
                {{ record.sub[column.dataIndex as string] || record.main[column.dataIndex as string]  }}
              </template>
            </template>
          </a-table>
        </ConfigProvider>
      </div>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import ruRU from 'ant-design-vue/es/locale/ru_RU';
import type { PropType } from 'vue';
import type { IFormState } from '~/interface';

const emit = defineEmits(['editModal'])
const tableStore = useTableStore()
const props = defineProps({
    columns: {
        type: Array as PropType<any>,
        default: () =>([]),
    },
    list: {
        type: Array as PropType<IFormState[]>,
        default: () =>([]),
    },
    count: {
        type: Number,
        default: 0,
    }
})
const pageSize = ref(10)
function editModal(value: any) {
      emit('editModal', value)
}

function changePage(e:any) {
  pageSize.value = e.pageSize
}
</script>
<style lang="css" >
.truncate {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .table {
    position: relative;
  }
  .titleTable {
    position: sticky;
    top: 0;
    z-index: 1;
}
</style>