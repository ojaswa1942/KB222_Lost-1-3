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
    },
  });
});
