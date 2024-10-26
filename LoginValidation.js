function validation(values){
    let error={}
    const phone_no_pattern=/^[0-9]{10,}$/
    const email_id_pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (values.email_id === "") {
        error.email_id = "Email_id should not be empty";
      } else if (!email_id_pattern.test(values.email_id)) {
        error.email_id = "Email_id didn't match";
      } else {
        error.email_id = "";
      }
    if(values.farmers_id==="")
    {
        error.farmers_id="Farmers_id should not be empty"
    }
    else{
        error.farmers_id=""
    }
    if(values.phone_no==="")
    {
        error.phone_no="Phone_no should not be empty"
    }
    else if(!phone_no_pattern.test(values.phone_no)){
        error.phone_no="Phone_no didn't match"
    }
    else{
        error.phone_no=""
    }
    return error;
}
export default validation
