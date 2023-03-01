import React from 'react';

export default function MobilPage(): JSX.Element {
  return (
    <main className='grid h-screen w-screen place-content-center'>
      <div className='max-w-xs space-y-6 text-center'>
        <div className='flex justify-center'>
          <div className='relative flex w-fit select-none items-center pl-3 lg:pl-0'>
            <i className='text circularstd sec-transition text-3xl font-[900] not-italic'>
              spi
            </i>
            <i className='fa-duotone fa-spa px-0.5 text-2xl text-error'></i>
            <i className='text circularstd sec-transition text-3xl font-extrabold not-italic'>
              es
            </i>
          </div>
        </div>
        <h1 className='text-xl font-bold'>er kke lavet til mobil!</h1>
        <p className='text-4xl'>😔</p>
      </div>
    </main>
  );
}
