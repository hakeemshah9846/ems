import { useRef, useState } from 'react';
import './Login.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Popup from '../Popup/Popup';

function Login() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [spinner, setSpinner] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState("");
  const [validationErrors, setValidationErrors] = useState("");
  let content;

  const handleLogin = () => {
    setSpinner(true);
    console.log("email : ", emailRef.current.value);
    console.log("password : ", passwordRef.current.value);

    axios.post('http://localhost:3500/login',{
      email : emailRef.current.value,
      password : passwordRef.current.value,
    })
    .then((response) => {
      console.log("Login success");
      console.log("response : ", response);
      setSpinner(false);
      // alert(response.data.message);
      localStorage.setItem("token",response.data.data);
      setPopupData(response.data);
      setPopup(true)
    })
    .catch((error) => {
      setSpinner(false);
      console.log("Login Failed");
      console.log("error : ", error);
      // alert(error.response.data.message);

      if(error.response.data.errors) {
        console.log("validation errors : ", error.response.data.errors);
        setValidationErrors(error.response.data.errors);
        return;
      }

      setPopupData(error.response.data);
      setPopup(true);
    })
  }

  const handleOkClick = () => {
    setPopup(false);
  }

  if(spinner) {
    content = <Spinner />

  }else {
    content = <div className="container form-container">
    <h1 className='text-primary mb-5' >Login</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name='email'
            ref={emailRef}
          />
          <div style={{color : "red"}}>{validationErrors.email ? validationErrors.email : ""}</div>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name='password'
            ref={passwordRef}
          />
          <div style={{color : "red"}} >{validationErrors.password ? validationErrors.password : ""}</div>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Submit
        </button>
      </form>
      </div>
  }


  return (
    <>
    {popup ? <Popup success={popupData.success} message={popupData.message} handleOkClick={handleOkClick} /> : <></>}
    {content}
    </>
  );
}

export default Login;
