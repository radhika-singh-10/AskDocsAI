const axios = require('axios');

async function analyzeClause(text) {
  const prompt = `
Analyze the following legal clause:
"${text}"

Return:
1. Clause type (e.g., NDA, indemnity, confidentiality, termination)
2. Risk level (low, medium, high)
3. Key insights (red flags, advice, or improvements)

Format: JSON object with keys: clauseType, riskLevel, insights.
`;

  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.4,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  try {
    const json = JSON.parse(response.data.choices[0].text.trim());
    return json;
  } catch (err) {
    return {
      clauseType: 'Unknown',
      riskLevel: 'Unknown',
      insights: 'Failed to parse response. Check clause wording or API output.',
    };
  }
}

module.exports = { analyzeClause };
