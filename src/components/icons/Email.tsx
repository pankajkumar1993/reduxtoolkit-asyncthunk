import React from 'react'
import { IconProps } from '../../types'

const Email: React.FC<IconProps> = ({ size = 20, fill = "currentColor", className }) => {
    return (
        <svg
            className={className}
            fill={fill}
            widths={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
        </svg>
    )
}

export default Email