'use client';

import { useState } from 'react';

export default function FraudDetector() {
  const [formData, setFormData] = useState({
    from_addr: '',
    to_addr: '',
    value_wei: '',
    gas: '',
    gas_price: ''
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        from_addr: formData.from_addr,
        to_addr: formData.to_addr,
        value_wei: parseFloat(formData.value_wei),
        gas: parseFloat(formData.gas),
        gas_price: parseFloat(formData.gas_price)
      };

      const response = await fetch('https://fraudmesh.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to analyze transaction');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
        
        {/* Left Section - Input Form */}
        <div className="flex flex-col h-full overflow-y-auto bg-white">
          <div className="flex-1 flex flex-col p-8 lg:p-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Fraud Detector
                </h1>
              </div>
              <p className="text-gray-600 text-sm">
                Enter transaction details to check for fraudulent activity
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
              {/* From Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Address
                </label>
                <input
                  type="text"
                  name="from_addr"
                  value={formData.from_addr}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                  placeholder="0x..."
                  required
                />
              </div>

              {/* To Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Address
                </label>
                <input
                  type="text"
                  name="to_addr"
                  value={formData.to_addr}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                  placeholder="0x..."
                  required
                />
              </div>

              {/* Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Value (Wei)
                </label>
                <input
                  type="number"
                  name="value_wei"
                  value={formData.value_wei}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                  placeholder="Enter value"
                  required
                />
              </div>

              {/* Gas and Gas Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gas
                  </label>
                  <input
                    type="number"
                    name="gas"
                    value={formData.gas}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                    placeholder="Gas limit"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gas Price
                  </label>
                  <input
                    type="number"
                    name="gas_price"
                    value={formData.gas_price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
                    placeholder="Price"
                    required
                  />
                </div>
              </div>

              <div className="flex-1"></div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3.5 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Transaction'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section - Results */}
        <div className="flex flex-col h-full overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-50 border-l border-gray-200">
          <div className="flex-1 flex flex-col p-8 lg:p-12">
            {/* Results Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Analysis Results
              </h2>
              <p className="text-gray-600 text-sm">
                AI-powered fraud detection
              </p>
            </div>

            {/* Results Display */}
            <div className="flex-1 flex items-center justify-center">
              {!result && !error && !loading && (
                <div className="text-center max-w-sm">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-10 h-10 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Analyze
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Fill in the transaction details and click analyze to detect potential fraud
                  </p>
                </div>
              )}

              {loading && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="animate-spin h-10 w-10 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Analyzing Transaction
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Processing transaction data...
                  </p>
                </div>
              )}

              {error && (
                <div className="max-w-md w-full">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="h-8 w-8 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Analysis Failed
                    </h3>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="max-w-lg w-full space-y-6">
                  {/* Fraud Probability */}
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                    <div className="text-center mb-6">
                      <p className="text-sm font-medium text-gray-600 mb-3">
                        Fraud Probability
                      </p>
                      <div className="text-7xl font-bold text-blue-600 mb-4">
                        {(parseFloat(result.fraud_probability) * 100).toFixed(3)}%
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${parseFloat(result.fraud_probability) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Verdict */}
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
                    <p className="text-sm font-medium text-gray-600 mb-4">
                      Verdict
                    </p>
                    <span
                      className={`inline-block px-8 py-3 rounded-lg font-semibold text-lg ${
                        result.prediction.toLowerCase().includes('fraud') ||
                        result.prediction.toLowerCase().includes('suspicious')
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {result.prediction}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      Powered by machine learning algorithms
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}