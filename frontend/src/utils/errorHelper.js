export const getFriendlyErrorMessage = (error, fallbackMessage) => {
  if (!error) return fallbackMessage;

  let candidate = fallbackMessage;
  if (error.response?.data) {
    candidate = error.response.data;
  } else if (error.message) {
    candidate = error.message;
  }

  if (typeof candidate === 'object') {
    if (candidate.message) {
      candidate = candidate.message;
    } else {
      try {
        candidate = JSON.stringify(candidate);
      } catch {
        candidate = fallbackMessage;
      }
    }
  }

  candidate = String(candidate).trim();
  if (!candidate) return fallbackMessage;

  const technicalPatterns = [
    'exception',
    'stack trace',
    'error:',
    'java.',
    'javax.',
    'org.',
    'sql',
    'psql',
    'relation',
    'runtimeexception',
    'nullpointerexception',
    'constraint',
    'cannot',
    'failed to execute',
    'jdbc',
    'springframework',
    'hibernate'
  ];

  const lower = candidate.toLowerCase();
  const looksTechnical = technicalPatterns.some((term) => lower.includes(term));
  return looksTechnical ? fallbackMessage : candidate;
};
