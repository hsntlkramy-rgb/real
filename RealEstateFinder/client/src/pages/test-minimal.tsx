import React from 'react';

export default function TestMinimalPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f0f0', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>
        🎉 RealEstateFinder is Working!
      </h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        margin: '20px auto',
        maxWidth: '600px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#2563eb' }}>✅ Success!</h2>
        <p>If you can see this page, your website is working correctly!</p>
        <ul style={{ marginTop: '20px' }}>
          <li>🏠 Home page is loading</li>
          <li>🔧 React is working</li>
          <li>📱 Components are rendering</li>
          <li>🎯 Routing is functional</li>
        </ul>
        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          backgroundColor: '#fef3c7', 
          borderRadius: '6px',
          border: '1px solid #f59e0b'
        }}>
          <strong>Next Steps:</strong>
          <p>Now we can add the full RealEstateFinder features!</p>
        </div>
      </div>
    </div>
  );
}
