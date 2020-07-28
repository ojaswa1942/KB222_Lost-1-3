import { gql } from 'apollo-server-express';

import { createUser } from '../../../testUtils/factories';
import { createTestClient } from '../../../testUtils/helpers';

describe('user query', () => {
  it('returns the current user when authenticated', async () => {
    // Given
    const currentUser = await createUser();

    // When
    const res = await createTestClient({ isValid: true, jwt: { id: currentUser.id, email: currentUser.email } }).query({
      query: gql`
        query {
          user {
            id
            name
            email
            isVerified
          }
        }
      `,
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      user: {
        id: expect.any(Number),
        name: currentUser.name,
        email: currentUser.email,
        isVerified: true,
      },
    });
  });

  it('returns an error if not authenticated', async () => {
    // When
    const res = await createTestClient().query({
      query: gql`
        query {
          user {
            id
          }
        }
      `,
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors[0];
    expect(error.extensions.code).toBe('UNAUTHENTICATED');
  });
});
