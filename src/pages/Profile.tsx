import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { orderApi } from '../api/orders';
import type { OrderDto } from '../types/order';

interface PageProps {
  onOpenCart: () => void;
}

const Profile: React.FC<PageProps> = ({ onOpenCart }) => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/Login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    let isMounted = true;
    if (isAdmin) {
      setOrdersLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        const data = isAdmin ? await orderApi.getAllOrders() : await orderApi.getMyOrders();
        if (isMounted) {
          setOrders(data);
        }
      } catch {
        if (isMounted) {
          setOrders([]);
        }
      } finally {
        if (isMounted) {
          setOrdersLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [isAdmin]);


  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate('/Login', { replace: true });
    }
  };
  return (
    <div className="min-h-screen bg-[#f6f6f4]">
      <Header onOpenCart={onOpenCart} />
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Профіль</h1>
              <p className="mt-1 text-sm text-gray-500">
                {user?.firstName || user?.lastName ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() : user?.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-red-200 hover:text-red-500"
            >
              Вийти
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-400">Email</div>
              <div className="mt-1 font-semibold text-gray-900">{user?.email}</div>
            </div>
            {!isAdmin && (
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="text-xs uppercase tracking-wide text-gray-400">Телефон</div>
                <div className="mt-1 font-semibold text-gray-900">
                  {user?.phone || 'Не вказано'}
                </div>
              </div>
            )}
            <div className="rounded-xl bg-gray-50 p-4">
              <div className="text-xs uppercase tracking-wide text-gray-400">Роль</div>
              <div className="mt-1 font-semibold text-gray-900">{isAdmin ? 'Адмін' : 'Клієнт'}</div>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={() => navigate('/Admin/Products')}
              className="mt-8 rounded-xl bg-[#4a6d47] px-5 py-3 font-semibold text-white transition hover:bg-[#3d5a3a]"
            >
              Редагувати товари
            </button>
          )}
        </div>
        {!isAdmin && (
          <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{isAdmin ? 'Усі замовлення' : 'Мої замовлення'}</h2>
                <p className="text-sm text-gray-500">Історія оформлених замовлень із кошика.</p>
              </div>
            </div>

            {ordersLoading ? (
              <div className="py-8 text-center text-sm text-gray-400">Завантаження...</div>
            ) : orders.length === 0 ? (
              <div className="mt-5 rounded-xl bg-gray-50 p-5 text-sm text-gray-500">Замовлень поки немає.</div>
            ) : (
              <div className="mt-5 space-y-3">
                {orders.map((order) => (
                  <article key={order.id} className="rounded-xl border border-gray-100 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">Замовлення #{order.id}</div>
                        <div className="mt-1 text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleString('uk-UA')} · {order.status}
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          {order.customerName} · {order.phone || 'телефон не вказано'}
                        </div>
                        {order.deliveryAddress && <div className="mt-1 text-sm text-gray-500">{order.deliveryAddress}</div>}
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {order.totalPrice.toLocaleString('uk-UA')} ₴
                      </div>
                    </div>

                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      {order.items.map((item) => (
                        <div key={`${order.id}-${item.productId}`} className="flex justify-between gap-3">
                          <span>{item.productName} × {item.quantity}</span>
                          <span className="shrink-0">
                            {item.totalPrice.toLocaleString('uk-UA')} ₴
                          </span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Profile;
