// utils/validation.ts
export interface FormData {
  idea: string;
  email: string;
  name: string;
  company: string;
  needIn30Days: boolean;
}

export interface ValidationErrors {
  idea?: string;
  email?: string;
  name?: string;
  company?: string;
}

export class ValidationService {
  // Email validation regex
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Minimum lengths
  static readonly MIN_PROMPT_LENGTH = 15;
  static readonly MIN_NAME_LENGTH = 2;
  static readonly MIN_COMPANY_LENGTH = 2;
  static readonly MIN_ANSWER_LENGTH = 5;

  static validateEmail(email: string): string | null {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!this.emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  }

  static validateName(name: string): string | null {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < this.MIN_NAME_LENGTH) {
      return `Name must be at least ${this.MIN_NAME_LENGTH} characters long`;
    }
    return null;
  }

  static validateCompany(company: string): string | null {
    if (!company.trim()) {
      return 'Company is required';
    }
    if (company.trim().length < this.MIN_COMPANY_LENGTH) {
      return `Company must be at least ${this.MIN_COMPANY_LENGTH} characters long`;
    }
    return null;
  }

  static validatePrompt(prompt: string): string | null {
    if (!prompt.trim()) {
      return 'Please describe your idea';
    }
    if (prompt.trim().length < this.MIN_PROMPT_LENGTH) {
      return `Your idea description must be at least ${this.MIN_PROMPT_LENGTH} characters long`;
    }
    return null;
  }

  static validateAnswer(answer: string): string | null {
    if (!answer.trim()) {
      return 'Please provide an answer';
    }
    if (answer.trim().length < this.MIN_ANSWER_LENGTH) {
      return `Answer must be at least ${this.MIN_ANSWER_LENGTH} characters long`;
    }
    return null;
  }

  static validateLeadForm(formData: FormData): ValidationErrors {
    const errors: ValidationErrors = {};

    const emailError = this.validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const nameError = this.validateName(formData.name);
    if (nameError) errors.name = nameError;

    const companyError = this.validateCompany(formData.company);
    if (companyError) errors.company = companyError;

    return errors;
  }

  static isLeadFormValid(formData: FormData): boolean {
    const errors = this.validateLeadForm(formData);
    return Object.keys(errors).length === 0;
  }

  static canSubmitPrompt(formData: FormData): {
    canSubmit: boolean;
    error?: string;
  } {
    // First check if lead form is complete
    if (!this.isLeadFormValid(formData)) {
      return {
        canSubmit: false,
        error: 'Please complete all required fields (Email, Name, Company) before submitting your idea.'
      };
    }

    // Then check prompt validation
    const promptError = this.validatePrompt(formData.idea);
    if (promptError) {
      return {
        canSubmit: false,
        error: promptError
      };
    }

    return { canSubmit: true };
  }

  static getFieldError(fieldName: keyof FormData, value: string): string | null {
    switch (fieldName) {
      case 'email':
        return this.validateEmail(value);
      case 'name':
        return this.validateName(value);
      case 'company':
        return this.validateCompany(value);
      case 'idea':
        return this.validatePrompt(value);
      default:
        return null;
    }
  }
}
