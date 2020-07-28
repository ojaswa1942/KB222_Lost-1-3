import { gql } from 'apollo-server-express';

import { User } from '../../../database/entity/User';
import { createUser } from '../../../testUtils/factories';
import { createTestClient } from '../../../testUtils/helpers';

describe('signin mutation', () => {
  let user: User;
  const password = 'secret password';

  beforeEach(async () => {
    user = await createUser({ email: 'user@exmaple.com', password });
  });

  const SignInMutation = gql`
    mutation($input: SignInInput!) {
      signin(input: $input) {
        code
        message
        expiry
      }
    }
  `;

  test('signin with valid credentials', async () => {
    // When
    const res = await createTestClient().mutate({
      mutation: SignInMutation,
      variables: {
        input: {
          email: user.email,
          password,
        },
      },
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      signin: {
        code: '200',
        message: expect.any(String),
        expiry: expect.any(String),
      },
    });
  });

  test('signin with invalid email', async () => {
    // When
    const res = await createTestClient().mutate({
      mutation: SignInMutation,
      variables: {
        input: {
          email: 'invalid@email.com',
          password,
        },
      },
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors[0];
    expect(error.extensions.code).toBe('INVALID_CREDENTIALS');
  });

  test('signin with invalid password', async () => {
    // When
    const res = await createTestClient().mutate({
      mutation: SignInMutation,
      variables: {
        input: {
          email: user.email,
          password: 'invalid password',
        },
      },
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors[0];
    expect(error.extensions.code).toBe('INVALID_CREDENTIALS');
  });
});
