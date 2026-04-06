import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://192types.com/compatibility',
  },
};

export default function CompatibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
