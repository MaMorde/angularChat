import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { Message } from '../interfaces/message';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(
    private changeDetector: ChangeDetectorRef,
    private auth: AuthService,
    private chatServive: ChatService
  ) {}

  messages: Message[];
  message: string;
  date: Date;
  beforeEditMessage: string;

  ngOnInit(): void {
    this.messages = this.chatServive.initMessages();
    this.message = '';
    this.beforeEditMessage = '';
  }

  dateNow(): Date {
    this.date = new Date();
    return this.date;
  }
  addMessage(): void {
    if (this.message.trim() == '') {
      alert('Введите сообщение');
      return;
    } else {
      let newMessage: Message = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        user: this.auth.loggedUsername,
        text: this.message,
        editing: false,
        date: this.dateNow(),
      };
      this.chatServive.addLocalMessage(newMessage);

      this.message = '';

      this.messages = this.chatServive.initMessages();
    }
  }

  getLoggedName() {
    return this.auth.initLogged();
  }

  editMessage(message: Message): void {
    this.beforeEditMessage = message.text;
    this.chatServive.editMessageLocal(message);
  }
  doneEditMessage(message: Message): void {
    if (message.text.trim().length === 0) {
      message.text = this.beforeEditMessage;
    }
    this.chatServive.doneEditLocalMessage(message);
  }
  cancelEditMessage(message: Message) {
    message.text = this.beforeEditMessage;
    this.chatServive.cancelEditLocalMessage(message);
  }
  deleteMessage(message: Message) {
    this.chatServive.deleteLocalMessage(message.id);
    this.messages = this.chatServive.initMessages();
  }
}
