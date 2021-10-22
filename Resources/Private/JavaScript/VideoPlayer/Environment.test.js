import Environment from './Environment';

describe('mkid', () => {
  test('basic', () => {
    const env = new Environment();

    const id_1 = env.mkid();
    const id_2 = env.mkid();

    expect(id_1).not.toBe(id_2);
  });
});
