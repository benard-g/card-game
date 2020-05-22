function greet(name: string): void {
  console.log(`Hello ${name} !`);
}

async function main(): Promise<void> {
  greet('card-game');
}

if (!module.parent) {
  main().catch(() => {
    process.exit(1);
  });
}
