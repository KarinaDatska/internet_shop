import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/authValidation';

interface PageProps {
  onOpenCart: () => void;
}

const AdminLogin: React.FC<PageProps> = ({ onOpenCart }) => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/Admin/Products';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const nextErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setFieldErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setSubmitting(true);

    try {
      await adminLogin({ email: email.trim(), password });
      navigate(from, { replace: true });
    } catch {
      setError('Невірні адмінські дані або користувач не має ролі адміністратора.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f4]">
      <Header onOpenCart={onOpenCart} />
      <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-md items-center px-4 py-10">
        <form onSubmit={handleSubmit} autoComplete="off" className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h1 className="text-center text-2xl font-bold text-gray-900">Вхід адміністратора</h1>
          <label className="mt-6 block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              autoComplete="off"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setFieldErrors((current) => ({ ...current, email: '' }));
              }}
              required
              className={`mt-2 w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:border-[#4a6d47] ${
                fieldErrors.email ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {fieldErrors.email && <span className="mt-1 block text-xs text-red-500">{fieldErrors.email}</span>}
          </label>

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Пароль
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setFieldErrors((current) => ({ ...current, password: '' }));
              }}
              required
              className={`mt-2 w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:border-[#4a6d47] ${
                fieldErrors.password ? 'border-red-300' : 'border-gray-200'
              }`}
            />
            {fieldErrors.password && <span className="mt-1 block text-xs text-red-500">{fieldErrors.password}</span>}
          </label>

          {error && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-xl bg-[#4a6d47] px-5 py-3 font-semibold text-white transition hover:bg-[#3d5a3a] disabled:opacity-60"
          >
            {submitting ? 'Перевіряємо...' : 'Увійти як адмін'}
          </button>

          <p className="mt-5 text-center text-sm text-gray-500">
            Потрібен клієнтський вхід?{' '}
            <Link to="/Login" className="font-semibold text-[#4a6d47] hover:underline">
              Увійти як клієнт
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default AdminLogin;
