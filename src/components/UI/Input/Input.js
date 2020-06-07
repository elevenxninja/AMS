import React from 'react';

import classes from './Input.css';

const Input = (props) =>{
    let inputEl ='';
    switch(props.elmType){
        case('input'):
            inputEl = <input {...props.elmConfig} value={props.value} onChange={props.changed} />
        break;
        case('textarea'):
            inputEl = <textarea {...props.elmConfig} value={props.value} onChange={props.changed} />
        break;
        case('select'):
            inputEl = 
                <select value={props.value} onChange={props.changed} >
                    {props.elmConfig.options.map(option=>{
                        return <option key={option.value} value={option.value}>
                                    {option.displayValue}
                                </option>
                    })}
                </select>
        break;
        default:
            inputEl = <input {...props.elmConfig} value={props.value} onChange={props.changed} />
        break;    
    }
    return(
        <div>
            {inputEl}
        </div>
    );
}

export default Input;