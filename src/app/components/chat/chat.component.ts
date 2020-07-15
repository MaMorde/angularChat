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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  constructor(private auth: AuthService, private chatServive: ChatService) {}
  public messages: IMessage[];
  public messageInput: string;
  public editing: boolean;
  public date: Date;
  public indexMessage: number;
  public sub: Subscription;
  public messageControl: FormControl;
  public messageEditControl: FormControl;
  @ViewChild('container') public container: ElementRef;

  public ngOnInit() {
    this.chatServive
      .getMessages()
      .subscribe((messages) => (this.messages = messages));

    this.messageInput = '';
    this.editing = false;
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
      text: this.messageInput.trim(),
      date: this.dateNow(),
    };
    this.chatServive.addMessage(newMessage);
  }
  public onSumbit() {
    if (this.editing === false) {
      this.addMessage();
    } else {
      this.doneEditMessage(this.indexMessage);
    }

    this.messageInput = '';
  }

  public getLoggedName(): string {
    return this.auth.getAuthUser().username;
  }
  public editMessage(message: IMessage) {
    this.editing = true;
    this.messageInput = message.text;
    this.indexMessage = this.messages.indexOf(message);
  }
  public doneEditMessage(index: number) {
    this.editing = false;
    this.messages[index].text = this.messageInput;
    this.chatServive.doneEditMessage(this.messages[index]);
  }
  public deleteMessage(message: IMessage) {
    this.chatServive.deleteMessage(message.id);
  }
}
