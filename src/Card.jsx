import React from 'react';
import './Card.css';
import Animal from './Animal';

const uncovered = false;

export default function Card() {
  const elephant = new Animal(
    'Elefant',
    'placeholder.png',
    3.3,
    6000,
    70,
    1,
    40,
  );

  const front = (
    <div className="card">
      <h1>{elephant.name ? elephant.name : 'Unbekannt'}</h1>
      {elephant.image && (
        <img
          alt="Elefant"
          src={`${process.env.PUBLIC_URL}/${elephant.image}`}
          height="200"
          width="200"
        />
      )}
      <table>
        <tbody>
          {Object.keys(Animal.properties).map((property) => {
            const animalProperty = Animal.properties[property];
            return (
              <tr key={property}>
                <td>{animalProperty.label}</td>
                <td>
                  {elephant[property]}
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

  if (uncovered) {
    return front;
  }

  return back;
}
