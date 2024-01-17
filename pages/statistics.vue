<template>
    <div class="dashboard" v-if="!loading">
      <BaseSelect
        v-if="mainList.length"
        show-search
        style="width: 300px;"
        v-model:value="selectedElement"
        :options-list="mainList" placeholder="" />
        <apexchart
          :key="`${selectedElement}`"
          :options="chartOptions"
          :series="percentage "
          type="pie"
        />
        <template v-if="checkAbountZeroSumPercetages">
          <a-empty description="поля по данной критерий не заполнены"/>
        </template>

      <div style="background: #ececec; padding: 30px; border-radius: 12px;">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-card  v-if="totalPercentagesList && totalPercentagesList.mainFilledPercents">
              <a-statistic
                title="основной информации"
                :value="calculateAverage(totalPercentagesList.mainFilledPercents)"
                :precision="2"
                suffix="%"
                :value-style="{ color: '#3f8600' }"
                style="margin-right: 50px"
              >
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card v-if="totalPercentagesList && totalPercentagesList.subFilledPercents">
              <a-statistic
                title="дополнительной информации"
                :value="calculateAverage(totalPercentagesList.subFilledPercents)"
                :precision="2"
                suffix="%"
                class="demo-class"
                :value-style="{ color: '#cf1322' }"
              >
              </a-statistic>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-space v-else class="spin">
      <a-spin size="small" />
      <a-spin />
      <a-spin size="large" />
    </a-space>
</template>
<script lang="ts" setup>
import type { IFormState, IPercentages, IValue } from '~/interface';
import type { ApexOptions } from 'apexcharts';
import { calculateAverage, calculateFilledPercentage } from '~/service/statictis';
const percentages = ref<IPercentages[]>([])
const totalPercentagesList = ref()

const loading = ref(false)
const tableStore = useTableStore()
const mainList = ref<IValue[]>([])
const selectedElement = ref<any>('main.nationality')
function getAnaliticList() {
        let total = tableStore.list.length;
        totalPercentagesList.value = calculateFilledPercentage(tableStore.list)        
        const findElement = tableStore.mainListCrieria.filter(e => e.label !== 'ФИО клиента' && e.label !== 'Должность' && e.label !== 'Количество детей').find(e => e.key === selectedElement.value)
        const listKey = selectedElement.value.split('.')        
        if(findElement && findElement.list) {
          const listBySelectElement = tableStore.list.map(e  =>  e[listKey[0]][listKey[1]]).filter(e => e !== undefined)
          tableStore.list.filter(e => {
            e[selectedElement.value] === findElement.key
          })
          let counts = findElement.list.map(element => {
            
            let count = listBySelectElement.filter(item => {
              return item === element.value
            }).length;

            
            return { ...element, count };
          }).map(({ value, count }) => {                      
            let percentage = (count / total) * 100;
            return { value, percentage };
          });;
        percentages.value = counts
        }

  }

watch(() => selectedElement.value, () => {
  getAnaliticList()
})
  
const percentage = computed(() => {
  return percentages.value.map((el: any) => Math.round(el.percentage));
});
const checkAbountZeroSumPercetages = computed(() => {
  const totalSum = percentage.value.reduce((acc, e) => acc + e, 0)
  if(totalSum === 0)
   return true
  return false
})
const chartOptions = computed((): ApexOptions => {
    return {
        chart: {
              width: 600,
              type: 'pie',
            },
            labels:percentages.value.map((e:any) => e.value),
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
        }]
    } 
}) 

onMounted(() => {
    mainList.value = tableStore.mainListCrieria.map(e => {
      return {
        label: e.label,
        value: e.key
      }
    }).filter(e => e.label !== 'ФИО клиента' && e.label !== 'Должность' && e.label !== 'Количество детей') as IValue[]
    getAnaliticList()
})
</script>
<style lang="css" scoped>
    .dashboard {
        width: 500px;
        margin: 0 auto;
    }
    .spin {
      display: flex;
      align-items: center;
      justify-content: center;
    }
</style>