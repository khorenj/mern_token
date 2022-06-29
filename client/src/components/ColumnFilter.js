import  React from 'react';

export const ColumnFitler = ({column}) =>{
    const {filterValue, setFilter} = column;

    return(
        <span>
            <select className="browser-default">
                <option value="" disabled selected>Choose your option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
            <input value={filterValue || ""}
                onChange={(e)=>setFilter(e.target.value)}
            />
        </span>
    )
}