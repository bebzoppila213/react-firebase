import {
  collection,
  CollectionReference,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { db, storage } from "../firebase";

export interface ITodoItem {
  id: string;
  img: string;
  title: string;
  completionDate: string;
  description: string;
  done: boolean;
}

interface TodoApi {
  create: (
    completionDate: string,
    description: string,
    title: string,
    img: File | null
  ) => Promise<ITodoItem>;
  loadTodo: () => Promise<ITodoItem[]>;
  loadImages: (img: File) => Promise<string>;
}

export class TodoApiFireBase implements TodoApi {
  todoCollectionRef: CollectionReference;

  constructor() {
    this.todoCollectionRef = collection(db, "todo");
  }

  public async create(
    completionDate: string,
    description: string,
    title: string,
    img: File | null
  ) {
    const imgPath = await this.loadImages(img);
    const uploadTodoItem = {
      completionDate: completionDate,
      description: description,
      done: false,
      title: title,
      img: imgPath,
    };
    const res = await addDoc(this.todoCollectionRef, uploadTodoItem);
    return { ...uploadTodoItem, id: res.id };
  }

  public async loadTodo() {
    const data = await getDocs(this.todoCollectionRef);
    const allTodo = [] as ITodoItem[];

    for (let index = 0; index < data.docs.length; index++) {
      const todoData = data.docs[index].data() as ITodoItem;
      let imgPath = "";
      if (todoData.img !== "") {
        // const imageRef = ref(storage, `images/${todoData.img}`);
        imgPath = todoData.img
      }
      allTodo.push({ ...todoData, id: data.docs[index].id, img: imgPath });
    }

    return allTodo;
  }

  public async loadImages(image: File | null) {
    if (!image) return "";
    const imageName = image.name + v4();
    const imageRef = ref(storage, `images/${imageName}`);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  }

  public async updateTodoField(
    id: string,
    key: keyof ITodoItem,
    value: string | boolean | File
  ) {
    let result = "";
    if (value instanceof File) {
      result = await this.loadImages(value);
    } else {
      result = String(value);
    }
    const todoDoc = doc(db, "todo", id);
    await updateDoc(todoDoc, { [key]: result });
    return result
  }

  public async deleteTodo(id: string,){
    const todoDock = doc(db, 'todo', id)
    deleteDoc(todoDock)
  }
}
