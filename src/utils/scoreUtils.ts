import { ComparisonResult, LevelNumber, Question, ScoreSummary } from '../types/game';
import { RESULT_MESSAGES_MATRIX, ScoreTier } from '../data/messages';

/**
 * Maps a percentage score (0-100) to one of the 5 defined score tiers.
 */
export function getScoreTier(percentage: number): ScoreTier {
  if (percentage <= 25) {
    return '0-20';
  }
  if (percentage <= 45) {
    return '30-40';
  }
  if (percentage <= 65) {
    return '50-60';
  }
  if (percentage <= 85) {
    return '70-80';
  }
  return '90-100';
}

/**
 * Returns dynamic witty, romantic, and dramatic result message based on level and score percentage.
 */
export function getResultMessage(scorePercentage: number, level: number): string {
  const safeLevel = Math.min(Math.max(level, 1), 5) as LevelNumber;
  const tier = getScoreTier(scorePercentage);
  const levelMatrix = RESULT_MESSAGES_MATRIX[safeLevel] || RESULT_MESSAGES_MATRIX[1];
  return levelMatrix[tier] || levelMatrix['50-60'];
}

/**
 * Compares answers between Player 1 and Player 2 for a list of questions.
 */
export function compareAnswers(
  questions: Question[],
  p1Answers: Record<number, string>,
  p2Answers: Record<number, string>
): ComparisonResult[] {
  return questions.map((q) => {
    const a1 = p1Answers[q.id] || '';
    const a2 = p2Answers[q.id] || '';
    const isMatch = a1.trim().length > 0 && a1.trim() === a2.trim();

    return {
      questionId: q.id,
      question: q.question,
      p1Answer: a1,
      p2Answer: a2,
      isMatch,
      options: q.options,
    };
  });
}

/**
 * Computes the score percentage and compiles the full score summary.
 */
export function calculateScore(comparisons: ComparisonResult[], level: number): ScoreSummary {
  const totalCount = comparisons.length;
  if (totalCount === 0) {
    return {
      matchedCount: 0,
      totalCount: 0,
      percentage: 0,
      message: getResultMessage(0, level),
      tier: '0-20',
    };
  }

  const matchedCount = comparisons.filter((c) => c.isMatch).length;
  const percentage = Math.round((matchedCount / totalCount) * 100);
  const tier = getScoreTier(percentage);
  const message = getResultMessage(percentage, level);

  return {
    matchedCount,
    totalCount,
    percentage,
    message,
    tier,
  };
}
