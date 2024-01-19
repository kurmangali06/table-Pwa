<template >
    <div class="container" id="main_container">
        <div class="sidebar">
            <div style="width: 256px">
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
import { addNewCriteria } from '~/service/IndexedDBService';
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
onBeforeMount(() => {
  if(tableStore.listCriteria.length) {
  tableStore.listCriteria.forEach(e => {
     addNewCriteria(e as IListCrieria)
  })
}
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
.page {
    padding-top: 10px;
}
</style>