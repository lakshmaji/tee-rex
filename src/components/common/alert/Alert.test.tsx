import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { alertService } from '../../../services/alert';
import { IAlert } from '../../../types/common';
import Alert from './Alert';
import { of } from 'rxjs';
import { ALERT_TIMEOUT } from '../../../constants';

jest.mock('../../../services/alert');

describe('Alert Component', () => {
  let mockAlertService: jest.Mocked<typeof alertService>;

  beforeEach(() => {
    mockAlertService = alertService as jest.Mocked<typeof alertService>;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display a message when an alert is received', async () => {
    const alertMessage: IAlert = { message: 'Test success message', type: 'success' };
    mockAlertService.getMessage.mockReturnValue(of(alertMessage));

    render(<Alert />);

    const messageElement = await screen.findByText('Test success message');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('text-white');
  });

  it('should clear the message when close button is clicked', async () => {
    const alertMessage: IAlert = { message: 'Test error message', type: 'error' };
    mockAlertService.getMessage.mockReturnValue(of(alertMessage));

    render(<Alert />);

    const closeButton = await screen.findByRole('button');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockAlertService.clearMessages).toHaveBeenCalledTimes(1);
  });

  it('should automatically clear the message after the alert timeout', async () => {
    const alertMessage: IAlert = { message: 'This will disappear', type: 'success' };
    mockAlertService.getMessage.mockReturnValue(of(alertMessage));

    render(<Alert />);

    const messageElement = await screen.findByText('This will disappear');
    expect(messageElement).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(ALERT_TIMEOUT);
    });
    expect(screen.queryByText('This will disappear')).not.toBeInTheDocument();
  });

  it('should not render anything if no message is received', () => {
    mockAlertService.getMessage.mockReturnValue(of({} as IAlert));

    render(<Alert />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
