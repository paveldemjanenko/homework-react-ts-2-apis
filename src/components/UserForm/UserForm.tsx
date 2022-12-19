import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { getRequest, postRequest } from '../../services/requests';
import { notify } from 'react-notify-toast';

import 'react-datepicker/dist/react-datepicker.css';
import './UserForm.css';

const UserForm: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [userLastName, setUserLastName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [selectedCar, setSelectedCar] = useState<string>('');
    const [purchaseDate, setPurchaseDate] = useState<Date | null>(null);

    const prefillUserInfo = () => {
        getRequest('https://randomuser.me/api/')
            .then((response) => {
                const result = response?.results[0];
                setUserName(result.name?.first);
                setUserLastName(result.name?.last);
                setUserEmail(result.email);
            })
            .catch(() => notify.show('Something went wrong!', 'error', 2000));
    }; 

    const selectOptions = [
        { value: '', text: 'Please select a car' },
        { value: 'Golf', text: 'Golf' },
        { value: 'Arteon', text: 'Arteon' },
        { value: 'Tiguan', text: 'Tiguan' },
    ];

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedCar(value);
    };

    const submitForm = () => {
        const url = 'https://acc-test-vjn7.onrender.com/form';
        const body = {
            firstname: userName,
            lastname: userLastName,
            email: userEmail,
            car: selectedCar,
            purchasedate: purchaseDate,
        };
        const config = {
            headers: {
                'x-api-key': 'letmein',
                'content-type': 'application/json',
            },
        };
        postRequest(url, body, config)
            .then(() => notify.show('Form successfully submitted', 'success', 2000))
            .catch((error: string) => notify.show(error, 'error', 2000));
    };

    return (
        <form className="user-form">
            <label>Name</label>
            <input 
                type="text"
                name="name"
                value={userName}
                readOnly
            />

            <label>Last Name</label>
            <input 
                type="text"
                name="lastName"
                value={userLastName}
                readOnly
            />

            <label>E-mail</label>
            <input 
                type="text"
                name="email"
                value={userEmail}
                readOnly
            />

            <label>Car</label>
            <select data-testid="select" value={selectedCar} onChange={selectChange}>
                {selectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>

            <label>Purchase Date</label>
            <DatePicker
                placeholderText="Click to select a date"
                minDate={new Date(2018, 0, 1)}
                selected={purchaseDate}
                onChange={(date:Date) => setPurchaseDate(date)}
            />

            <div className='user-form-buttons'>
                <input type="button" value="Prefill User Info" onClick={() => prefillUserInfo()} />

                <input type="button" value="Submit" onClick={() => submitForm()} />
            </div>

        </form>
    );
}

export default UserForm;
