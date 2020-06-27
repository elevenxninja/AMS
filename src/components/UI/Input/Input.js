import React from 'react';

const Input = (props) =>{
    let inputEl ='';
    switch(props.elmType){
        case('input'):
            inputEl = <input {...props.elmConfig}
            onFocus={(e) => e.target.type = props.onfocus} 
            onBlur={(e) => e.target.type = 'text'}
            value={props.value} 
            onChange={props.changed} />
        break;
        case('textarea'):
            inputEl = <textarea {...props.elmConfig} value={props.value} onChange={props.changed} />
        break;
        case('select'):
            inputEl = 
                <select value={props.value} onChange={props.changed} >
                    {props.elmConfig.options.map(option=>{
                        return <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                    })}
                </select>
        break;
        default:
            inputEl = null;
        break;    
    }
    let label = null;
    if(props.label){
        label = <label>{props.label}</label>
    }
    return(
        <div>
            {label}
            {inputEl}
        </div>
    );
}

export default Input;