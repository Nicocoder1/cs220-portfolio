import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SectionHeading({ children }: Props) {
  return (
    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-3 sm:mb-4">
      {children}
    </h2>
  );
}
