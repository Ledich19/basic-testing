// Uncomment the code below and write your tests
import { getBankAccount } from '.';
import _lodash from 'lodash';

const testingAccount = getBankAccount(999);
const anotherAccount = getBankAccount(0);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(testingAccount.getBalance()).toBe(999);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawValue = 99999;
    const startBalance = testingAccount.getBalance();
    function withdrawing() {
      testingAccount.withdraw(withdrawValue);
    }
    expect(withdrawing).toThrow(
      `Insufficient funds: cannot withdraw more than ${startBalance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferValue = 99999;
    const startBalance = testingAccount.getBalance();
    function transferring() {
      testingAccount.transfer(transferValue, anotherAccount);
    }
    expect(transferring).toThrow(
      `Insufficient funds: cannot withdraw more than ${startBalance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const TRANSFER_VALUE = 99999;
    function transferring() {
      testingAccount.transfer(TRANSFER_VALUE, testingAccount);
    }
    expect(transferring).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const startAmount = testingAccount.getBalance();
    const DEPOSIT = 100;
    const depositResult = testingAccount.deposit(DEPOSIT);
    expect(depositResult.getBalance()).toBe(startAmount + DEPOSIT);
  });

  test('should withdraw money', () => {
    const startAmount = testingAccount.getBalance();
    const AMOUNT = 100;
    const withdrawResult = testingAccount.withdraw(AMOUNT);
    expect(withdrawResult.getBalance()).toBe(startAmount - AMOUNT);
  });

  test('should transfer money', () => {
    const startAmount = testingAccount.getBalance();
    const startAnotherAmount = anotherAccount.getBalance();
    const AMOUNT = 100;
    const transferResult = testingAccount.transfer(AMOUNT, anotherAccount);
    expect(transferResult.getBalance()).toBe(startAmount - AMOUNT);
    const andAnotherAmount = anotherAccount.getBalance();
    expect(andAnotherAmount).toBe(startAnotherAmount + AMOUNT);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(_lodash, 'random').mockReturnValue(1);
    const balance = await testingAccount.fetchBalance();
    expect(balance).toBe(1);
    expect(typeof balance).toBe('number');
    jest.spyOn(Math, 'random').mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(_lodash, 'random').mockReturnValue(1);
    await testingAccount.synchronizeBalance();
    expect(testingAccount.getBalance()).toBe(1);
    jest.spyOn(Math, 'random').mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(_lodash, 'random').mockReturnValue(0);
    expect(testingAccount.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
    jest.spyOn(Math, 'random').mockRestore();
  });
});
