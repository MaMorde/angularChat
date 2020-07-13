import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public messages: BehaviorSubject<IMessage[]> = new BehaviorSubject([]);

  public getMessages(): IMessage[] {
    this.messages = JSON.parse(localStorage.getItem('messages')) || [];
    return this.messages;
  }
  public addMessage(message: IMessage) {
    this.messages.push(message);
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public editMessage(message: IMessage) {
    message.editing = true;
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public doneEditMessage(message: IMessage) {
    message.editing = false;
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public cancelEditMessage(message: IMessage) {
    message.editing = false;
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  public deleteMessage(id: number) {
    this.messages = this.messages.filter((message) => message.id !== id);
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
}
