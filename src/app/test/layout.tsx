import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://192types.com/test',
  },
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
