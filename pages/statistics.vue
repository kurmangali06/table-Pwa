<template>
    <div class="dashboard" v-if="!loading">
      <BaseSelect
        v-if="tableStore.list.length && mainList.length"
        show-search
        mode="multiple"
        style="width: 100%;"
        v-model:value="selectedElement"
        @change="changeSelect"
        :options-list="mainList" placeholder="" />
        <div v-for="(item, index) in percentages" :key="item.id">
        </div>
        <a-card title="Аналитика">
          <a-card-grid 
            style="width: 50%; text-align: center"
             v-for="(item, index) in percentages" :key="item.id">
              <apexchart
                class="card" 
                :options="chartOptions(item.result)"
                :series="percentage(item.result) "
                type="pie"
            />
          <template v-if="checkAbountZeroSumPercetages(item.result)">
            <a-empty description="поля по данной критерий не заполнены"/>
          </template>
          
        </a-card-grid>
      </a-card>
      <div class="footer" v-if="tableStore.list.length">
        <a-row :gutter="16">
          <a-col :span="10" >
            <a-card  v-if=" totalPercentagesList && totalPercentagesList.mainFilledPercents">
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
          <a-col :span="10">
            <a-card v-if=" totalPercentagesList && totalPercentagesList.subFilledPercents">
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
      <div v-if="!tableStore.list.length">
        <a-empty description=""/>
      </div>
    </div>

    <a-space v-else class="spin">
      <a-spin size="small" />
      <a-spin />
      <a-spin size="large" />
    </a-space>
</template>
<script lang="ts" setup>
import type { IDashboard, IFormState, IPercentages, IValue } from '~/interface';
import type { ApexOptions } from 'apexcharts';
import { calculateAverage, calculateFilledPercentage } from '~/service/statictis';


const percentages = ref<IDashboard[]>([])
const totalPercentagesList = ref()

const loading = ref(false)
const tableStore = useTableStore()
const mainList = ref<IValue[]>([])
const selectedElement = ref<any[]>([])

function changeSelect(e:any[]) {
    const res:IDashboard[]  = []
    e.forEach(select => {
        let total = tableStore.list.length;     
        const findElement = tableStore.listCriteria.filter(e => e.label !== 'ФИО клиента' && e.label !== 'Должность' && e.label !== 'Количество детей').find(e => e.key === select)
        const listKey = select.split('.')        
        if(findElement && findElement.list) {
          const listBySelectElement = tableStore.list.map(e  =>  e[listKey[0]][listKey[1]]).filter(e => e !== undefined)
          tableStore.list.filter(e => {
            e[select] === findElement.key
          })
          let counts = findElement.list.map(element => {
            
            let count = listBySelectElement.filter(item => {
              return item === element.value
            }).length;

            
            return { ...element, count };
          }).map(({ value, count }) => {                      
            let percentage = (count / total) * 100;
            return { value, percentage };
          });
        const newDashBoard = {
            id: findElement.key,
            result: counts
        }
        res.push(newDashBoard)
        }
    })
    percentages.value = res
  }

  
const percentage = computed(() => {
  return(val: IPercentages[])  => {
    return val.map((el: IPercentages) => Math.round(el.percentage));
  }
  
});
const checkAbountZeroSumPercetages = computed(() => {
  return(percentage:IPercentages[] ) => {    
    const totalSum = percentage.reduce((acc, e) => acc + (Math.round(e.percentage)), 0)
    if(totalSum === 0)
     return true
    return false
  }
})
const chartOptions = computed(() => {
    return(percentage:IPercentages[]): ApexOptions => {
       return {
        chart: {
              type: 'pie',
              width: 400,
              height: 400,
            },
            labels:percentage.map((e:any) => e.value),
            responsive: [{
              breakpoint: 400,
              options: {
                chart: {  
                  width: 400,
                  height: 400,
                },
                legend: {
                  position: 'bottom'
                }
              }
        }]
       }  

    } 
}) 

onMounted(() => {
    mainList.value = tableStore.listCriteria.map(e => {
      return {
        label: e.label,
        value: e.key
      }
    }).filter(e => e.label !== 'ФИО клиента' && e.label !== 'Должность' && e.label !== 'Количество детей') as IValue[]
    totalPercentagesList.value = calculateFilledPercentage(tableStore.list)      
})
</script>
<style lang="css" scoped>
    .dashboard {
        max-width: 90vw;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }
    .spin {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .footer {
      background: #ececec; 
      padding: 30px; 
      border-radius: 12px; 
      margin: 0 auto;
      max-width: 60%;
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
</style>