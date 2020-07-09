import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { IMessage } from '../../interfaces/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public messages: IMessage[];
  public message: string;
  public date: Date;
  public beforeEditMessage: string;
  public messageControl: FormControl;
  public messageEditControl: FormControl;
  constructor(private auth: AuthService, private chatServive: ChatService) {}

  public ngOnInit(): void {
    this.messages = this.chatServive.initMessages();
    this.message = '';
    this.beforeEditMessage = '';
    this.messageControl = new FormControl('', [
      Validators.required,
      Validators.pattern('^[^ ]+'),
    ]);
    this.messageEditControl = new FormControl('', [
      Validators.required,
      Validators.pattern('^[^ ]+'),
    ]);
  }

  public dateNow(): Date {
    this.date = new Date();
    return this.date;
  }
  public addMessage(): void {
    const newMessage: IMessage = {
      id: Math.random(),
      user: {
        id: this.auth.currentUser.id,
        username: this.auth.currentUser.username,
        password: this.auth.currentUser.password,
      },
      text: this.message,
      editing: false,
      date: this.dateNow(),
    };
    this.chatServive.addLocalMessage(newMessage);

    this.message = '';

    this.messages = this.chatServive.initMessages();
  }

  public getLoggedName() {
    return this.auth.initLogged().username;
  }

  public editMessage(message: IMessage): void {
    this.beforeEditMessage = message.text;
    this.chatServive.editMessageLocal(message);
  }
  public doneEditMessage(message: IMessage): void {
    if (this.messageEditControl.invalid) {
      message.text = this.beforeEditMessage;
    }
    this.chatServive.doneEditLocalMessage(message);
  }
  public cancelEditMessage(message: IMessage) {
    message.text = this.beforeEditMessage;
    this.chatServive.cancelEditLocalMessage(message);
  }
  public deleteMessage(message: IMessage) {
    this.chatServive.deleteLocalMessage(message.id);
    this.messages = this.chatServive.initMessages();
  }
}
