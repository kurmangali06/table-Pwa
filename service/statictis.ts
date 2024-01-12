import type { IFormState } from "~/interface";

export function calculateFilledPercentage(arr: IFormState[]): { mainFilledPercents: number[], subFilledPercents: number[] } {
    const mainFilledPercents: number[] = [];
    const subFilledPercents: number[] = [];
  
    arr.forEach((item) => {
      const mainFilledCount =item.main ?  Object.values(item.main).filter(val => val !== null && val !== undefined && val !== '' && val !== 0).length: 0;  
      const subFilledCount =item.sub ? Object.values(item.sub).filter(val => val !== null && val !== undefined && val !== ''  && val !== 0).length : 0;      
      const mainTotalFields = item.main ? Object.keys(item.main).length: 0;
      const subTotalFields = item.sub ?  Object.keys(item.sub).length : 0;
  
      const mainFilledPercent = (mainFilledCount === 0 ? 1 : mainFilledCount / mainTotalFields) * 100;
      const subFilledPercent = (subFilledCount === 0 ? 1 : subFilledCount / subTotalFields) * 100;
  
      mainFilledPercents.push(mainFilledPercent);
      subFilledPercents.push(subFilledPercent);      
    });  
    return {
      mainFilledPercents,
      subFilledPercents
    };
  }

 export function calculateAverage(arr: number[]): number {
    const sum = arr.reduce((a, b) => a + b, 0);
    return  (sum / arr.length) ;
  }