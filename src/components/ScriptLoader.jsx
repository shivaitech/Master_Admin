import React, { useState } from 'react';

const ScriptLoader = ({ defaultScript = '' }) => {
  const [scriptInput, setScriptInput] = useState(defaultScript);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const extractScriptUrl = (scriptTag) => {
    const srcMatch = scriptTag.match(/src=["']([^"']+)["']/);
    return srcMatch ? srcMatch[1] : null;
  };

  const loadScript = () => {
    setError(null);
    
    if (!scriptInput.trim()) {
      setError('Please enter a valid script tag');
      return;
    }

    const scriptUrl = extractScriptUrl(scriptInput);
    
    if (!scriptUrl) {
      setError('Invalid script tag format. Please include a valid src attribute.');
      return;
    }

    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      setError('This script is already loaded');
      return;
    }

    // Create and inject script element
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
      setError(null);
    };

    script.onerror = () => {
      setError('Failed to load script. Please check the URL and try again.');
      setIsLoaded(false);
    };

    document.body.appendChild(script);
  };

  const removeScript = () => {
    const scriptUrl = extractScriptUrl(scriptInput);
    if (scriptUrl) {
      const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
      if (existingScript) {
        existingScript.remove();
        setIsLoaded(false);
        setError(null);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4">
          Script Loader
        </h2>
        
        <div className="space-y-4">
          {/* Script Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Paste your script tag here:
            </label>
            <textarea
              value={scriptInput}
              onChange={(e) => setScriptInput(e.target.value)}
              placeholder='<script src="https://example.com/widget.js?param=value"></script>'
              className="w-full h-32 px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white font-mono text-sm resize-none"
            />
          </div>

          {/* Status Message */}
          {isLoaded && (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Script loaded successfully!
              </span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-red-700 dark:text-red-300">
                {error}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={loadScript}
              disabled={isLoaded}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isLoaded
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {isLoaded ? 'Script Loaded' : 'Load Script'}
            </button>
            
            {isLoaded && (
              <button
                onClick={removeScript}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Remove Script
              </button>
            )}
          </div>

          {/* Info */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
              ℹ️ How to use:
            </h3>
            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
              <li>Paste your complete script tag in the textarea above</li>
              <li>Click "Load Script" to inject it into the page</li>
              <li>The script will be added to the document body</li>
              <li>Click "Remove Script" to unload it from the page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptLoader;
