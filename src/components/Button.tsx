import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'link';

type ButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'className' | 'style'
> & {
  variant: ButtonVariant;
};

export const Button = ({ variant, ...props }: ButtonProps) => {
  return <button className={getVariantClasses(variant)} {...props} />;
};

const getVariantClasses = (variant: ButtonProps['variant']) => {
  const baseClasses =
    'cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200';
  const baseButtonClasses = `min-w-50 rounded-md px-4 py-2 ${baseClasses}`;

  switch (variant) {
    case 'primary':
      return `${baseButtonClasses} bg-orange-500 border-gray-500 border text-white hover:bg-orange-600`;
    case 'secondary':
      return `${baseButtonClasses} bg-white border-orange-500 border text-black hover:bg-orange-50`;
    case 'link':
      return `${baseClasses} text-orange-500 hover:text-orange-600`;
  }
};
