import { gql } from 'apollo-server-express';

import { createDepartment, createUser } from '../../../testUtils/factories';
import { createTestClient } from '../../../testUtils/helpers';
import { UserType } from '../../../interfaces';

describe('departments query', () => {
  const DepartmentsQuery = gql`
    query {
      departments {
        id
      }
    }
  `;

  test('fetch departments with root', async () => {
    // Given
    const user = await createUser({ email: 'root@example.com', password: 'test', type: UserType.ROOT });
    const d1 = createDepartment();
    const d2 = createDepartment();
    const d3 = createDepartment();
    await Promise.all([d1, d2, d3]);

    // When
    const res = await createTestClient({
      isValid: true,
      jwt: { id: user.id, email: user.email, type: user.type },
    }).query({
      query: DepartmentsQuery,
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBe(null);
    expect(res.data?.departments).toMatchSnapshot();
  });

  test('fetch departments with state user', async () => {
    // Given
    const user = await createUser({ email: 'root@example.com', password: 'test', type: UserType.STATE });
    await createDepartment();
    await createDepartment({ users: [user] });
    await createDepartment();
    await createDepartment({ users: [user] });

    // When
    const res = await createTestClient({
      isValid: true,
      jwt: { id: user.id, email: user.email, type: user.type },
    }).query({
      query: DepartmentsQuery,
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBe(null);
    expect(res.data?.departments).toMatchSnapshot();
  });
});
