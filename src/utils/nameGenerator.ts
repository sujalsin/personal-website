const adjectives = [
  'Swift', 'Clever', 'Bright', 'Quick', 'Sharp', 'Smart', 'Bold', 'Brave',
  'Calm', 'Deft', 'Epic', 'Fair', 'Fast', 'Keen', 'Wise', 'Wild',
  'Noble', 'Prime', 'Proud', 'Pure', 'Rich', 'Safe', 'Sure', 'Warm',
];

const nouns = [
  'Pixel', 'Byte', 'Code', 'Data', 'Link', 'Node', 'Port', 'Query',
  'Stack', 'Token', 'Array', 'Cache', 'Frame', 'Grid', 'Hash', 'Loop',
  'Queue', 'Scope', 'Shell', 'Table', 'Unit', 'Value', 'Wave', 'Zone',
];

const numbers = '0123456789';

export const generateUniqueName = (existingNames: string[] = []): string => {
  let name = '';
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Array.from({ length: 3 }, () => 
      numbers[Math.floor(Math.random() * numbers.length)]
    ).join('');

    name = `${adj}${noun}${num}`;
    
    if (!existingNames.includes(name)) {
      return name;
    }
    
    attempts++;
  }

  // If we couldn't generate a unique name after max attempts,
  // add a timestamp to ensure uniqueness
  return `${name}${Date.now()}`;
};
