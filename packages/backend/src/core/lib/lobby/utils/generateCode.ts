const CODE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const random = () => Math.floor(Math.random() * CODE_LETTERS.length);

export function generateCode(length: number): string {
  let code = '';
  for (let i = 0; i < length; ++i) {
    code += CODE_LETTERS[random()];
  }

  return code;
}
