export async function fakeAuthenticate(identifier: string, password: string): Promise<boolean> {
  // Simulate network/auth delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Fake credentials
  const validUsername = 'admin';
  const validPassword = '123456';

  return identifier === validUsername && password === validPassword;
}
