import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

import { Root } from '@/components/Root/Root';

import '@telegram-apps/telegram-ui/dist/styles.css';
import 'normalize.css/normalize.css';
import './_assets/globals.css';

export const metadata: Metadata = {
  title: 'Smart Birds Partners',
  description: 'The Smart Birds loyalty program',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
      <Root>
        {children}
      </Root>
    </body>
    </html>
  );
}
