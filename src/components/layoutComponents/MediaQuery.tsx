"use client";

import React, { useEffect, useState } from 'react';

interface MediaQueryProps {
    children: React.ReactNode;
    minSize?: number; // in pixels
    maxSize?: number; // in pixels
}

const MediaQuery: React.FC<MediaQueryProps> = ({ children, minSize = 0, maxSize = Infinity }) => {
    const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        // Set initial screen width on mount
        updateScreenWidth();

        window.addEventListener('resize', updateScreenWidth);
        
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    const isWithinBounds = (width: number | undefined) => {
        if (width === undefined) return false;
        return width > minSize && width < maxSize;
    };

    return (
        <>
            {isWithinBounds(screenWidth) && children}
        </>
    );
};

export default MediaQuery;
