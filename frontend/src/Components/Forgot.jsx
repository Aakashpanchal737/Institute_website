import React from 'react'

export default function Forgot(props) {
    console.log("Props in forgot password",props);

    const submitResponse = async () =>{
        props.fun(5,7);
    }
  return (
    <div>
        Forgot password for the{props.role}
        <button onClick={submitResponse}>Add</button>
    </div>
  );
}
