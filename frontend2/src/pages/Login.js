import React, { useState } from 'react';
import useSession from '../Hooks/useSession';
import { useNavigate } from 'react-router-dom';

function initialFormValues() {
  return {
    email: '',
    password: ''
  };
}

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialFormValues);
  const [loginRequestStatus, setLoginRequestStatus] = useState('success');
  const { signIn } = useSession();

  function handleChange(event) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoginRequestStatus('loading');
    try {
      const res = await signIn(values);
      console.log(res);
      if (res.status === 200) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      /**
       * Handle error here:
       * For example, you can set an error message state and display it to the user.
       */
    } finally {
      setLoginRequestStatus('success');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={values.email}
            type="email"
            name="email"
            id="email"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            type="password"
            name="password"
            id="password"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loginRequestStatus === 'loading'}>
          {loginRequestStatus === 'loading' ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Login;
