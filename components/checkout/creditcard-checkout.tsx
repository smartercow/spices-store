import { useState } from 'react';
import { Input } from '@components/ui/input';
import {
  checkoutCardInputs,
  initialCheckoutCardInputsValues
} from '@lib/local/checkout-inputs';
import cn from 'clsx';

type CheckoutCreditCardProps = {
  isPreview?: boolean;
};

export default function CheckoutCreditCard({
  isPreview
}: CheckoutCreditCardProps): JSX.Element {
  const [checkoutSignUpForm, setCheckoutSignUpForm] = useState(
    initialCheckoutCardInputsValues
  );

  const { card_number, card_holder, card_expiry, card_cvc } =
    checkoutSignUpForm;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div className={cn('checkout-box', isPreview ? 'h-fit' : 'h-full')}>
      <h4 className='h4ding'>Betalingsmetode</h4>
      <div>Visa</div>
      <div className='checkout-box-grid'>
        {checkoutCardInputs.slice(0, 4).map((input) => (
          <Input
            key={input.name}
            {...input}
            readonly
            noColon
            isPreview={isPreview}
            value={
              input.name === 'card_number'
                ? card_number
                : input.name === 'card_holder'
                ? card_holder
                : input.name === 'card_expiry'
                ? card_expiry
                : input.name === 'card_cvc'
                ? card_cvc
                : ''
            }
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
}
