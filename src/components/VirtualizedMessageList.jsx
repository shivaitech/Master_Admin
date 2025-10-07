import { memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVirtualizer } from '@tanstack/react-virtual';

const MessageItem = memo(({ message, isSender }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
    className={`message-enter flex ${isSender ? 'justify-end' : 'justify-start'}`}
  >
    <motion.div 
      initial={{ x: isSender ? 20 : -20 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2 sm:gap-3 max-w-[85%] ${isSender ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {message.sender === 'bot' ? (
          <div className="bg-[#0093DD] text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
            <img src="/assets/HeroSection/ShivAi.svg" alt="AI" className="w-6 h-6" />
          </div>
        ) : (
          <img src="/assets/HeroSection/user.svg" alt="User" className="w-8 h-8 rounded-full" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={`
        p-3 rounded-2xl shadow-lg max-w-full break-words
        ${message.sender === 'bot' 
          ? 'bg-[#0093DD] text-white rounded-tl-sm' 
          : 'bg-white/10 text-white rounded-tr-sm border border-white/20'
        }
        ${message.isLoading ? 'message-loading' : ''}
      `}>
        {message.isLoading ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
            </div>
            <span className="text-sm text-white/80">Thinking...</span>
          </div>
        ) : (
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
        )}
      </div>
    </motion.div>
  </motion.div>
));

const VirtualizedMessageList = ({ messages, containerRef }) => {
  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 100, // Estimate height of each message
    overscan: 5 // Number of items to render outside of view
  });

  useEffect(() => {
    if (messages.length > 0) {
      rowVirtualizer.scrollToIndex(messages.length - 1, { align: 'end' });
    }
  }, [messages.length, rowVirtualizer]);

  return (
    <div
      ref={parentRef}
      className="min-h-[200px] max-h-96 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 scrollbar-hide"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        <AnimatePresence>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={messages[virtualRow.index].id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <MessageItem
                message={messages[virtualRow.index]}
                isSender={messages[virtualRow.index].sender === 'user'}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(VirtualizedMessageList);