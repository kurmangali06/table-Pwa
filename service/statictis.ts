import type { IFormState } from "~/interface";

export function calculateFilledPercentage(arr: IFormState[]): { mainFilledPercents: number[], subFilledPercents: number[] } {
    const mainFilledPercents: number[] = [];
    const subFilledPercents: number[] = [];
  
    arr.forEach((item) => {      
      const mainFilledCount =  item.main ?  Object.values(item.main).filter(val => val !== null && val !== undefined && val !== '' && val !== 0).length : 1;  
      const subFilledCount = item.sub ?  Object.values(item.sub).filter(val => val !== null && val !== undefined && val !== ''  && val !== 0).length : 1;      
      const mainTotalFields =  Object.keys(item.main).length || 1;
      const subTotalFields =   Object.keys(item.sub).length || 1 ;

      
      const mainFilledPercent = ( mainFilledCount / mainTotalFields) * 100;
      const subFilledPercent = ( subFilledCount / subTotalFields) * 100;
      
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