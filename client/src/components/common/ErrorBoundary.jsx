import React from 'react';
import Loader from './Loader';
// import Loader from '../components/common/Loader';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      isOffline: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  componentDidMount() {
    // Check online/offline status
    this.handleOnline = () => this.setState({ isOffline: false });
    this.handleOffline = () => this.setState({ isOffline: true });

    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // Set initial offline state
    this.setState({ isOffline: !navigator.onLine });
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
    window.location.reload();
  };

  render() {
    if (this.state.isOffline) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center'
        }}>
          <Loader />
          <div style={{ marginTop: '20px' }}>
            <h2>No Internet Connection</h2>
            <p>Please check your internet connection and try again.</p>
            <button 
              onClick={this.handleReset}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#6440fb',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center'
        }}>
          <Loader />
          <div style={{ marginTop: '20px', maxWidth: '600px' }}>
            <h2>Oops! Something went wrong</h2>
            <p>We're having trouble loading this page. Please try again.</p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginTop: '20px', 
                textAlign: 'left',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '5px'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Error Details
                </summary>
                <pre style={{ 
                  marginTop: '10px', 
                  fontSize: '12px',
                  overflow: 'auto'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button 
              onClick={this.handleReset}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#6440fb',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;