import { useState } from 'react';
import { ValidationService } from '../utils/validation';
import { ApiService } from '../services/apiService.js';

export const useForm = () => {
  const [formData, setFormData] = useState({
    idea: '',
    email: '',
    name: '',
    company: '',
    needIn30Days: false,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadId, setLeadId] = useState('');

  const handleInputChange = (name, value, type = 'text') => {
    const newValue = type === 'checkbox' ? value : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFieldBlur = (fieldName, value) => {
    const error = ValidationService.getFieldError(fieldName, value);
    if (error) {
      setValidationErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  };

  const validateForm = () => {
    const errors = ValidationService.validateLeadForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      return null;
    }

    setIsSubmitting(true);
    
    try {
      const newLeadId = await ApiService.submitLeadForm({
        email: formData.email,
        name: formData.name,
        company: formData.company,
        needIn30Days: formData.needIn30Days,
      });
      
      setLeadId(newLeadId);
      return newLeadId;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWordCount = () => {
    return formData.idea.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return {
    formData,
    validationErrors,
    isSubmitting,
    leadId,
    handleInputChange,
    handleFieldBlur,
    submitForm,
    getWordCount,
    isFormComplete: ValidationService.isLeadFormValid(formData),
    promptError: ValidationService.validatePrompt(formData.idea)
  };
};