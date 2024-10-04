import React from 'react'

function SignIn() {

  const ADMIN_SIGNUP_CODE = process.env.ADMIN_SIGNUP_CODE;
  console.log("admin code",ADMIN_SIGNUP_CODE);
  

  return (
    <div>
     {ADMIN_SIGNUP_CODE}
    </div>
  )
}

export default SignIn
