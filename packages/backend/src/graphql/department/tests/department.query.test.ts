import { gql } from 'apollo-server-express';

import { createUser, createDepartment } from '../../../testUtils/factories';
import { createTestClient } from '../../../testUtils/helpers';
import { UserType } from '../../../interfaces';

describe('department query', () => {
  const DepartmentQuery = gql`
    query($input: DepartmentInput!) {
      department(input: $input) {
        id
        name
        users {
          id
        }
        channels {
          id
        }
      }
    }
  `;

  test('fetch department with root', async () => {
    // Given
    const user = await createUser({ email: 'root@example.com', password: 'test', type: UserType.ROOT });
    const dep = await createDepartment();

    // When
    const res = await createTestClient({
      isValid: true,
      jwt: { id: user.id, email: user.email, type: user.type },
    }).query({
      query: DepartmentQuery,
      variables: {
        input: {
          id: dep.id,
        },
      },
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBe(null);
    expect(res.data?.department).toMatchSnapshot();
  });

  test('fetch department with member user', async () => {
    // Given
    const user = await createUser({ email: 'user@example.com', password: 'test' });
    const dep = await createDepartment({ users: [user] });

    // When
    const res = await createTestClient({
      isValid: true,
      jwt: { id: user.id, email: user.email, type: user.type },
    }).query({
      query: DepartmentQuery,
      variables: {
        input: {
          id: dep.id,
        },
      },
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBe(null);
    expect(res.data?.department).toMatchSnapshot();
  });

  test('fetch department with non-member user', async () => {
    // Given
    const user = await createUser({ email: 'user@example.com', password: 'test' });
    const dep = await createDepartment();

    // When
    const res = await createTestClient({
      isValid: true,
      jwt: { id: user.id, email: user.email, type: user.type },
    }).query({
      query: DepartmentQuery,
      variables: {
        input: {
          id: dep.id,
        },
      },
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors[0];
    expect(error.extensions.code).toBe('FORBIDDEN');
  });
});
