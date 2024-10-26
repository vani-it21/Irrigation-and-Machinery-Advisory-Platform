import { PatternFormat } from 'react-number-format';

<PatternFormat format="(%%%%%%%%%%)" patternChar="%" value={1234567890} />;

function validation(values) {
  let error = {};
  const phone_no_pattern = /^(?=.*[0-9]).{10,}$/;
  const aadhar_no_pattern = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/; // Corrected to a RegExp object
  const email_id_pattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

  if (values.username === "") {
    error.username = "Username should not be empty";
  } else {
    error.username = "";
  }

  if (values.phone_no === "") {
    error.phone_no = "Phone_no should not be empty";
  } else if (!phone_no_pattern.test(values.phone_no)) {
    error.phone_no = "Phone_no didn't match";
  } else {
    error.phone_no = "";
  }

  if (values.aadhar_no === "") {
    error.aadhar_no = "Aadhar_no should not be empty";
  } else if (!aadhar_no_pattern.test(values.aadhar_no)) { // Corrected to use .test()
    error.aadhar_no = "Aadhar_no didn't match";
  } else {
    error.aadhar_no = "";
  }

  if (values.email_id === "") {
    error.email_id = "Email_id should not be empty";
  } else if (!email_id_pattern.test(values.email_id)) {
    error.email_id = "Email_id didn't match";
  } else {
    error.email_id = "";
  }
  if (values.farmers_id=== "") {
    error.farmers_id = "Farmers_id should not be empty";
  } else {
    error.farmers_id = "";
  }


  return error;
}

export default validation;
