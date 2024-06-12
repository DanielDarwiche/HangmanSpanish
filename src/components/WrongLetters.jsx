import React from 'react';

const WrongLetters = ({ wrongLetters }) => {
    return (
        <div className="wrong-letters-container">
            <div className="wrong-letters-color">
                {wrongLetters.length > 0 &&
                    <p>Fel bokstäver:</p>
                }
                {wrongLetters
                    .map((letter, i) => <span key={i}>{letter.toUpperCase()}</span>)
                    .reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)}
            </div>
        </div>
    );
}

export default WrongLetters;
