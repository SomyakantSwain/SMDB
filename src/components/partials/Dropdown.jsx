import React from "react";

const Dropdown = ({title,options,func}) => {
  return (
    <div className='dropdown h-full  w-52 p-1 rounded-md bg-zinc-700 '>
    <select  onChange={func}  className='w-full outline-none bg-transparent' defaultValue={0} name="format" id="format">
        <option className='font-semibold bg-zinc-700' value="0" disabled>
            {title}
        </option>
        {options.map((o,i)=>(
               <option key={i} className='font-semibold bg-zinc-700' value={o} >
               {o.toUpperCase()}
           </option>
        ))}
    </select>
</div>      
  );
};

export default Dropdown;
