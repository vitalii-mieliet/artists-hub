import { axios } from '../libs';

const soundWaveAPI = axios.create({
  baseURL: 'https://sound-wave.b.goit.study/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const PER_PAGE = 8;
const ENDPOINTS = {
  ARTISTS: '/artists',
  ARTIST_BY_ID: id => `/artists/${id}`,
  FEEDBACKS: '/feedbacks',
  GENRES: '/genres',
};

export async function getArtistListByQuery({
  currentPage = 1,
  query,
  sortName,
  genre,
} = {}) {
  const params = {
    limit: PER_PAGE,
    page: currentPage,
  };

  if (query) params.name = query;
  if (sortName) params.sortName = sortName;
  if (genre) params.genre = genre;

  try {
    const response = await soundWaveAPI.get(ENDPOINTS.ARTISTS, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}
//
export async function getArtistList(currentPage = 1) {
  const params = {
    limit: PER_PAGE,
    page: currentPage,
  };

  try {
    const response = await soundWaveAPI.get(ENDPOINTS.ARTISTS, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getArtistDetails(id) {
  try {
    const response = await soundWaveAPI.get(ENDPOINTS.ARTIST_BY_ID(id));
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getFeedbackList(currentPage = 1) {
  const params = {
    limit: 20,
    page: currentPage,
  };

  try {
    const response = await soundWaveAPI.get(ENDPOINTS.FEEDBACKS, { params });
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function getGenreList() {
  try {
    const response = await soundWaveAPI.get(ENDPOINTS.GENRES);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// TODO:
/*export class SoundWaveAPI {
  #query = '';
  #genre = '';
  #sortName = { asc: 'asc', desc: 'desc' };

  #artists = {
    currentPage: 1,
    perPage: 8,
    totalPages: 1,
  };

  #feadback = {
    currentPage: 1,
    perPage: 9,
  };

  #endpoints = {
    genre: '/genres',
    artists: '/artists',
    feedback: '/feedback',
    artistById: id => `/artists/${id}`,
  };
  // API GET's
  async getGenreList() {
    try {
      const response = await soundWaveAPI.get(this.#endpoints.genre);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async getArtistList() {
    const params = {
      limit: this.#artists.perPage,
      page: this.#artists.currentPage,
    };

    try {
      const response = await soundWaveAPI.get(this.#endpoints.artists, {
        params,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getArtistDetails(id) {
    try {
      const response = await soundWaveAPI.get(this.#endpoints.artistById(id));
      return response.data;
    } catch (error) {
      return error;
    }
  }

  async getFeedbackList() {
    const params = {
      limit: this.#feadback.perPage,
      page: this.#feadback.currentPage,
    };

    try {
      const response = await soundWaveAPI.get(this.#endpoints.feedback, {
        params,
      });
      return response.data.data;
    } catch (error) {
      return error;
    }
  }
}*/
