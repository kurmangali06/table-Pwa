import { PDFPlugin } from 'vue3-pdfmake';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(PDFPlugin);
});