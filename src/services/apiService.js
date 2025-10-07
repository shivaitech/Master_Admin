// services/apiService.js
const API_BASE_URL = 'https://backend-landing-3pmg.onrender.com/api';

export class apiService {
  static async submitLeadForm(leadData) {
    try {
      const response = await fetch(`${API_BASE_URL}/submit-lead-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();
      
      if (result.success) {
        return result.data.leadId;
      } else {
        throw new Error(result.message || 'Failed to submit lead form');
      }
    } catch (error) {
      console.error('Error submitting lead form:', error);
      throw new Error('Failed to submit form. Please try again.');
    }
  }

  static async startChatSession(leadId, idea) {
    try {
      const response = await fetch(`${API_BASE_URL}/start-chat-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadId,
          idea,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to start chat session');
      }
    } catch (error) {
      console.error('Error starting chat session:', error);
      throw new Error('Failed to generate questions. Please try again.');
    }
  }

  static async submitAnswer(chatSessionId, answer) {
    try {
      const response = await fetch(`${API_BASE_URL}/submit-answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatSessionId,
          answer,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to submit answer');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      throw new Error('Failed to submit answer. Please try again.');
    }
  }
}