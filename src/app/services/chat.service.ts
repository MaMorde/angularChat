import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public messages: IMessage[] = [];
  private subjectMessages: BehaviorSubject<IMessage[]> = null;

  constructor() {
    const messagesParsed = JSON.parse(localStorage.getItem('messages'));
    this.messages = messagesParsed ? messagesParsed : [];
    this.subjectMessages = new BehaviorSubject<IMessage[]>(this.messages);
    this.subjectMessages.subscribe((messages) =>
      localStorage.setItem('messages', JSON.stringify(messages))
    );
  }
  public getMessages(): BehaviorSubject<IMessage[]> {
    return this.subjectMessages;
  }
  public addMessage(message: IMessage) {
    this.messages.push(message);
    this.subjectMessages.next(this.messages);
  }
  public editMessage(message: IMessage) {
    message.editing = true;
    this.subjectMessages.next(this.messages);
  }
  public doneEditMessage(message: IMessage) {
    message.editing = false;
    this.subjectMessages.next(this.messages);
  }
  public cancelEditMessage(message: IMessage) {
    message.editing = false;
    this.subjectMessages.next(this.messages);
  }
  public deleteMessage(id: number) {
    this.messages = this.messages.filter((message) => message.id !== id);
    this.subjectMessages.next(this.messages);
  }
}
