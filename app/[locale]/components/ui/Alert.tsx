// app/[locale]/components/ui/Alert.tsx
import React from 'react';

interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
  className?: string;
}

export function Alert({ 
  variant = 'default', 
  children, 
  className = '' 
}: AlertProps) {
  const variantStyles = {
    default: 'bg-blue-50 text-blue-800 border border-blue-200',
    destructive: 'bg-red-50 text-red-800 border border-red-200'
  };

  return (
    <div 
      className={`p-4 rounded-lg ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
}

export function AlertTitle({ children }: { children: React.ReactNode }) {
  return <div className="font-bold mb-1">{children}</div>;
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm">{children}</div>;
}