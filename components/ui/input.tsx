import { forwardRef } from 'react';
import cn from 'clsx';
import type { ChangeEvent } from 'react';

export type InputProps = {
  name: string;
  type?: string;
  value?: string;
  label?: string;
  noLabel?: boolean;
  noColon?: boolean;
  readonly?: boolean;
  required?: boolean;
  className?: string;
  isPreview?: boolean;
  placeholder?: string;
  labelClassName?: string;
  handleChange?: ({ target: { value } }: ChangeEvent<HTMLInputElement>) => void;
};

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      type,
      value,
      label,
      noLabel,
      noColon,
      readonly,
      required,
      className,
      isPreview,
      placeholder,
      labelClassName,
      handleChange
    },
    ref
  ): JSX.Element => {
    return (
      <div className='flex flex-col gap-1'>
        {!noLabel && (
          <label
            htmlFor={name}
            className={cn('form-label font-semibold', labelClassName)}
          >
            {label}
            {!noColon && ':'}
          </label>
        )}

        <input
          name={name}
          id={name}
          className={cn(
            isPreview
              ? 'border-none bg-transparent px-0 outline-none'
              : 'input-lg input max-w-full border-black/40 placeholder-gray-900',
            className
          )}
          value={value && value}
          type={type ? type : 'text'}
          checked={type === 'checkbox' ? value === 'true' : false}
          placeholder={placeholder}
          required={required ? required : true}
          onChange={handleChange}
          readOnly={readonly ? readonly : false}
          ref={ref}
        />
      </div>
    );
  }
);
