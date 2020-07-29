import { gql } from 'apollo-server-express';

import { createUser } from '../../../testUtils/factories';
import { createTestClient } from '../../../testUtils/helpers';
import { UserType } from '../../../interfaces';

describe('createDepartment mutation', () => {
  const CreateDepartmentMutation = gql`
    mutation($input: CreateDepartmentInput!) {
      createDepartment(input: $input) {
        code
        message
      }
    }
  `;

  test('create department with root user', async () => {
    // Given
    const user = await createUser({ email: 'user@exmaple.com', password: 'test', type: UserType.ROOT });

    // When
    const res = await createTestClient({
      isValid: true,
      jwt: { id: user.id, email: user.email, type: user.type },
    }).mutate({
      mutation: CreateDepartmentMutation,
      variables: {
        input: {
          name: 'Test Department',
        },
      },
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      createDepartment: {
        code: '200',
        message: expect.any(String),
      },
    });
  });

  test('create department with root user and empty name', async () => {
    // Given
    const user = await createUser({ email: 'user@exmaple.com', password: 'test', type: UserType.ROOT });

    // When
    const res = await createTestClient({
      isValid: true,
      jwt: { id: user.id, email: user.email, type: user.type },
    }).mutate({
      mutation: CreateDepartmentMutation,
      variables: {
        input: {
          name: '',
        },
      },
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors[0];
    expect(error.extensions.code).toBe('BAD_USER_INPUT');
  });

  test('create department with non-root user', async () => {
    // Given
    const user = await createUser({ email: 'user@exmaple.com', password: 'test' });

    // When
    const res = await createTestClient({
      isValid: true,
      jwt: { id: user.id, email: user.email, type: user.type },
    }).mutate({
      mutation: CreateDepartmentMutation,
      variables: {
        input: {
          name: 'Test Department',
        },
      },
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors[0];
    expect(error.extensions.code).toBe('FORBIDDEN');
  });

  test('create department without authentication', async () => {
    // When
    const res = await createTestClient().mutate({
      mutation: CreateDepartmentMutation,
      variables: {
        input: {
          name: 'Test Department',
        },
      },
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors[0];
    expect(error.extensions.code).toBe('UNAUTHENTICATED');
  });
});
