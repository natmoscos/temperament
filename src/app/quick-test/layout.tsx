import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://192types.com/quick-test',
  },
};

export default function QuickTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
