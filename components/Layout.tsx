import React from "react";

export function Container({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Section({ children, className = "", ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`py-16 md:py-24 ${className}`} {...props}>
      {children}
    </section>
  );
}
