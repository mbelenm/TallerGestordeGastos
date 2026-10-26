import { describe, it, expect, beforeEach } from 'vitest';
import { ExpenseService } from '../services/expense_service.js';
import { Budget } from '../models/types.js';

describe('ExpenseService (TDD Workshop)', () => {
  let service: ExpenseService;

  beforeEach(() => {
    const initialBudgets: Budget[] = [
      { id: 'b1', category: 'Food', monthlyLimit: 300, currentSpent: 50 },
      { id: 'b2', category: 'Transport', monthlyLimit: 100, currentSpent: 0 }
    ];
    service = new ExpenseService(initialBudgets);
  });

  it('debe registrar un gasto exitosamente dentro del presupuesto disponible', () => {
    const record = service.recordExpense({
      amount: 40,
      category: 'Food',
      description: 'Supermercado semanal',
      date: new Date()
    });

    expect(record).toBeDefined();
    expect(record.amount).toBe(40);
    expect(record.exceededBudget).toBe(false);
    expect(record.budgetRemainingAfter).toBe(210); // 300 - (50 + 40)
  });
});
