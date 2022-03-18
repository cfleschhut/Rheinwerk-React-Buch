import React, { useContext } from 'react';
import './Card.css';
import Animal from './Animal';
import DarkMode from './DarkMode';

interface Props {
  animal: Animal;
  uncovered: boolean;
  onSelectProperty: (property: keyof Animal) => void;
  selectedProperty: string;
}

export default function Card({
  animal,
  uncovered,
  onSelectProperty,
  selectedProperty,
}: Props) {
  const front = (
    <div className="card">
      <h1>{animal.name ? animal.name : 'Unbekannt'}</h1>
      {animal.image && (
        <img
          alt={animal.name}
          src={`${process.env.PUBLIC_URL}/${animal.image}`}
          height="200"
          width="200"
        />
      )}
      <table>
        <tbody>
          {Object.keys(Animal.properties).map((property) => {
            const animalProperty = Animal.properties[property];

            return (
              <tr
                key={property}
                className={selectedProperty === property ? 'active' : ''}
                onClick={() => onSelectProperty(property as keyof Animal)}
              >
                <td>{animalProperty.label}</td>
                <td>
                  {animal[property as keyof Animal]}&nbsp;
                  {animalProperty.unit}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const back = <div className="card back" />;

  const darkMode = useContext(DarkMode);
  const darkModeClassName = darkMode ? 'dark' : 'light';

  return <div className={darkModeClassName}>{uncovered ? front : back}</div>;
}
