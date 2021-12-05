import { FeedbackLevel, ModelName } from '../../data/types';

export interface TrialData {
  started: number;
  model: ModelName;
  feedbackLevel: FeedbackLevel;
  ended: number;
  target?: number[] | null;
  answer?: number[] | null;
}
