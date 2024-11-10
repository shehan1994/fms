import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth); // Get loading state from auth
  const { showToast } = useStateContext();

  const backgroundStyle = {
    backgroundImage: "url('/wall01.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    position: 'absolute', 
    top: 0,
    left: 0,
    zIndex: -1, 
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    dispatch(loginRequest());
    axiosClient
      .post('/login', { email, password })
      .then(({ data }) => {
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        showToast('Login successful');
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          dispatch(loginFailure(finalErrors.join('<br>')));
        }
      });
  };

  return (
    <>
      <div>
        <div style={backgroundStyle}></div>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
          <h1 className="text-center text-5xl font-bold text-blue-900 mt-10">
            FMMS
          </h1>
        </div>
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-md mx-auto mt-40 z-20 relative">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              signup for free
            </Link>
          </p>

          {error && (
            <div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={{ __html: error }} />
          )}

          {loading && <div className="text-center text-gray-600">Loading...</div>} {/* Display loading message */}

          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="relative block w-full rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900"
                  placeholder="Email address"
                  disabled={loading} // Disable input while loading
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="relative block w-full rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900"
                  placeholder="Password"
                  disabled={loading} // Disable input while loading
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  disabled={loading} // Disable checkbox while loading
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700"
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}
