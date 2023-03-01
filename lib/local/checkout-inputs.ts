export type UserSignupInfo = {
  email: string;
  full_name: string;
  password: string;
  confirm_password: string;
  street: string;
  zip_code: string;
  city: string;
  mobile_number: string;
};

export type UserData = Pick<
  UserSignupInfo,
  'full_name' | 'street' | 'zip_code' | 'city' | 'mobile_number'
>;

export const checkoutInputs = [
  {
    name: 'full_name',
    label: 'Fuld navn',
    type: 'text',
    placeholder: 'Fuld navn'
  },
  {
    name: 'street',
    label: 'Adresse',
    type: 'text',
    placeholder: 'Adresse'
  },
  {
    name: 'zip_code',
    label: 'Postnummer',
    type: 'text',
    placeholder: 'Postnummer'
  },
  {
    name: 'city',
    label: 'By',
    type: 'text',
    placeholder: 'By'
  },
  {
    name: 'mobile_number',
    label: 'Mobilnummer (valgfrit)',
    type: 'text',
    placeholder: 'Mobilnummer'
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Indtast din email'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Indtast password'
  },
  {
    name: 'confirm_password',
    label: 'Bekræft Password',
    type: 'password',
    placeholder: 'Bekræft password'
  }
];

export const initialCheckoutInputsValues = {
  full_name: '',
  street: '',
  zip_code: '',
  city: '',
  mobile_number: '',
  email: '',
  password: '',
  confirm_password: ''
};

export const initialCheckoutUserData: UserData = {
  full_name: '',
  street: '',
  zip_code: '',
  city: '',
  mobile_number: ''
};

export const checkoutCardInputs = [
  {
    name: 'card_number',
    label: 'Kortnummer',
    type: 'text',
    placeholder: 'Kortnummer'
  },
  {
    name: 'card_holder',
    label: 'Navnet på kort',
    type: 'text',
    placeholder: 'Navnet på kort'
  },
  {
    name: 'card_expiry',
    label: 'Udløbsdato',
    type: 'text',
    placeholder: 'Udløbsdato'
  },
  {
    name: 'card_cvc',
    label: 'CVC',
    type: 'text',
    placeholder: 'CVC'
  }
];

export const initialCheckoutCardInputsValues = {
  card_number: '4242 4242 4242 4242',
  card_holder: 'John Doe',
  card_expiry: '12/24',
  card_cvc: '123'
};
