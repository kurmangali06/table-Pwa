import Dexie from 'dexie';
import type { IColumn, IFormState, IListCrieria, RulesRefType } from '~/interface';
import { isFormState } from './helper';



class MyDatabase extends Dexie {
  myObjectStore: Dexie.Table<IFormState, number>;
  archiveStore: Dexie.Table<IFormState, number>;
  listCrieria: Dexie.Table<IListCrieria, number>;
  columnsTitle: Dexie.Table<IColumn, number>;
  mainKeys: Dexie.Table<any, string>;
  subKeys: Dexie.Table<any, string>;
  rulesRef: Dexie.Table<RulesRefType, number>;
  constructor() {
    super('myDatabase');

    // Определение структуры базы данных
    this.version(1).stores({
      myObjectStore: '++id, name',
    });
    this.version(2).stores({
      archiveStore: '++id, name' 
    });
    this.version(3).stores({
      listCrieria: '++id, name' 
    });
    this.version(4).stores({
      columnsTitle: '++id, name'
    });
    this.version(5).stores({
      mainKeys: 'name'
    });
    this.version(6).stores({
      subKeys: 'name'
    });
    this.version(7).stores({
      rulesRef: '++id, name'
    });

    // Инициализация хранилища объектов
    this.myObjectStore = this.table('myObjectStore');
    this.archiveStore = this.table('archiveStore');
    this.listCrieria = this.table('listCrieria');
    this.columnsTitle = this.table('columnsTitle');
    this.mainKeys = this.table('mainKeys');
    this.subKeys = this.table('subKeys');
    this.rulesRef = this.table('rulesRef');
  }
}

const db = new MyDatabase();
function prepareDataForStorage<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
  
}
export const addDataToIndexedDB = async (data: IFormState): Promise<number> => {
  try {
    const serializableData = prepareDataForStorage<IFormState>(data);
    const addedItemId = await db.myObjectStore.add(serializableData as IFormState);
    return addedItemId;
  } catch (error) {
    console.error('Error adding object to the store', error);
    throw error;
  }
};

export const addDataToArchive = async (data: IFormState) => {
  try {
    if (data.status === 'archival') {
      const serializableData   = prepareDataForStorage<IFormState>(data);
      await db.archiveStore.add(serializableData);
      await deleteDataFromIndexedDB(serializableData.id)
    }
    // Для других статусов можно вызвать addDataToIndexedDB или обработать по-другому
  } catch (error) {
    console.error('Error adding object to the archive store', error);
    throw error;
  }
};
export const deleteDataFromIndexedDB = async (id: any) => {
  try {
    await db.myObjectStore.delete(id);
    console.log(`Record with id ${id} has been deleted from myObjectStore`);
  } catch (error) {
    console.error('Error deleting object from the store', error);
    throw error;
  }
};
export const getAllDataFromIndexedDB = async (filterCriteria = null): Promise<IFormState[]> => {
  try {
    let result;
    if (filterCriteria) {      
      result = await db.myObjectStore
        .filter(item => {          
          return Object.keys(filterCriteria).every(key => {
            return item.main[key.trim()] === filterCriteria[key.trim()] || item.sub[key.trim()] === filterCriteria[key.trim()];
          });
        })
        .toArray();
    } else {
      // Если критерии фильтрации отсутствуют, получаем все данные
      result = await db.myObjectStore.toArray();
    }
    return result;
  } catch (error) {
    console.error('Error retrieving data from the store', error);
    throw error;
  }
};
export const clearIndexedDB = async (): Promise<void> => {
  try {
    await db.myObjectStore.clear();
  } catch (error) {
    console.error('Error clearing IndexedDB', error);
    throw error;
  }
};

export const getAllStatusArchival =async () => {
  const result = await db.archiveStore.toArray();
  return result;
}
export const arrayLength = async () => {
  try {
    const length = await db.myObjectStore.count();
    return length
  } catch (error) {
    console.error('Error getting array length', error);
  }
};
export const updateDataInIndexedDB = async (id: any, newData: IFormState): Promise<void> => {
  try {
    const serializableData = prepareDataForStorage<IFormState>(newData);
    await db.myObjectStore.update(id, serializableData);
  } catch (error) {
    console.error('Error updating object in the store', error);
    throw error;
  }
};
export const deleteoArchive = async (id: any) => {
  try {
    await db.archiveStore.delete(id);
    console.log(`Record with id ${id} has been deleted from myObjectStore`);
  } catch (error) {
    console.error('Error deleting object from the store', error);
    throw error;
  }
};
export const getListCriteria = async (): Promise<IListCrieria[]> => {
  const result = await db.listCrieria.toArray()
  return result;
}
export const addNewCriteria = async( val: IListCrieria) => {
  const serializableData = prepareDataForStorage<IListCrieria>(val);  
  await db.listCrieria.add(serializableData)
}

export const updateCriteria = async(id: any, val: IListCrieria) => {  
  try {
    const serializableData = prepareDataForStorage<IListCrieria>(val);
    await db.listCrieria.update(id, serializableData);
  } catch (error) {
    if(error instanceof Error )
    console.error('Error updateCriteria:', error.message);
  }  
}


export const getListMainKey =async ():Promise<string[]> => {
  const result = await db.mainKeys.toArray()
  return result
}
export const getListColumTitle =async (): Promise<IColumn[]> => {
  const result = await db.columnsTitle.toArray()
  return result
}


export const getListSubKey =async ():Promise<string[]> => {
  const result = await db.subKeys.toArray()
  return result
}
export const getRules =async () => {
  const result = await db.rulesRef.toArray()
  return result
}
export const addNewMainKey =async (key: string) => {
  try {
    await db.mainKeys.add({ id: key });
  } catch (error) {
    if(error instanceof Error )
    console.error('Error adding key to mainKeys:', error.message);
  }
}

export const addNewSubKey = async (key: string) => {
  try {
    await db.subKeys.add({id: key}) 
  } catch (error) {
    if(error instanceof Error )
    console.error('Error adding key to subKeys:', error.message);
  }

}
export const addNewColums = async (val: IColumn) => {
  const serializableData = prepareDataForStorage<IColumn>(val);
  await db.columnsTitle.add(serializableData) 
}

export const addNewRules =async (val: RulesRefType) => {
  await db.rulesRef.add(val) 
}

export const getCountCriteria = async (): Promise<number> => {
  const length = await db.listCrieria.count();
  return length
}

export const getCountMainKey =async () : Promise<number> => {
  const length = await db.mainKeys.count();
  return length
}

export const getCountSubKey =async () : Promise<number>=> {
  const length = await db.subKeys.count();
  return length
}

export const getCountColumnsTitle =async (): Promise<number> => {
  const length = await db.columnsTitle.count();
  return length
}
export const getCountRules =async (): Promise<number> => {
  const length = await db.rulesRef.count();
  return length
}
export default db;
