import { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const ANALYZE_QUERY = gql`
  query AnalyzeClause($text: String!) {
    analyze(text: $text) {
      riskLevel
      insights
      clauseType
    }
  }
`;

export default function Home() {
  const [clause, setClause] = useState('');
  const [analyze, { data, loading, error }] = useLazyQuery(ANALYZE_QUERY);

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-4">Contract Insights AI</h1>
      <textarea
        className="border p-2 w-full h-40"
        placeholder="Paste contract clause here..."
        value={clause}
        onChange={(e) => setClause(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 mt-2"
        onClick={() => analyze({ variables: { text: clause } })}
      >
        Analyze
      </button>

      {loading && <p>Analyzing...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="mt-4">
          <p><strong>Type:</strong> {data.analyze.clauseType}</p>
          <p><strong>Risk Level:</strong> {data.analyze.riskLevel}</p>
          <p><strong>Insights:</strong> {data.analyze.insights}</p>
        </div>
      )}
    </div>
  );
}
