import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { orderApi } from '../../api/orders';

interface CartSummaryProps {
  onCheckoutSuccess?: (message: string) => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  onCheckoutSuccess,
}) => {
  const { cart, loadCart } = useCart();
  const { user } = useAuth();

  const [checkout, setCheckout] = useState({
    customerName: '',
    phone: '',
    deliveryAddress: '',
    comment: '',
  });

  const [errors, setErrors] = useState({
    customerName: '',
    phone: '',
    deliveryAddress: '',
  });

  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    field: keyof typeof checkout,
    value: string
  ) => {
    setCheckout((current) => ({
      ...current,
      [field]: value,
    }));

    if (
      field === 'customerName' ||
      field === 'phone' ||
      field === 'deliveryAddress'
    ) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {
      customerName: '',
      phone: '',
      deliveryAddress: '',
    };

    let isValid = true;

    if (!checkout.customerName.trim()) {
      newErrors.customerName = "Введіть ім'я отримувача";
      isValid = false;
    } else if (checkout.customerName.trim().length < 2) {
      newErrors.customerName =
        "Ім'я повинно містити мінімум 2 символи";
      isValid = false;
    }

    const phoneRegex =
      /^(\+380|380|0)\d{9}$/;

    const cleanedPhone =
      checkout.phone.replace(/\s/g, '');

    if (!cleanedPhone) {
      newErrors.phone = 'Введіть номер телефону';
      isValid = false;
    } else if (!phoneRegex.test(cleanedPhone)) {
      newErrors.phone =
        'Введіть коректний номер телефону';
      isValid = false;
    }

    if (!checkout.deliveryAddress.trim()) {
      newErrors.deliveryAddress =
        'Введіть адресу доставки';
      isValid = false;
    } else if (
      checkout.deliveryAddress.trim().length < 5
    ) {
      newErrors.deliveryAddress =
        'Адреса занадто коротка';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleCheckout = async () => {
    if (!user) {
      setMessage(
        'Увійди в акаунт, щоб оформити замовлення.'
      );
      return;
    }

    if (!validate()) {
      return;
    }

    setSubmitting(true);
    setMessage('');

    try {
      await orderApi.createFromCart({
        userId: user.id,
        customerName:
          checkout.customerName.trim(),
        phone: checkout.phone.trim(),
        deliveryAddress:
          checkout.deliveryAddress.trim(),
        comment:
          checkout.comment.trim() || undefined,
      });

      const successMessage =
        'Замовлення створено. Ми звʼяжемося з тобою для підтвердження.';

      onCheckoutSuccess?.(successMessage);

      await loadCart();

      setCheckout({
        customerName: '',
        phone: '',
        deliveryAddress: '',
        comment: '',
      });

      setMessage(successMessage);
    } catch {
      setMessage(
        'Не вдалося оформити замовлення. Спробуй ще раз.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-white border-t border-gray-200 space-y-4 sm:space-y-6">

      <div className="space-y-3">

        <div>
          <input
            value={checkout.customerName}
            onChange={(e) =>
              handleChange(
                'customerName',
                e.target.value
              )
            }
            placeholder="Ім'я отримувача"
            className={`w-full rounded-xl px-3 sm:px-4 py-3 text-sm outline-none ${
              errors.customerName
                ? 'border border-red-500 bg-red-50'
                : 'border border-gray-200 bg-gray-50 focus:border-[#4a6d47]'
            }`}
          />

          {errors.customerName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.customerName}
            </p>
          )}
        </div>

        <div>
          <input
            type="tel"
            maxLength={13}
            value={checkout.phone}
            onChange={(e) =>
              handleChange(
                'phone',
                e.target.value.replace(
                  /[^\d+]/g,
                  ''
                )
              )
            }
            placeholder="+380XXXXXXXXX"
            className={`w-full rounded-xl px-3 sm:px-4 py-3 text-sm outline-none ${
              errors.phone
                ? 'border border-red-500 bg-red-50'
                : 'border border-gray-200 bg-gray-50 focus:border-[#4a6d47]'
            }`}
          />

          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <input
            value={checkout.deliveryAddress}
            onChange={(e) =>
              handleChange(
                'deliveryAddress',
                e.target.value
              )
            }
            placeholder="Місто, відділення або адреса"
            className={`w-full rounded-xl px-3 sm:px-4 py-3 text-sm outline-none ${
              errors.deliveryAddress
                ? 'border border-red-500 bg-red-50'
                : 'border border-gray-200 bg-gray-50 focus:border-[#4a6d47]'
            }`}
          />

          {errors.deliveryAddress && (
            <p className="text-red-500 text-xs mt-1">
              {errors.deliveryAddress}
            </p>
          )}
        </div>

        <textarea
          value={checkout.comment}
          onChange={(e) =>
            handleChange(
              'comment',
              e.target.value
            )
          }
          placeholder="Коментар до замовлення"
          rows={3}
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-3 text-sm outline-none focus:border-[#4a6d47]"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-gray-400 text-base sm:text-lg">
          Ітого
        </span>

        <span className="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
          {cart.totalCartPrice} ₴
        </span>
      </div>

      {message && (
        <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600 wrap-break-word">
          {message}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={submitting}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-2xl shadow-lg transition-all text-center text-sm sm:text-base"
      >
        {submitting
          ? 'Оформлюємо...'
          : 'Оформити замовлення →'}
      </button>
    </div>
  );
};