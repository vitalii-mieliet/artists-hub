import { Splide } from '../libs';
import { renderFeedbackSlider } from '../views/feedback-view';
import { getFeedbackList } from '../api/soundWaveAPI';

export async function renderReviews() {
  try {
    const data = await getFeedbackList();
    renderFeedbackSlider(data);
  } catch (error) {
    console.error('Помилка при завантаженні відгуків:', error);
  }
}
