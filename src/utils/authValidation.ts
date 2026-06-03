const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRegex = /^\+?[0-9\s\-()]{9,20}$/;
const nameRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ' -]+$/;

export const validateEmail = (email: string) => {
  const value = email.trim();

  if (!value) {
    return 'Email є обовʼязковим.';
  }

  if (value.startsWith('.') || value.endsWith('.')) {
    return 'Некоректний email.';
  }

  if (value.length > 254) {
    return 'Email занадто довгий.';
  }

  if (value.includes(' ')) {
    return 'Email не може містити пробілів.';
  }

  if (value.includes('..')) {
    return 'Email містить недопустимі символи.';
  }

  if (!emailRegex.test(value)) {
    return 'Введи коректний email.';
  }

  return '';
};

export const validatePassword = (password: string) => {
  if (!password) return 'Пароль є обовʼязковим.';
  if (password.length < 8) return 'Пароль має містити мінімум 8 символів.';
  if (password.length > 128) return 'Пароль не може бути довшим за 128 символів.';
  if (/\s/.test(password)) return 'Пароль не має містити пробілів.';
  if (!/[A-ZА-ЯІЇЄҐ]/.test(password)) return 'Додай хоча б одну велику літеру.';
  if (!/[a-zа-яіїєґ]/.test(password)) return 'Додай хоча б одну малу літеру.';
  if (!/\d/.test(password)) return 'Додай хоча б одну цифру.';
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return 'Додай хоча б один спеціальний символ.';
  }

  return '';
};

export const validateName = (label: string, value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return `${label} є обовʼязковим.`;
  }

  if (trimmed.length < 2 || trimmed.length > 40) {
    return `${label} має містити від 2 до 40 символів.`;
  }

  if (!nameRegex.test(trimmed)) {
    return `${label} може містити лише літери.`;
  }

  return '';
};

export const validatePhone = (phone: string) => {
  const trimmed = phone.trim();

  if (!trimmed) return '';
  if (!phoneRegex.test(trimmed)) return 'Введи коректний номер телефону.';

  return '';
};
