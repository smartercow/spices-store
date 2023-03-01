import { forwardRef } from 'react';
import cn from 'clsx';
import type { ChangeEvent } from 'react';

export type InputProps = {
  name: string;
  type?: string;
  value?: string;
  label?: string;
  hidden?: boolean;
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
      hidden,
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
      <div className={cn('flex flex-col gap-1', hidden && 'hidden')}>
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
          id={name}
          ref={ref}
          name={name}
          value={value && value}
          type={type ? type : 'text'}
          checked={type === 'checkbox' ? value === 'true' : false}
          required={required ? required : true}
          onChange={handleChange}
          readOnly={readonly ? readonly : false}
          className={cn(
            isPreview
              ? 'border-none bg-transparent px-0 pl-1 outline-none'
              : 'input-lg input mt-1 block w-full max-w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm',
            className
          )}
          placeholder={placeholder}
        />
      </div>
    );
  }
);
