import React from 'react';
import {useHistory} from 'react-router-dom';
import * as authorization from '../../auth/auth'

const AUTH_TOKEN = 'auth_token';


const LoginForm = (props) => {

    const history = useHistory();

    const login = (e) => {
        e.preventDefault();

        const auth = {
            "username" :e.target.email.value,
            "password" :e.target.password.value
        };

        props.login(auth, (response)=>{

            console.log(response.data)

            localStorage.setItem(AUTH_TOKEN, response.data);
            localStorage.setItem("EMAIL", auth.username);

            authorization.login(response.data, auth.username);

            history.push("/");
        });
    };

    return (
    <form onSubmit={login}>
      <div>
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          type="text"
          // fa="fa fa-at"
          // validate={[required, email]}
          // component={RenderField}
        />
      </div>
      <div>
        <input
          className="form-control"
          placeholder="Password"
          name="password"
          type="password"
          // fa="fa fa-key"
          // validate={[required]}
          // component={RenderField}
        />
      </div>
      <div className="text-left">
        <input name="remember"
    // component={CheckBoxField}
            type="checkbox"
    // checkboxClass="icheckbox_square-green"
    // increaseArea="20%"
    // cursor="pointer"
    // label="<span className='checkbox-label'> Remember Me </span>"
    />
          <span className='checkbox-label'>Remember Me </span>
      </div>
        <br/>
      <button type="submit"
              id="btnLogin"
              value={"Login"}
              className="btn btn-primary block full-width m-b">
        {/*// disabled={pristine || submitting || invalid}>*/}
        {/*//         Login*/}
          Login</button>
    </form>
  );
};

export default LoginForm
