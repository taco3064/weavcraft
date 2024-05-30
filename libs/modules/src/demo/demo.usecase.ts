import { inject, injectable } from 'tsyringe';
import { INJECT_REPO_TEST } from '../const';
import { ITestRepository } from './types';

@injectable()
export class DemoUseCase {
  constructor(
    @inject(INJECT_REPO_TEST)
    private readonly testRepo: ITestRepository
  ) {}

  async getTests() {
    return this.testRepo.getTestDate();
  }
}
