export const checkValidData=(email,password)=>{

    //  const isNameValid= /^[A-Za-z]+([\ A-Za-z]+)*/.test(name);
     const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

     const isPasswordValid=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);


    //  if(!isNameValid) return "Name is not Valid";
     if(!isEmailValid) return "Email Id is not Valid";
     if(!isPasswordValid) return " password is not Valid";
     

   return null;
};


//  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/