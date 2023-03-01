import { useEffect } from 'react';
import { CartState } from '@lib/state/cart';
import { useRecoilState } from 'recoil';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PRODUCTS_CDN_URL } from '@lib/supabase/utils-supabase';

const LOCAL_STORAGE_CARTLIST = 'cartList';

type CartSidebarProps = {
  cartList: CartState['cartList'];
  drawerToggleRef?: React.RefObject<HTMLInputElement>;
};
export default function CartSidebar({
  cartList,
  drawerToggleRef
}: CartSidebarProps): JSX.Element {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(CartState);
  const cartCount = cart.cartList?.length ?? 0;

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CARTLIST, JSON.stringify(cartList));
  }, [cartList]);

  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const removeItem = (cartItemId: number) => {
    setCart({
      cartList: cartList.filter((item) => item.cartItemId !== cartItemId)
    });

    localStorage.setItem(
      LOCAL_STORAGE_CARTLIST,
      JSON.stringify(cartList.filter((item) => item.cartItemId !== cartItemId))
    );
  };

  const handleRef = (path: string) => {
    if (drawerToggleRef?.current) {
      drawerToggleRef.current.checked = false;
    }
    router.push(path);
  };

  return (
    <div className='space-y-8'>
      <div>
        <h3 className='text-xl font-semibold'>
          Din indkøbskurv ({cartCount}{' '}
          {cartCount === 0 || cartCount === 1 ? 'vare' : 'varer'})
        </h3>
      </div>
      <div className='space-y-4'>
        {cartList.map((item) => (
          <div
            key={item.cartItemId}
            className='flex items-center justify-between gap-1'
          >
            <div
              className='main-transition cursor-pointer'
              onClick={() =>
                handleRef(
                  `produkter/${item.product.category.path}/${String(
                    item.product.id
                  )}/${String(item.product.name).replace(/ /g, '-')}}`
                )
              }
            >
              <div className='h-14 min-w-[3.5rem] overflow-hidden rounded-md'>
                <img
                  alt={item.product.name}
                  src={
                    `${PRODUCTS_CDN_URL}/${item.product.preview}` ||
                    '/assets/images/placeholder.svg'
                  }
                  className='main-transition h-full w-full object-cover hover:scale-105'
                />
              </div>
            </div>
            <div className='w-full text-center'>
              <div
                className='main-transition cursor-pointer font-semibold underline-offset-4 hover:underline'
                onClick={() =>
                  handleRef(
                    `produkter/${item.product.category.path}/${String(
                      item.product.id
                    )}/${String(item.product.name).replace(/ /g, '-')}}`
                  )
                }
              >
                {item.product.name}
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <input
                type='number'
                // max={item.product.stock}
                max={10}
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  setCart({
                    cartList: cartList.map((cartItem) => {
                      if (cartItem.cartItemId === item.cartItemId) {
                        return {
                          ...cartItem,
                          quantity: parseInt(e.target.value)
                        };
                      } else {
                        return cartItem;
                      }
                    })
                  })
                }
                className='input-lg input w-24 py-2 text-center'
              />
              <span
                className='tooltip-bottom tooltip-error tooltip'
                data-tooltip='Fjerne vare'
              >
                <button
                  className='btn-ghost btn'
                  onClick={() => removeItem(item.cartItemId)}
                >
                  <i className='fa-solid fa-x'></i>
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className='space-y-4'>
        <h4 className='text-lg font-bold'>Pris i alt</h4>
        <div className='space-y-2 text-sm'>
          <div className='flex items-center justify-between gap-2'>
            <p>Subtotal (inkl. moms)</p>
            <p>{totalPrice} kr</p>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <p>Levering</p>
            <p>{totalPrice > 299 ? '0 kr' : '30 kr'}</p>
          </div>
        </div>
        <div
          className='main-transition flex cursor-not-allowed items-center justify-between gap-2 rounded-md bg-slate-200 
                     p-4 hover:bg-slate-400'
        >
          <p className='text-sm font-medium'>Tilføj rabatkode (valgfrit)</p>
          <i className='fa-sharp fa-solid fa-chevron-down'></i>
        </div>
      </div>
    </div>
  );
}
