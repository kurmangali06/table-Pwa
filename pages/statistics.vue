<template>
    <div class="dashboard" v-if="!loading">
        <apexchart
        :options="chartOptions"
        :series="percentage "
        type="pie"
      />
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
import type { IFormState, IPercentages } from '~/interface';
import { getAllDataFromIndexedDB } from '~/service/IndexedDBService';
import { fieldOfActivityList, mainListCrieria } from '~/service/helper';
import type { ApexOptions } from 'apexcharts';
import { calculateAverage, calculateFilledPercentage } from '~/service/statictis';
const percentages = ref<IPercentages[]>([])
const totalPercentagesList = ref()
const loading = ref(false)

function getAnaliticList() {
  loading.value = true
    const resPromise =  getAllDataFromIndexedDB()
    resPromise.then((res) => {
        let total = res.length;
        totalPercentagesList.value = calculateFilledPercentage(res)
        const findElement = mainListCrieria.find(e => e.label === 'Сфера деятельности')        
        if(findElement && findElement.list) {
          let counts = findElement.list.map(element => {
            let count = res.filter(item => item.main.fieldOfActivity === element.value).length;
            return { ...element, count };
          }).map(({ value, count }) => {
            let percentage = (count / total) * 100;
            return { value, percentage };
          });;
        percentages.value = counts
        }

     
    }).catch((error) => {
      console.log(error, 'error');
      
    }).finally(() => {
        loading.value = false
    });

  }
const percentage = computed(() => {
  return percentages.value.map((el: any) => Math.round(el.percentage));
});

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