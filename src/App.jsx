import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Store from './redux/Store';
import { Provider } from 'react-redux'
import AuthWrapper from './wrappers/AuthWrapper'
import UnAuthWrapper from './wrappers/UnAuthWrapper'
import NewChat from './pages/chat/NewChat';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import ChatLayout from './layouts/ChatLayout';
import NotFound from './pages/extra/NotFound';
import FAQ from './pages/extra/FAQ'
import Chat from './pages/chat/Chat';
import ShareChat from './pages/chat/ShareChat'
import SearchChat from './pages/chat/SearchChat';
import TermsAndConditions from './pages/extra/TermsAndConditions'
import Upgrade from './pages/extra/Upgrade'
import RootLayout from './layouts/RootLayout';
import GeneralContexts from './contexts/GeneralContexts';
import NoteCollections from './pages/notes/NoteCollections';
import Notes from './pages/notes/Notes';

export default function App() {


  // return <Test />


  return (
    <GeneralContexts>
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    </GeneralContexts>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    Component: AuthWrapper(ChatLayout),
    children: [
      {
        index: true,
        Component: NewChat
      },
      {
        path: "chat",
        Component: Chat
      },
      {
        path: "note_collections",
        Component: NoteCollections
      },
      {
        path: "note_collections/:collection_id",
        Component: Notes
      },
      {
        path: 'chat/share/:share_id',
        Component: ShareChat
      },
      {
        path: 'faq',
        Component: FAQ
      },
      {
        path: 'share/:share_id',
        Component: ShareChat
      },
      {
        path: 'terms',
        Component: TermsAndConditions
      },
      {
        path: 'upgrade',
        Component: Upgrade
      }
    ]
  },
  {
    path: '/',
    Component: UnAuthWrapper(RootLayout),
    children: [
      {
        path: '/signup',
        Component: Signup
      },
      {
        path: '/signin',
        Component: Signin
      },
      {
        path: '*',
        Component: NotFound
      }
    ]
  }
]);
