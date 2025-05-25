import { renderFeedbackSlider } from '../views/feedback-view';
import { getFeedbackList } from '../api/soundWaveAPI';

export async function handleReviews() {
  try {
    const data = await getFeedbackList();
    renderFeedbackSlider(data);
  } catch (error) {
    console.error('An error occurred while loading the data:', error);
  }
}
