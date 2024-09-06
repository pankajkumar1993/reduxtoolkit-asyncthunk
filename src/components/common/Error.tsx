import React from "react"

const Error: React.FC<any> = ({ children }) => {
    return (
        <div className="text-red-400 bg-red-200 font-medium p-4 rounded mb-4 text-center">{children}</div>
    )
}

export default Error