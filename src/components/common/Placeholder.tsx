import React from "react"

const Placeholder: React.FC<any> = ({ children }) => {
    return (
        <div className="bg-gray-200 font-medium p-4 rounded mb-4 text-center">{children}</div>
    )
}

export default Placeholder;