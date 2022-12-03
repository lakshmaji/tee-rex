import { BehaviorSubject, Observable } from 'rxjs';
import { IAlert } from '../types/common';


class MessageService {
  private _subject = new BehaviorSubject<IAlert>({} as IAlert);

  private static instance: MessageService;

  public static getInstance(): MessageService {
    if (!MessageService.instance) {
      MessageService.instance = new MessageService();
    }

    return MessageService.instance;
  }

  sendMessage(message: string, type: 'error' | 'success') {
    this._subject.next({ message: message, type } as IAlert);
  }
  clearMessages() {
    this._subject.next({} as IAlert);
  }
  getMessage(): Observable<IAlert> {
    return this._subject.asObservable();
  }
}

export const messageService = MessageService.getInstance();
