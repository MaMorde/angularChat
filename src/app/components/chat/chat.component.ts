import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { IMessage } from '../../interfaces/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  constructor(private auth: AuthService, private chatServive: ChatService) {}
  public messages: Observable<IMessage[]>;
  public messageInput: string;
  public editing: boolean;
  public date: Date;
  public currentMessage: IMessage;
  public indexMessage: number;
  public messageControl: FormControl;
  @ViewChild('container') public container: ElementRef;
  @ViewChild('focus') public focus: ElementRef;

  public ngOnInit() {
    this.messages = this.chatServive.getMessages();
    this.messageInput = '';
    this.editing = false;
    this.messageControl = new FormControl('');
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
      text: this.messageInput.trim(),
      date: this.dateNow(),
    };
    this.chatServive.addMessage(newMessage);
  }
  public onSumbit() {
    if (this.editing === false) {
      this.addMessage();
    } else {
      const { text, ...data } = this.currentMessage;
      const editMessage = { text: this.messageInput, ...data };
      this.editing = false;
      this.chatServive.doneEditMessage(this.indexMessage, editMessage);
    }

    this.messageInput = '';
  }

  public getLoggedName(): string {
    return this.auth.getAuthUser().username;
  }
  public editMessage(index: number, editMessage: IMessage) {
    this.editing = true;
    this.indexMessage = index;
    this.messageInput = editMessage.text;
    this.currentMessage = editMessage;

    const focus: HTMLDivElement = this.focus.nativeElement;
    focus.focus();
  }
  // public doneEditMessage(index: number, textMessage: string) {
  //   this.editing = false;
  //   this.chatServive.doneEditMessage(index, textMessage);
  // }
  public cancelEditMessage() {
    this.editing = false;
    this.messageInput = '';
  }
  public deleteMessage(message: IMessage) {
    this.chatServive.deleteMessage(message.id);
  }
}
