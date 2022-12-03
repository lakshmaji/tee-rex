import React, { useEffect, useState } from 'react';
import { delay, distinctUntilChanged, filter } from 'rxjs';
import { classNames } from '../../../utils/common.utils';
import styles from './alert.module.scss';
import { alertService } from '../../../services/alert';
import { IAlert } from '../../../types/common';

const Alert = () => {
  const [message, setMessage] = useState<IAlert>();
  useEffect(() => {
    const subscription = alertService
      .getMessage()
      .pipe(filter<any | undefined>((item) => typeof item !== 'undefined'))
      .subscribe((items) => {
        setMessage(items);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const subscription = alertService
      .getMessage()
      .pipe(
        filter<any | undefined>((item) => typeof item !== 'undefined'),
        distinctUntilChanged(),
        delay(3000), // in ms
      )
      .subscribe(() => {
        setMessage({} as IAlert);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const clearNotification = () => {
    alertService.clearMessages();
  };

  return (
    <>
      {message?.message && (
        <div
          className={classNames(
            'w-100 position-fixed sticky-top  d-flex align-items-center justify-content-center text-center',
            styles.container,
          )}
        >
          <div
            className={classNames('alert bg-success  py-1', styles.text_sm, styles[message.type])}
            role='alert'
          >
            <span className='text-white'>{message.message}</span>

            <button
              className='shadow-none btn text-white p-0 ml-2'
              type='button'
              onClick={clearNotification}
            >
              <i className='fa fa-times' aria-hidden='true'></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
