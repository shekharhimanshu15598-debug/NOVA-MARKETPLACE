import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  ShoppingBag, 
  Repeat, 
  Clock, 
  Smile, 
  Paperclip,
  CheckCheck
} from 'lucide-react';
import { MessageThread } from '../types';
import { formatINR } from '../utils/formatters';

interface MessagesModalProps {
  onClose: () => void;
  threads: MessageThread[];
  onSendMessage: (threadId: string, text: string) => void;
  onShowToast: (msg: string) => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({
  onClose,
  threads,
  onSendMessage,
  onShowToast,
}) => {
  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0]?.id || '');
  const [inputText, setInputText] = useState('');

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(activeThreadId, inputText.trim());
    setInputText('');
  };

  const handleQuickQuestion = (q: string) => {
    onSendMessage(activeThreadId, q);
  };

  return (
    <div
      id="messages-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white text-zinc-900 rounded-3xl max-w-4xl w-full overflow-hidden shadow-modal border border-zinc-200 relative my-auto animate-in zoom-in-95 duration-200 flex flex-col h-[750px] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-950 font-manrope">
                NOVA Protected Messages
              </h2>
              <p className="text-[11px] text-zinc-500">
                End-to-end encrypted seller and buyer communication
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-zinc-200 text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Chat Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Left Column: Threads List (4 Cols) */}
          <div className="md:col-span-4 border-r border-zinc-100 overflow-y-auto bg-zinc-50/50 p-2 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Active Conversations ({threads.length})
            </div>

            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`w-full p-3 rounded-2xl text-left transition-all cursor-pointer flex items-start gap-3 ${
                  activeThread?.id === thread.id
                    ? 'bg-white shadow-sm border border-zinc-200'
                    : 'hover:bg-zinc-100/80 border border-transparent'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={thread.otherUser.avatar}
                    alt={thread.otherUser.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {thread.otherUser.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-950 truncate">{thread.otherUser.name}</h4>
                    <span className="text-[10px] text-zinc-400">{thread.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] font-medium text-zinc-600 truncate mt-0.5">{thread.listing.title}</p>
                  <p className="text-[11px] text-zinc-400 truncate">{thread.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Active Thread & Conversation (8 Cols) */}
          {activeThread ? (
            <div className="md:col-span-8 flex flex-col h-full bg-white">
              
              {/* Product Header Attachment Bar */}
              <div className="px-6 py-3 border-b border-zinc-100 bg-zinc-50/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeThread.listing.image}
                    alt={activeThread.listing.title}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-950 line-clamp-1">{activeThread.listing.title}</h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="font-extrabold text-zinc-950">{formatINR(activeThread.listing.buyPrice)}</span>
                      {activeThread.listing.rentPrice && (
                        <span className="font-bold text-emerald-800">• {formatINR(activeThread.listing.rentPrice)}/{activeThread.listing.rentPeriod || 'day'}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" /> Escrow Active
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeThread.messages.map((msg) => {
                  const isMe = msg.senderId === 'user-me';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                          isMe
                            ? 'bg-zinc-950 text-white rounded-br-none'
                            : 'bg-zinc-100 text-zinc-900 rounded-bl-none'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-1 px-1 flex items-center gap-1">
                        {msg.time}
                        {isMe && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Quick Questions Chips */}
              <div className="px-6 py-2 border-t border-zinc-100 bg-zinc-50/50 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider shrink-0">Quick:</span>
                {[
                  'Is this available this weekend?',
                  'Can I inspect it tomorrow?',
                  'What is your final price?',
                  'Does it have full warranty?',
                ].map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickQuestion(q)}
                    className="px-2.5 py-1 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:text-zinc-950 text-[11px] font-medium whitespace-nowrap hover:bg-zinc-100 transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-4 border-t border-zinc-100 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message or counter offer..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-950 font-medium"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-2xl bg-zinc-950 hover:bg-zinc-800 text-white transition-colors cursor-pointer"
                  title="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          ) : (
            <div className="md:col-span-8 flex items-center justify-center p-8 text-zinc-400 text-xs">
              Select a conversation to start chatting
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
