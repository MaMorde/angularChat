import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public messages: IMessage[] = [];

  public initMessages(): IMessage[] {
    this.messages = JSON.parse(localStorage.getItem('messages')) || [];
    return this.messages;
  }
  public addLocalMessage(message: IMessage) {
    this.messages.push(message);
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public editMessageLocal(message: IMessage) {
    message.editing = true;
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public doneEditLocalMessage(message: IMessage) {
    message.editing = false;
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public cancelEditLocalMessage(message: IMessage) {
    message.editing = false;
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public deleteLocalMessage(id: number) {
    this.messages = this.messages.filter((message) => message.id !== id);
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
}
