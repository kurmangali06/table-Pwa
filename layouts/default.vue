<template >
    <div class="container" id="main_container">
        <div class="sidebar">
            <div style="width: 150px">
                <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
                  <MenuUnfoldOutlined v-if="state.collapsed" />
                  <MenuFoldOutlined v-else />
                </a-button>
                <a-menu
                  v-model:openKeys="state.openKeys"
                  v-model:selectedKeys="state.selectedKeys"
                  mode="inline"
                  theme="dark"
                  :inline-collapsed="state.collapsed"
                  :items="items"
                  @click="handleClick"
                >
            </a-menu>
              </div>
        </div>
        <div class="page">
            <NuxtPage/>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
} from '@ant-design/icons-vue';
import type { MenuProps, ItemType } from 'ant-design-vue';
import type { IListCrieria } from '~/interface';
import { addNewColums, addNewCriteria, addNewMainKey, addNewSubKey, getCountColumnsTitle, getCountCriteria, getCountMainKey, getCountSubKey, getListColumTitle, getListCriteria, getListMainKey, getListSubKey } from '~/service/IndexedDBService';
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
});
const router = useRouter()
const items = reactive([
    {
    key: '1',
    icon: () => h(DesktopOutlined),
    label: 'Главная',
    title: 'Главная',
    name: 'index',
    to: '/',
  },
  {
    key: '2',
    icon: () => h(PieChartOutlined),
    label: 'Статистика',
    title: 'Статистика',
    name: 'statistics',
    to: '/statistics',
  },
])
watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
);
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
  state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
const handleClick: MenuProps['onClick'] = e => {
    router.push({
        name: e.item.name,
    })
};

const tableStore = useTableStore()

async function getDbCriteria() {
  const getCounte =  getCountCriteria()
  getCounte.then(async (res:number) => {    
      if(res === 0) {
        if(tableStore.listCriteria.length > res) {
        tableStore.listCriteria.forEach(async (e) => {
        await addNewCriteria(e)
      })
        } 
    } else {  
          await getListCriteria().then((res) => {
            res.forEach((t => {
              if(tableStore.listCriteria.find(e => e.key === t.key)) {
                return
              } else {
                tableStore.addCriteria(t)
              }
            }))
          })
       }
  })
}
async function getDbColum() {
  const getCounte =  getCountColumnsTitle()
  getCounte.then(async (res:number) => {    
      if(res === 0) {
        tableStore.columns.forEach(async (e) => {
        await addNewColums(e)
      })

    } else {  
          await getListColumTitle().then((res) => {     
            res.forEach((t => {  
              if(tableStore.columns.find(e => e.dataIndex === t.dataIndex)) {
                return
              } else {
                tableStore.setColumns(t)
              }
            }))
          })
       }
  })
}

async function getDbMainKey() {
  const getCounte =  getCountMainKey()
  getCounte.then(async (res:number) => {    
      if(res === 0) {   
        for (const e of tableStore.mainKey) {
        await addNewMainKey(e);
        }
    } else {  
          await getListMainKey().then((res) => {     
            res.forEach(((t: any) => {  
              if(tableStore.mainKey.find(e => e === t.id)) {
                return
              } else {
                tableStore.setMainKeys(t.id)
                tableStore.updatedForm(t.id, 'main')
                tableStore.updatedRules(t.id)
              }
            }))
          })
       }
  })
}

async function getDbSubKey() {
  const getCounte =  getCountSubKey()
  getCounte.then(async (res:number) => {    
      if(res === 0) {
        for (const e of tableStore.subKey) {
        await addNewSubKey(e);
        }

    } else {  
          await getListSubKey().then((res) => {     
            res.forEach(((t: any) => {  
              if(tableStore.subKey.find(e => e === t.id)) {
                return
              } else {
                tableStore.setSubKeys(t.id)
                tableStore.updatedForm(t.id, 'sub')
              }
            }))
          })
       }
  })
}
onMounted(async () => {
  await getDbCriteria()
  await getDbColum()
  await getDbMainKey()
  await getDbSubKey()
})

watch(() => tableStore.listCriteria, async () => {
    addNewCriteria(tableStore.listCriteria[tableStore.listCriteria.length -1])
}, {
  deep: true
})

watch(() => tableStore.columns, async () => {
      addNewColums(tableStore.columns[tableStore.columns.length -1])
}, {
  deep: true
})

watch(() => tableStore.mainKey, async () => {
  addNewMainKey(tableStore.mainKey[tableStore.mainKey.length -1])
  tableStore.updatedForm(tableStore.mainKey[tableStore.mainKey.length -1], 'main')
  tableStore.updatedRules(tableStore.mainKey[tableStore.mainKey.length -1])
}, {
  deep: true
})

watch(() => tableStore.subKey, async () => {
      addNewSubKey(tableStore.subKey[tableStore.subKey.length -1])
      tableStore.updatedForm(tableStore.subKey[tableStore.subKey.length -1], 'sub')
}, {
  deep: true
})

</script>
<style lang="css">
.container {
   position: relative;
}


.sidebar {
    z-index: 1;
    position: absolute;
}

</style>