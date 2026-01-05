import ChatSearch from './Components/ChatSearch';
import ChatList from './Components/ChatList';
import MessageWindow from './Components/MessageWindow';
import NavBar from '../../components/NavBar';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChatProvider, useChat } from './ChatContext'; 

const MessagePageContent = () => {
  const [searchParams] = useSearchParams();
  const { startConversation, currentUser } = useChat();
  const userIdFromUrl = searchParams.get('userId');

  useEffect(() => {
    // Auto-start conversation if userId is in URL
    if (userIdFromUrl && currentUser?.id) {
      startConversation(userIdFromUrl);
    }
  }, [userIdFromUrl, currentUser?.id, startConversation]);

  return (
    <div className="w-6xl flex flex-col h-screen bg-white font-sans">
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-6xl h-[85vh] rounded-2xl shadow-2xl flex overflow-hidden border border-white">
          <div className="w-1/3 max-w-xs flex flex-col border-r border-gray-200 bg-white h-full">
            <ChatSearch />
            <div className="flex-1 overflow-hidden relative">
              <ChatList />
            </div>
          </div>
          <div className="flex-1 h-full bg-white">
            <MessageWindow />
          </div>
        </div>
      </div>
    </div>
  );
};

const MessagePage = () => {
  return (
    <ChatProvider>
      <MessagePageContent />
    </ChatProvider>
  );
};

export default MessagePage;