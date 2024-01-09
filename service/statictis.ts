import type { IFormState } from "~/interface";

export function calculateFilledPercentage(arr: IFormState[]): { mainFilledPercents: number[], subFilledPercents: number[] } {
    const mainFilledPercents: number[] = [];
    const subFilledPercents: number[] = [];
  
    arr.forEach((item) => {
      const mainFilledCount = Object.values(item.main).filter(val => val !== null && val !== undefined && val !== '' && val !== 0).length;
      const subFilledCount = Object.values(item.sub).filter(val => val !== null && val !== undefined && val !== ''  && val !== 0).length;
  
      const mainTotalFields = Object.keys(item.main).length;
      const subTotalFields = Object.keys(item.sub).length;
  
      const mainFilledPercent = (mainFilledCount / mainTotalFields) * 100;
      const subFilledPercent = (subFilledCount / subTotalFields) * 100;
  
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
    return arr.length > 0 ? Math.round(sum / arr.length) : 0;
  }