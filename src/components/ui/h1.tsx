import clsx from 'clsx';
import { ReactNode } from 'react';

export function TypographyH1({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={clsx(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        {
          [String(className)]: className
        }
      )}>
      {children}
    </h1>
  );
}
