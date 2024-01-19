import type { IFormState } from "~/interface";

export function calculateCompletionPercentage(array: IFormState[]): { main: number, sub: number } {
  let mainTotal = 0;
  let mainFilled = 0;
  let subTotal = 0;
  let subFilled = 0;
  console.log(array.length);
  
  array.forEach(item => {
    Object.entries(item.main).forEach(([key, value]) => {
      if(key)
        mainTotal++;
      if (value && value !== '') 
          mainFilled++;

    });

    Object.entries(item.sub).forEach(([key, value]) => {
      if(key)
        subTotal++;
      if (value && value !== '') 
        subFilled++;
    });
  });

  const mainPercentage = (mainFilled / mainTotal) * 100;
  const subPercentage = (subFilled / subTotal) * 100;

  return { main: mainPercentage, sub: subPercentage };
}


 export function calculateAverage(arr: number[]): number {
    const sum = arr.reduce((a, b) => a + b, 0);
    return  (sum / arr.length) ;
  }