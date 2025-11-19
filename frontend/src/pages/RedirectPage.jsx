import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import config from '../../config';

function RedirectPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const hasRedirected = useRef(false);

  useEffect(() => {
    const storageKey = `redirecting_${code}`;
    const alreadyRedirecting = sessionStorage.getItem(storageKey);

    if (alreadyRedirecting) {
      return;
    }

    if (hasRedirected.current) return;
    hasRedirected.current = true;

    const redirect = async () => {
      try {
        sessionStorage.setItem(storageKey, 'true');

        const API_BASE_URL = config.SERVER_API_URL;
        window.location.href = `${API_BASE_URL}/${code}`;
      } catch (err) {
        console.error('Redirect error:', err);
        sessionStorage.removeItem(storageKey);
        setError(`An error occurred: ${err.message || 'Unknown error'}`);
        setTimeout(() => navigate('/'), 2000);
      }
    };

    redirect();
  }, [code, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">{error}</h2>
          <p className="mt-2 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">Redirecting...</h2>
        <p className="mt-2 text-gray-600">Please wait</p>
      </div>
    </div>
  );
}

export default RedirectPage;
