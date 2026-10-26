// Definición inicial de tipos y contratos (Fase SDD)

export type ExpenseCategory = 'Food' | 'Transport' | 'Housing' | 'Utilities' | 'Leisure' | string;

export interface Budget {
  id: string;
  category: ExpenseCategory;
  monthlyLimit: number;
  currentSpent: number;
}

export interface ExpenseInput {
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: Date;
}

export interface ExpenseRecord extends ExpenseInput {
  id: string;
  exceededBudget: boolean;
  budgetRemainingAfter: number;
}

export class InvalidExpenseAmountError extends Error {
  constructor(message = 'Expense amount must be greater than zero') {
    super(message);
    this.name = 'InvalidExpenseAmountError';
  }
}

export class BudgetNotFoundError extends Error {
  constructor(category: string) {
    super(`No budget found configured for category: ${category}`);
    this.name = 'BudgetNotFoundError';
  }
}
