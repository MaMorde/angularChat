import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interfaces/message';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public messages: Message[];
  public message: string;
  public date: Date;
  public beforeEditMessage: string;
  public messageControl: FormControl;
  public messageEditControl: FormControl;
  constructor(
    private changeDetector: ChangeDetectorRef,
    private auth: AuthService,
    private chatServive: ChatService
  ) {}

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
    const newMessage: Message = {
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

  public getLoggedName() {
    return this.auth.initLogged();
  }

  public editMessage(message: Message): void {
    this.beforeEditMessage = message.text;
    this.chatServive.editMessageLocal(message);
  }
  public doneEditMessage(message: Message): void {
    if (this.messageEditControl.invalid) {
      message.text = this.beforeEditMessage;
    }
    this.chatServive.doneEditLocalMessage(message);
  }
  public cancelEditMessage(message: Message) {
    message.text = this.beforeEditMessage;
    this.chatServive.cancelEditLocalMessage(message);
  }
  public deleteMessage(message: Message) {
    this.chatServive.deleteLocalMessage(message.id);
    this.messages = this.chatServive.initMessages();
  }
}
