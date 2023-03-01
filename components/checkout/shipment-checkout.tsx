import React from 'react';

type CheckoutShipmentProps = {
  standard: boolean;
  setStandard: React.Dispatch<React.SetStateAction<boolean>>;
  express: boolean;
  setExpress: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CheckoutShipment({
  standard,
  setStandard,
  express,
  setExpress
}: CheckoutShipmentProps) {
  return (
    <div className='checkout-sidebar-box'>
      <h4 className='h4ding'>Forsendelse</h4>
      <div className='space-y-6'>
        <div className='flex gap-4'>
          <div className='pt-2'>
            <input
              type='radio'
              className='radio-error radio-lg radio'
              checked={standard}
              onChange={() => {
                setStandard(!standard);
                setExpress(!express);
              }}
            />
          </div>
          <div>
            <h5 className='h5ding'>fr, 03.3 - ma, 06.03</h5>
            <p className='text-sm font-normal text-gray-900'>
              Standard levering
            </p>
            <h6 className='h6ding'>Gratis</h6>
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='pt-2'>
            <input
              type='radio'
              className='radio-error radio-lg radio'
              checked={express}
              onChange={() => {
                setExpress(!express);
                setStandard(!standard);
              }}
            />
          </div>
          <div>
            <h5 className='h5ding'>I morgen</h5>
            <p className='text-sm font-normal text-gray-900'>
              Express levering
            </p>
            <h6 className='h6ding'>85,00 kr</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
