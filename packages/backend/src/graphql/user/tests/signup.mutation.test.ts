import { gql } from 'apollo-server-express';
import { createTestClient } from '../../../testUtils/helpers';

test('signup mutation', async () => {
  // When
  const res = await createTestClient().mutate({
    mutation: gql`
      mutation($input: SignUpInput!) {
        signup(input: $input) {
          code
          message
          user {
            id
            name
            email
            createdAt
          }
        }
      }
    `,
    variables: {
      input: {
        name: 'Test',
        email: 'test@example.com',
        password: '1234',
      },
    },
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchObject({
    signup: {
      code: '200',
      message: expect.any(String),
      user: {
        id: expect.any(Number),
        name: 'Test',
        email: 'test@example.com',
        createdAt: expect.any(String),
      },
    },
  });
});
