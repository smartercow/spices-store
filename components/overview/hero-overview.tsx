type OverviewHeroProps = {
  categoryId: number;
};
export default function OverviewHero({
  categoryId
}: OverviewHeroProps): JSX.Element {
  const isSpices = categoryId === 1;
  return (
    <div className='flex max-h-[420px]'>
      <div className='grid w-full place-items-center'>
        <div className='h-auto w-full space-y-8 pr-5 md:pr-6 lg:space-y-10 xl:pr-8'>
          <h1 className='text-3xl font-bold lg:text-4xl xl:text-5xl'>
            {isSpices ? 'Krydderier' : 'Økologi'}
          </h1>
          <p className='text-sm font-medium text-gray-900 lg:text-base'>
            {isSpices ? 'Krydderier' : 'Økologi krydderier'} fra det meste af
            verden er vores speciale, med garanti for at kvaliteten er i
            højsæde.
          </p>
        </div>
      </div>
      <div className='w-full'>
        <img
          src={
            isSpices
              ? '/assets/images/krydderi.webp'
              : '/assets/images/oekologi.webp'
          }
          alt={isSpices ? 'Krydderier' : 'Økologi'}
          className='h-full w-full object-cover mix-blend-darken'
        />
      </div>
    </div>
  );
}
