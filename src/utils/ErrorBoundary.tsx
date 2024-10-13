import React, { useState, useEffect } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);

  const logErrorToMyService = (error: Error, errorInfo: any) => {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
    // TODO: Add your own error logging service here
  };

  // useEffect(() => {
  //   if (process.env.NODE_ENV !== "production") {
  //     const error = new Error("ErrorBoundary error");
  //     const errorInfo = { componentStack: "ErrorBoundary component stack" };
  //     logErrorToMyService(error, errorInfo);
  //   }
  // }, []);

  if (hasError) {
    return (
      <div>
        <h2>Something went wrong.</h2>
      </div>
    );
  }

  try {
    return children;
  } catch (error) {
    const errorAsError = error as Error;
    const errorInfo = { componentStack: "ErrorBoundary component stack" };
    logErrorToMyService(errorAsError, errorInfo);
    setHasError(true);
    return null;
  }
};

export default ErrorBoundary;
