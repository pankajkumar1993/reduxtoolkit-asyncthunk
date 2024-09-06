import React from 'react';

interface SectionHeadingProps {
    title: string;
    centered?: boolean;
    marginb?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, centered = true, marginb }) => {
    return (
        <h1 className={`${marginb ? 'mb-5' : ''} text-2xl uppercase ${centered ? 'text-center' : ''} font-bold`}>
            {title}
        </h1 >
    );
}

export default SectionHeading;