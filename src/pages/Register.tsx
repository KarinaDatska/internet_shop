import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validateName, validatePassword, validatePhone } from '../utils/authValidation';

interface PageProps {
  onOpenCart: () => void;
}

const Register: React.FC<PageProps> = ({ onOpenCart }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const cleanedForm = {
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim().toLowerCase(),
    };

    const nextErrors = {
      firstName: validateName('Імʼя', cleanedForm.firstName),
      lastName: validateName('Прізвище', cleanedForm.lastName),
      phone: validatePhone(cleanedForm.phone),
      email: validateEmail(cleanedForm.email),
      password: validatePassword(form.password),
    };

    setFieldErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setSubmitting(true);

    try {
      await register({
        ...cleanedForm,
        phone: cleanedForm.phone || undefined,
      });

      navigate('/Profile', { replace: true });
    } catch {
      setError(
        'Не вдалося створити акаунт. Перевір дані або спробуй інший email.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f4]">
      <Header onOpenCart={onOpenCart} />
      <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-lg items-center px-4 py-10">
        <form onSubmit={handleSubmit} autoComplete="off" className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Реєстрація</h1>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">
              Ім'я
              <input
                name="register_first_name"
                autoComplete="given-name"
                value={form.firstName}
                onChange={(event) => handleChange('firstName', event.target.value)}
                required
                maxLength={40}
                className={`mt-2 w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:border-[#4a6d47] ${fieldErrors.firstName ? 'border-red-300' : 'border-gray-200'
                  }`}
              />
              {fieldErrors.firstName && <span className="mt-1 block text-xs text-red-500">{fieldErrors.firstName}</span>}
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Прізвище
              <input
                name="register_last_name"
                autoComplete="family-name"
                value={form.lastName}
                onChange={(event) => handleChange('lastName', event.target.value)}
                required
                maxLength={40}
                className={`mt-2 w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:border-[#4a6d47] ${fieldErrors.lastName ? 'border-red-300' : 'border-gray-200'
                  }`}
              />
              {fieldErrors.lastName && <span className="mt-1 block text-xs text-red-500">{fieldErrors.lastName}</span>}
            </label>
          </div>

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Телефон
            <input
              type="tel"
              inputMode="tel"
              name="register_phone"
              autoComplete="tel"
              maxLength={20}
              value={form.phone}
              onChange={(event) => handleChange('phone', event.target.value)}
              className={`mt-2 w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:border-[#4a6d47] ${fieldErrors.phone ? 'border-red-300' : 'border-gray-200'
                }`}
            />
            {fieldErrors.phone && <span className="mt-1 block text-xs text-red-500">{fieldErrors.phone}</span>}
          </label>

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              name="register_email_manual"
              autoComplete="email"
              spellCheck={false}
              maxLength={254}
              value={form.email}
              onChange={(event) =>
                handleChange('email', event.target.value.toLowerCase())
              }
              required
              className={`mt-2 w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:border-[#4a6d47] ${fieldErrors.email ? 'border-red-300' : 'border-gray-200'
                }`}
            />
            {fieldErrors.email && <span className="mt-1 block text-xs text-red-500">{fieldErrors.email}</span>}
          </label>

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Пароль
            <input
              type="password"
              name="register_password_manual"
              autoComplete="new-password"
              value={form.password}
              onChange={(event) => handleChange('password', event.target.value)}
              required
              minLength={8}
              maxLength={128}
              className={`mt-2 w-full rounded-xl border bg-gray-50 px-4 py-3 outline-none transition focus:border-[#4a6d47] ${fieldErrors.password ? 'border-red-300' : 'border-gray-200'
                }`}
            />
            {fieldErrors.password && <span className="mt-1 block text-xs text-red-500">{fieldErrors.password}</span>}
          </label>

          {error && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
          >
            {submitting ? 'Створюємо...' : 'Створити акаунт'}
          </button>

          <p className="mt-5 text-center text-sm text-gray-500">
            Вже є акаунт?{' '}
            <Link to="/Login" className="font-semibold text-[#4a6d47] hover:underline">
              Увійти
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Register;
