import { useState } from 'react';
import { ApiService } from '../services/apiService.js';

export const useChat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [chatSessionId, setChatSessionId] = useState('');
  const [apiError, setApiError] = useState('');

  const submitAnswer = async () => {
    const answerError = ValidationService.validateAnswer(currentAnswer);
    if (answerError) {
      setApiError(answerError);
      return;
    }

    setIsSubmittingAnswer(true);
    setApiError('');
    const submittedAnswer = currentAnswer;
    
    setCurrentAnswer('');

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: submittedAnswer,
      timestamp: new Date()
    };

    const loadingMessage = {
      id: Date.now().toString() + '_loading',
      sender: 'bot',
      text: '',
      timestamp: new Date(),
      isLoading: true
    };

    setChatMessages(prev => [...prev, userMessage, loadingMessage]);

    try {
      if (chatSessionId) {
        const result = await ApiService.submitAnswer(chatSessionId, submittedAnswer);
        
        if (result.isComplete) {
          setChatMessages(prev => prev.filter(msg => !msg.isLoading));
          return { isComplete: true };
        } else if (result.nextQuestion) {
          const nextMessage = {
            id: Date.now().toString(),
            sender: 'bot',
            text: result.nextQuestion,
            timestamp: new Date()
          };

          setChatMessages(prev => [
            ...prev.filter(msg => !msg.isLoading),
            nextMessage
          ]);
          setCurrentQuestionIndex(prev => prev + 1);
          return { isComplete: false };
        }
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      setChatMessages(prev => prev.filter(msg => !msg.isLoading));
      setApiError(error instanceof Error ? error.message : 'Failed to submit answer');
    } finally {
      setIsSubmittingAnswer(false);
    }
  };

  const startChat = async (leadId, initialIdea) => {
    try {
      const chatData = await ApiService.startChatSession(leadId, initialIdea);
      setChatSessionId(chatData.chatSessionId);
      setQuestions([chatData.firstQuestion]);
      
      const firstMessage = {
        id: '1',
        sender: 'bot',
        text: chatData.firstQuestion,
        timestamp: new Date()
      };

      setChatMessages([firstMessage]);
      setCurrentQuestionIndex(0);
      return true;
    } catch (error) {
      console.error('Error starting chat:', error);
      setApiError(error instanceof Error ? error.message : 'Failed to start chat');
      
      // Fallback
      const fallbackQuestions = [
        "Who is the first target user and what problem do they face today?",
        "What's the biggest pain point your target user experiences currently?",
        "How do they solve this problem right now without your app?"
      ];
      setQuestions(fallbackQuestions);
      
      const firstMessage = {
        id: '1',
        sender: 'bot',
        text: fallbackQuestions[0],
        timestamp: new Date()
      };

      setChatMessages([firstMessage]);
      setCurrentQuestionIndex(0);
      return true;
    }
  };

  return {
    chatMessages,
    currentAnswer,
    setCurrentAnswer,
    isSubmittingAnswer,
    currentQuestionIndex,
    questions,
    apiError,
    setApiError,
    submitAnswer,
    startChat
  };
};