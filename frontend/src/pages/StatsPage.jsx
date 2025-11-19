import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getLinkStats } from '../services/api';

function StatsPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchLinkStats();
  }, [code]);

  const fetchLinkStats = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getLinkStats(code);
      setLink(data.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Link not found');
      } else {
        setError('Failed to fetch link stats. Please try again.');
      }
      console.error('Error fetching link stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const url = `${window.location.origin}/${code}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
          <h3 className="font-semibold mb-2">Error</h3>
          <p>{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-red-600 hover:text-red-800 font-medium"
          >
            &larr; Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Link Statistics</h1>
        <p className="text-gray-600">Detailed information about your short link</p>
      </div>

      {/* Main Stats Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-sm font-medium text-gray-500 mb-1">Short Code</h2>
            <code className="text-2xl font-mono font-bold text-blue-600">
              {link.code}
            </code>
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span className="font-medium">
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Short URL</h3>
            <a
              href={`${window.location.origin}/${link.code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium break-all"
            >
              {window.location.origin}/{link.code}
            </a>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Target URL</h3>
            <a
              href={link.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 break-all"
            >
              {link.targetUrl}
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Clicks</p>
              <p className="text-3xl font-bold text-gray-900">{link.clicks}</p>
            </div>
            <div className="bg-blue-50 rounded-full p-3">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-1">Last Clicked</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(link.lastClickedAt)}
              </p>
            </div>
            <div className="bg-purple-50 rounded-full p-3">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Created At</p>
            <p className="text-gray-900">{formatDate(link.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Last Updated</p>
            <p className="text-gray-900">{formatDate(link.updatedAt)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Link ID</p>
            <code className="text-sm text-gray-900 font-mono">{link.id}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;
