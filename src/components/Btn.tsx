import { forwardRef } from "react";

export type ButtonProps = {
  label?: React.ReactNode;
  isBgColor?: boolean;
  className?: string;
} & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { label, className, isBgColor, ...props }: ButtonProps,
    ref
  ): JSX.Element => {
    const baseClasses = `px-6 py-[6px] text-sm font-medium rounded-md focus:outline-none disabled:cursor-not-allowed ${className}`;

    if (isBgColor) {
      return (
        <button
          ref={ref}
          className={`${baseClasses} text-white bg-violet-600 border border-violet-600 active:text-violet-500 hover:bg-transparent hover:text-violet-600`}
          {...props}
        >
          {label}
        </button>
      );
    }
    return (
      <button
        ref={ref}
        className={`${baseClasses} text-violet-600 bg-white border border-violet-600 active:text-white hover:bg-violet-600 hover:text-white`}
        {...props}
      >
        {label}
      </button>
    );
  }
);
