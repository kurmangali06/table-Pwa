import type { IFormState } from "~/interface";

export function calculateCompletionPercentage(array: IFormState[]): { main: number, sub: number } {
  const keyOfMain = useTableStore().mainKey.length
  const keyOfSub = useTableStore().subKey.length
  const averageMain:number[] = []
  const averageSub:number[] = []
  array.forEach(item => {
    const valueLengthMain = Object.values(item.main).filter(e => e !== '' || e !== undefined).length
    const valueLengthSub = Object.values(item.sub).filter(e => e !== '' || e !== undefined).length
    const percentageMain  = valueLengthMain/keyOfMain * 100 ;
    const percentageSub = valueLengthSub/keyOfSub * 100;
    averageMain.push(percentageMain)
    averageSub.push(percentageSub)
  });
  const mainPercentage = calculateAverage(averageMain);
  const subPercentage = calculateAverage(averageSub)  
  return { main: mainPercentage, sub: subPercentage };
}


 export function calculateAverage(arr: number[]): number {
    const sum = arr.reduce((a, b) => a + b, 0);
    return  (sum / arr.length) ;
  }