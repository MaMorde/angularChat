import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { IMessage } from '../../interfaces/message';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  constructor(private auth: AuthService, private chatServive: ChatService) {}
  public messages: IMessage[];
  public message: string;
  public date: Date;
  public sub: Subscription;
  public beforeEditMessage: string;
  public messageControl: FormControl;
  public messageEditControl: FormControl;
  @ViewChild('container') public container: ElementRef;

  public ngOnInit() {
    this.messages = this.chatServive.initMessages();
    this.message = '';
    this.beforeEditMessage = '';
    this.messageControl = new FormControl('', []);
    this.messageEditControl = new FormControl('', []);
  }
  public ngAfterViewInit() {
    this.scrollToBottom();
  }
  private scrollToBottom() {
    const container: HTMLDivElement = this.container.nativeElement;
    setTimeout(() => (container.scrollTop = container.scrollHeight), 0);
  }
  public dateNow(): Date {
    this.date = new Date();
    return this.date;
  }
  public addMessage() {
    this.scrollToBottom();

    const newMessage: IMessage = {
      id: Math.random(),
      user: this.auth.getAuthUser(),
      text: this.message.trim(),
      editing: false,
      date: this.dateNow(),
    };
    this.chatServive.addLocalMessage(newMessage);

    this.message = '';

    this.messages = this.chatServive.initMessages();
  }

  public getLoggedName() {
    return this.auth.getAuthUser().username;
  }

  public editMessage(message: IMessage) {
    this.beforeEditMessage = message.text;
    this.chatServive.editMessageLocal(message);
  }
  public doneEditMessage(message: IMessage) {
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
