import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private firestore: Firestore) {}

  // Adicionar uma tarefa
  addTask(task: string) {
    const col = collection(this.firestore, 'tasks');
    return addDoc(col, { task });
  }

  // Obter todas as tarefas
  getTasks(): Observable<any[]> {
    const col = collection(this.firestore, 'tasks');
    return collectionData(col, { idField: 'id' });
  }

  // Atualizar uma tarefa existente
  updateTask(id: string, newTask: string) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return updateDoc(taskDoc, { task: newTask });
  }

  // Excluir uma tarefa
  deleteTask(id: string) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskDoc);
  }
}
