import Dexie from 'dexie';
import type { IFormState } from '~/interface';



class MyDatabase extends Dexie {
  myObjectStore: Dexie.Table<IFormState, number>;

  constructor() {
    super('myDatabase');

    // Определение структуры базы данных
    this.version(1).stores({
      myObjectStore: '++id, name',
    });

    // Инициализация хранилища объектов
    this.myObjectStore = this.table('myObjectStore');
  }
}

const db = new MyDatabase();

export const addDataToIndexedDB = async (data: IFormState): Promise<number> => {
  try {
    const addedItemId = await db.myObjectStore.add(data);
    console.log(`Object added to the store with ID: ${addedItemId}`);
    return addedItemId;
  } catch (error) {
    console.error('Error adding object to the store', error);
    throw error;
  }
};

export const getAllDataFromIndexedDB = async (): Promise<IFormState[]> => {
  try {
    const result = await db.myObjectStore.toArray();
    return result;
  } catch (error) {
    console.error('Error retrieving data from the store', error);
    throw error;
  }
};

export const clearIndexedDB = async (): Promise<void> => {
  try {
    await db.myObjectStore.clear();
    console.log('IndexedDB cleared');
  } catch (error) {
    console.error('Error clearing IndexedDB', error);
    throw error;
  }
};


export default db;
