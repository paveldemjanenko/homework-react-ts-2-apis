import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { notify } from 'react-notify-toast';
import { UserForm } from './';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-notify-toast', () => ({
    notify: {
        show: jest.fn(),
    },
}));

test('should fill form and submit with 200', async () => {
    mockedAxios.get.mockResolvedValue({
        data: {
            results: [
                {
                    name: { first: 'Peter', last: 'Parker' },
                    email: 'spider@spin.web'
                },
            ],
        },
    });

    mockedAxios.post.mockResolvedValue({});

    render(<UserForm />);

    //** Prefill form */
    const prefillButton = screen.getByText(/prefill user info/i);

    fireEvent.click(prefillButton);

    await waitFor(() => {
        expect(screen.getByDisplayValue(/peter/i)).toBeInTheDocument();
    });

    await waitFor(() => {
        expect(screen.getByDisplayValue(/parker/i)).toBeInTheDocument();
    });

    await waitFor(() => {
        expect(screen.getByDisplayValue(/spider@spin.web/i)).toBeInTheDocument();
    });

    //**Select Car */
    const carInput = screen.getByTestId('select');

    fireEvent.change(carInput, { target: { value: 'Golf' } });
    
    //**Select Date */

    const dateInput = screen.getByPlaceholderText(/click to select a date/i);

    fireEvent.change(dateInput, { target: { value: new Date() } });

    const submitButton = screen.getByText(/submit/i);

    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(notify.show).toHaveBeenCalledWith('Form successfully submitted', 'success', 2000);
    });
});

test('should submit form and get an error', async () => {
    mockedAxios.post.mockRejectedValue({});

    render(<UserForm />);

    const submitButton = screen.getByText(/submit/i);

    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(notify.show).toHaveBeenCalledWith(undefined, 'error', 2000);
    });
});
