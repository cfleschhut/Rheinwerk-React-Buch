import Animal from './Animal';

export default function selectRandomProperty() {
  const properties = Object.keys(Animal.properties);
  const index = Math.floor(Math.random() * properties.length);

  return properties[index] as keyof Animal;
}
