import React, { forwardRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'

const PasswordInput = forwardRef(({ 
  id, 
  label, 
  value, 
  onChange, 
  onBlur,
  error, 
  show, 
  setShow, 
  disabled = false,
  required = false,
  autoComplete = "current-password",
  placeholder,
  className = "",
  ...props 
}, ref) => {
  const inputId = id || `password-${Math.random().toString(36).substr(2, 9)}`
  const errorId = `${inputId}-error`
  const defaultPlaceholder = placeholder || `Enter ${label?.toLowerCase() || 'password'}`

  return (
    <div className="flex flex-col gap-2 relative">
      <label 
        htmlFor={inputId} 
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          ref={ref}
          type={show ? "text" : "password"}
          id={inputId}
          value={value || ""}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={defaultPlaceholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className={`
            border border-gray-300 p-3 rounded-lg w-full pr-12 
            focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            transition-colors duration-200
            ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
            ${className}
          `.trim()}
          {...props}
        />
        
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          disabled={disabled}
          className="
            absolute right-3 top-1/2 transform -translate-y-1/2
            text-gray-500 hover:text-gray-700 
            disabled:text-gray-300 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
            rounded p-1 transition-colors duration-200
          "
          aria-label={show ? "Hide password" : "Show password"}
          tabIndex={disabled ? -1 : 0}
        >
          {show ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      
      {error && (
        <p 
          id={errorId}
          className="text-sm text-red-600 flex items-start gap-1"
          role="alert"
        >
          <span className="text-red-500 mt-0.5">⚠</span>
          {error}
        </p>
      )}
    </div>
  )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput