import { gql } from 'apollo-server-express';

import { createUser, createDepartment, createScheme, createChannel, createRoom } from '../../../testUtils/factories';
import { createTestClient } from '../../../testUtils/helpers';
import { UserType } from '../../../interfaces';

describe('sendMessage mutation', () => {
  const SendMessageMutation = gql`
    mutation($input: SendMessageInput!) {
      sendMessage(input: $input) {
        code
        message
      }
    }
  `;

  test('send message to a room', async () => {
    // Given
    const user = await createUser({ email: 'user@exmaple.com', password: 'test', type: UserType.STATE });
    const schUser = await createUser({ email: 'scheme@exmaple.com', password: 'test', type: UserType.CENTRE });
    const dept = await createDepartment({ users: [user] });
    const scheme = await createScheme({ users: [schUser] });
    const channel = await createChannel({ department: dept, scheme });
    const room = await createRoom({ channel, users: [user, schUser] });

    // When
    const res = await createTestClient({
      isValid: true,
      jwt: { id: user.id, email: user.email, type: user.type },
    }).mutate({
      mutation: SendMessageMutation,
      variables: {
        input: {
          roomID: room.id,
          body: 'test message',
        },
      },
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      sendMessage: {
        code: '200',
        message: expect.any(String),
      },
    });
  });
});
