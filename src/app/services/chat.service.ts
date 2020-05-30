import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  public messages: Message[] = [];

  public initMessages(): Message[] {
    this.messages = JSON.parse(localStorage.getItem('messages')) || [];
    return this.messages;
  }
  public addLocalMessage(message: Message) {
    this.messages.push(message);
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public editMessageLocal(message: Message) {
    message.editing = true;
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public doneEditLocalMessage(message: Message) {
    message.editing = false;
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public cancelEditLocalMessage(message: Message) {
    message.editing = false;
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public deleteLocalMessage(id: string) {
    this.messages = this.messages.filter((message) => message.id !== id);
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
}
