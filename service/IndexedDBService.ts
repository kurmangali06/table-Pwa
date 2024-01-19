import Dexie from 'dexie';
import type { IFormState, IListCrieria } from '~/interface';
import { isFormState } from './helper';



class MyDatabase extends Dexie {
  myObjectStore: Dexie.Table<IFormState, number>;
  archiveStore: Dexie.Table<IFormState, number>;
  listCrieria: Dexie.Table<IListCrieria, number>;
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

    // Инициализация хранилища объектов
    this.myObjectStore = this.table('myObjectStore');
    this.archiveStore = this.table('archiveStore');
    this.listCrieria = this.table('listCrieria');
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
      console.log(serializableData );
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
      console.log(filterCriteria);
      
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
export const getListCriteria = async () => {
  const result = await db.listCrieria.toArray()
  return result;
}
export const addNewCriteria = async( val: IListCrieria) => {
  const serializableData = prepareDataForStorage<IListCrieria>(val);
  await db.listCrieria.add(serializableData)
}

export default db;
