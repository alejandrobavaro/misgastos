import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './SesionAuthContext';
import LoadingSpinner from './SesionLoadingSpinner';
import '../assets/scss/_03-Componentes/_SesionLoginRegister.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: 'LOGIN', payload: { email } });
      setLoading(false);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="auth-container">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="auth-content">
          <img className='auth-image top-image' src="/img/05-img-costados-larga/2.png" alt="" />
          <form onSubmit={handleLogin} className="auth-form">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <img className='auth-image bottom-image' src="/img/05-img-costados-larga/20.png" alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
