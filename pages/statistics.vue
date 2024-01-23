<template>
    <div class="dashboard" v-if="!loading">
      <a-select
        style="width: 100%;"
        v-model:value="selectedElement"
        :options="mainList"
        mode="multiple"
        placeholder="выберите из списка"
    ></a-select>
    <a-row>
      <a-col :span="12" v-for="(item, index) in percentages" :key="item.id">
        <template  
          v-if="!checkAbountZeroSumPercetages(item.result)"
          >
          <a-card style="height: 450px;" :title="translateName(checkKey(item.id, 'main')) || translateName(checkKey(item.id, 'sub'))" >
            <apexchart 
            :id="item.id"
            height="300px"
            :key="item.id"
            class="card"
            :options="chartOptions(item.result)"
            :series="percentage(item.result) "
            type="pie"
           />
          </a-card>

      </template>
       <template v-else>
        <a-card style="height: 450px" :title="translateName(checkKey(item.id, 'main')) || translateName(checkKey(item.id, 'sub'))" >
          <a-empty class="card" :description="`поля по данной критерий ${translateName(checkKey(item.id, 'main')) || translateName(checkKey(item.id, 'sub'))} не заполнены `"/>
        </a-card>
       </template>
      </a-col>
    </a-row>
      <div class="footer" v-if="tableStore.list.length">
        <a-row :gutter="16">
          <a-col :span="10" >
            <a-card  v-if=" totalPercentagesList && totalPercentagesList.main">
              <a-statistic
              title="основной информации"
              :value="totalPercentagesList.main"
                :precision="2"
                suffix="%"
                :value-style="{ color: '#3f8600' }"
                style="margin-right: 50px"
              >
              </a-statistic>
            </a-card>
          </a-col>
          <a-col :span="10">
            <a-card v-if=" totalPercentagesList && totalPercentagesList.sub">
              <a-statistic
                title="дополнительной информации"
                :value="totalPercentagesList.sub"
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
import {  calculateCompletionPercentage } from '~/service/statictis';
import { checkKey, translateName } from '~/service/helper';

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
watch (() => selectedElement.value, () => {
  changeSelect(selectedElement.value)
})
const chartOptions = computed(() => {
    return(percentage:IPercentages[]): ApexOptions => {
       return {
        chart: {
              type: 'pie',
              height: '300px',
              width: '100%',

            },
            labels:percentage.map((e:any) => e.value),
            responsive: [{
              options: {
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
    totalPercentagesList.value = calculateCompletionPercentage(tableStore.list)     
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
    .card {
      width: 100%;
      height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

  
</style>