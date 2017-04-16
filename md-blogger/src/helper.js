export function randomTitle () {
  const adjective = ['magical', 'angry', 'ugly', 'contaminated', 'stunning', 'ornate', 'artificial', 'yummy', 'rusty', 'orange'];
  const noun = ['robot', 'woman', 'plant', 'fridge', 'guitar', 'gorilla', 'bee', 'tea-cup'];

  const titleCase = word => `${word[0].toUpperCase()}${word.slice(1)}`;
  const random = arr => arr[Math.floor(Math.random() * arr.length)];

  return `${titleCase(random(adjective))} ${random(adjective)} ${random(noun)}`;
}
