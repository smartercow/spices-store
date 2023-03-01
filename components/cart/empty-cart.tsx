import cn from 'clsx';
import { useRouter } from 'next/navigation';

type CartEmptyProps = {
  element: 'main' | 'sidebar';
  drawerToggleRef?: React.RefObject<HTMLInputElement>;
};

export default function CartEmpty({
  element,
  drawerToggleRef
}: CartEmptyProps): JSX.Element {
  const router = useRouter();
  const el = element ?? 'main';

  const handleRef = () => {
    if (drawerToggleRef?.current) {
      drawerToggleRef.current.checked = false;
    }
    router.push('/produkter');
  };

  return (
    <div className='flex w-full justify-center pt-10'>
      <div
        className={cn(
          'flex flex-col items-center gap-4',
          el ? 'max-w-md' : 'max-w-xs'
        )}
      >
        <img
          src='/assets/images/empty-cart.webp'
          alt='Kurven er tom!'
          className='w-full'
        />
        <p className='text-center text-xl font-medium'>
          Indkøbskurven venter på at blive fyldt.
        </p>
        <div>
          <button className='btn-error btn-lg btn' onClick={handleRef}>
            Foræt med at shoppe
          </button>
        </div>
      </div>
    </div>
  );
}
