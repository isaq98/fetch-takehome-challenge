import { useState, useEffect, useReducer } from 'react';
import toast from 'react-hot-toast';
import { staticResponse } from 'Utils/StaticData';
import TextFields from 'Components/TextFields';
import DropdownFields from 'Components/DropdownFields';
import './_CreationForm.scss';

const API_URL = "https://frontend-take-home.fetchrewards.com/form";
const initialValues = {
    name: '',
    email: '',
    password: '',
    occupation: '',
    state: ''
};

function reducer(state, action) {
    switch(action.type) {
        case 'update_name':
            return {
                ...state,
                name: action.value
            }
        case 'update_email':
            return {
                ...state,
                email: action.value
            }
        case 'update_password':
            return {
                ...state,
                password: action.value
            }
        case 'update_occupation':
            return {
                ...state,
                occupation: action.value
            }
        case 'update_state':
            return {
                ...state,
                state: action.value
            }
        case 'reset_state':
            return initialValues;
        default:
            return state;
    }
}

function CreationForm() {
    const [occupationList, setOccupationList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [state, dispatch] = useReducer(reducer, initialValues);

    function handleError(response) {
        if(!response.ok) {
            throw Error(response.statusText);
        } 
        else {
            return response.json();
        }
    }

    useEffect(() => {
        // fetch(API_URL)
        //     .then((res) => handleError(res))
        //     .then((data) => {
        //         for(const key of Object.keys(data)) {
        //             key === 'occupations' ? setOccupationList(data[key]) : setStateList(data[key]);
        //         }
        //     });
        //     .catch(console.error);
        for(const key of Object.keys(staticResponse)) {
            key === 'occupations' ? setOccupationList(staticResponse[key]) : setStateList(staticResponse[key]);
        }
    }, []);

    function validateFormInput() {
        var errorText = '';

        //Regex was found from: https://salesforce.stackexchange.com/questions/286145/regex-for-string-but-at-least-one-character-must-be-a-number-or-letter
        if(!state.password.match(/\w*\d/)) {
            errorText += '-Password should contain a letter & number\n';
        }
        //Regex was found from: https://regexr.com/3e48o
        if(!state.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            errorText += '-Please enter a valid format for an email address';
        }
        if(errorText) {
            toast.error(errorText);
            return false;
        }
        return true;
    }

    useEffect(() => {
        function submitHandler(event) {
            event.preventDefault();
            const valid = validateFormInput();
            if(valid) {
                // fetch(API_URL, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(state)
                // })
                // .then((res) => handleError(res))
                // .then(() => {
                //     toast.success('Form successfully submitted!');
                //     dispatch({type: 'reset_state'});
                // })
                // .catch(console.error);
            }
        }

        document.addEventListener('submit', submitHandler);

        return () => {
            document.removeEventListener('submit', submitHandler);
        }
    });
    
    const emptyFields = Object.values(state).filter((element) => element === '').length > 0;
    return (
        <div className="creation-form">
            <form className="form">
                <TextFields dispatch={dispatch} currState={state} />
                <DropdownFields dispatch={dispatch} currState={state} occupationList={occupationList} stateList={stateList} />
                <div className="form-group">
                <input 
                    type="submit" 
                    className={`submit-form ${emptyFields ? 'disabled' : 'active'}`} 
                    value="Submit" 
                    disabled={emptyFields ? true : false}    
                    />
                </div>
            </form>
        </div>
    )
}

export default CreationForm;