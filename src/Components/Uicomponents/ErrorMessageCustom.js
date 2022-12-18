import React from 'react'
import '../css/error.css'
export default function ErrorMessage({ message }) {
    return (
        <div class="error-message-custom">{message}</div>
    )
}
