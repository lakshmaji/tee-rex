import { Observable } from 'rxjs/internal/Observable';
import { IAlert } from '../types/common';
import { AlertService, alertService } from './alert';
import { filter, Subscription } from 'rxjs';

describe('AlertService', () => {
  let alert$: Observable<IAlert>;
  let subscription: Subscription;

  beforeEach(() => {
    alert$ = alertService.getMessage();
  });

  afterEach(() => {
    subscription?.unsubscribe();
  });

  it('should be a singleton', () => {
    const instance1 = AlertService.getInstance();
    const instance2 = AlertService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should send a success message', (done) => {
    subscription = alert$.subscribe((alert: IAlert) => {
      expect(alert.message).toBe('Success message');
      expect(alert.type).toBe('success');
      done();
    });

    alertService.sendMessage('Success message', 'success');
  });

  it('should send an error message', (done) => {
    subscription = alert$.subscribe((alert: IAlert) => {
      expect(alert.message).toBe('Error message');
      expect(alert.type).toBe('error');
      done();
    });

    alertService.sendMessage('Error message', 'error');
  });

  it('should clear messages', (done) => {
    subscription = alert$.subscribe((alert: IAlert) => {
      expect(alert).toEqual({} as IAlert);
      done();
    });

    alertService.clearMessages();
  });

  it('should not emit anything before a message is sent', (done) => {
    subscription = alert$.subscribe((alert: IAlert) => {
      expect(alert).toEqual({} as IAlert);
      done();
    });
  });

  it('should clear messages correctly after sending one', (done) => {
    subscription = alert$
      .pipe(filter<IAlert>((item) => Object.keys(item || {}).length > 0))
      .subscribe((alert: IAlert) => {
        expect(alert).toEqual({ message: 'Temporary message', type: 'success' } as IAlert);
        done();
      });

    alertService.sendMessage('Temporary message', 'success');
    alertService.clearMessages();
  });
});
