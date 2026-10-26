import { Budget, ExpenseInput, ExpenseRecord, InvalidExpenseAmountError, BudgetNotFoundError } from '../models/types.js';

export class ExpenseService {
  private budgets: Map<string, Budget> = new Map();
  private expenses: ExpenseRecord[] = [];

  constructor(initialBudgets: Budget[] = []) {
    for (const budget of initialBudgets) {
      this.budgets.set(budget.category, { ...budget });
    }
  }

  /**
   * Registra un nuevo gasto y actualiza el saldo del presupuesto.
   * STUB INICIAL: Diseñado para fallar (Fase RED).
   */
  public recordExpense(input: ExpenseInput): ExpenseRecord {
    // Los alumnos y Claude deben implementar esta lógica en la Fase Green
    throw new Error('Not implemented: Complete this method during TDD Green phase');
  }

  public getBudget(category: string): Budget | undefined {
    return this.budgets.get(category);
  }

  public getAllExpenses(): ExpenseRecord[] {
    return [...this.expenses];
  }
}
