import React from 'react';

import classes from './Pagination.css';

const Pagination = (props) =>{
    const pageNumber = [];
    for(let i=1; i<=Math.ceil(props.totalItems/ props.itemsPerPage); i++){
        pageNumber.push(i);
    }
    const list = pageNumber.map(num=>{
    const activeClass = (props.crntPage === num) ? classes.active : null;
    return <li key={num} onClick={() => props.clicked(num)} className={activeClass}>{num}</li>
    });

    const disablePrev = props.crntPage<=1 ? classes.disable : null;
    const disableNext = props.crntPage>=Math.ceil(props.totalItems/ props.itemsPerPage) ? classes.disable : null;

    return(
        <div className={classes.Pagination}>
           <div>
           <ul className={classes.PaginationList}>
                <li onClick={props.prev} className={disablePrev}>Prev</li>
                    {list}
                <li onClick={props.next} className={disableNext}>Next</li>
            </ul>
           </div>
           <div>
             <p>
                 Admins Per Page:
                 <span>
                     <input type="number" placeholder='8' onChange={(e) => props.changed(e)}/>
                 </span>
             </p>  
           </div>
        </div>
    );
}

export default Pagination;