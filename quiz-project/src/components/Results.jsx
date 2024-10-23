// This component will display the quiz results alongside the image obtained from the API

import React from 'react';

export default function Results({ element, artwork }) {

    const name = 'User';

    

    return (
        <div>
            <p>
                <strong>{name}</strong>, your element is: {element}
            </p>
            {artwork ? (
                <div className='artwork'>
                    <h2>{artwork.title}</h2>
                    <img src={artwork.primaryImage} alt={artwork.title} />
                    <p>{artwork.artistDisplayName}</p>
                    <p>{artwork.objectDate}</p>
                </div>
            ) : (
                <p>No artwork found.</p>
            )}
        </div>
    )
}