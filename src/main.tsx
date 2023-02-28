import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      withCSSVariables
      theme={{
        colorScheme: 'dark',
        fontFamily: "'Roboto Condensed', sans-serif",
        breakpoints: {
          xs: 375,
        },
      }}
    >
      <NotificationsProvider>
        <HomePage />
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>,
);
