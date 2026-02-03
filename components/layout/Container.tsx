interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  className?: string;
}

export default function Container({
  children,
  maxWidth = "max-w-4xl",
  className = "",
}: ContainerProps) {
  return (
    <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
