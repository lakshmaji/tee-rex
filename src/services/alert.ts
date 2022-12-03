import { BehaviorSubject, Observable } from 'rxjs';
import { IAlert } from '../types/common';

class AlertService {
  private _subject = new BehaviorSubject<IAlert>({} as IAlert);

  private static instance: AlertService;

  public static getInstance(): AlertService {
    if (!AlertService.instance) {
      AlertService.instance = new AlertService();
    }

    return AlertService.instance;
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

export const alertService = AlertService.getInstance();
