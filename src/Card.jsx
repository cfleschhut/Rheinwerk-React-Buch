import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import Animal from './Animal';

export default function Card({
  animal,
  uncovered,
  onSelectProperty,
  selectedProperty,
}) {
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
                onClick={() => onSelectProperty(property)}
              >
                <td>{animalProperty.label}</td>
                <td>
                  {animal[property]}
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

Card.propTypes = {
  uncovered: PropTypes.bool.isRequired,
  animal: PropTypes.instanceOf(Animal).isRequired,
  onSelectProperty: PropTypes.func,
  selectedProperty: PropTypes.string,
};
