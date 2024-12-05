import React, { useEffect } from 'react';

const DotFallout = () => {
    useEffect(() => {
        // Find the dots and the button
        const createButton = document.querySelector('.create-rak-form button');
        const dots = document.querySelectorAll('.rectangle > dot');

        // Add click listener to the button
        const handleClick = () => {
            dots.forEach(dot => {
                dot.classList.add('dot-fall'); // Add the fall animation
            });
        };

        // Attach event listener
        createButton.addEventListener('click', handleClick);

        // Cleanup on unmount
        return () => {
            createButton.removeEventListener('click', handleClick);
        };
    }, []); // Runs once on component mount

    return (
        <div className="rectangle">
            {/* Render the dots */}
            <dot></dot>
            <dot></dot>
            <dot></dot>
            {/* Add more dots as necessary */}
        </div>
    );
};

export default DotFallout;
