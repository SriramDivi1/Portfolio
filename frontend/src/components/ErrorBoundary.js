import React from 'react';

/**
 * Catches React render errors and shows a fallback UI instead of a white screen.
 */
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#050505] text-white"
          role="alert"
        >
          <h1 className="font-display text-2xl md:text-3xl font-semibold mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-400 text-center max-w-md mb-8">
            The app hit an error. You can try reloading the page.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="px-6 py-3 rounded-full font-semibold bg-[#007AFF] text-white hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
