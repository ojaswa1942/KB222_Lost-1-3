import DataLoader from 'dataloader';
import { getRepository } from 'typeorm';
import { Department } from '../database/entity/Department';
import { normalize } from './normalize';

const batchDepartments: DataLoader.BatchLoadFn<number, Department> = async (ids) => {
  const departments = await getRepository(Department).findByIds([...ids], { relations: ['users', 'channels'] });

  const byID = normalize<Department>(departments);

  return ids.map((id) => byID[id]);
};

export const buildDepartmentLoader = () => new DataLoader<number, Department>(batchDepartments);
