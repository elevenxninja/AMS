import React from 'react';

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
            inputEl = null;
        break;    
    }
    return(
        <div>
            <label>{props.label}</label>
            {inputEl}
        </div>
    );
}

export default Input;