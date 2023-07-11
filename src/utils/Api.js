class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
    this._token = config.headers.authorization;
  }

  _verifyRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject;
    }
  }

  getUserInfoFromSrv() {
    return fetch(this._url + "users/me", {
      headers: {
        authorization: this._token,
      },
    }).then(this._verifyRes);
  }

  getServerCards() {
    return fetch(this._url + "cards", {
      headers: {
        authorization: this._token,
      },
    }).then(this._verifyRes);
  }

  setUserInfoToSrv(data) {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.nameProfile,
        about: data.jobProfile,
      }),
    }).then(this._verifyRes);
  }

  changeAvatar(data) {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarProfile,
      }),
    }).then(this._verifyRes);
  }

  addCardToSrv(data) {
    return fetch(this._url + "cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._verifyRes);
  }

  deleteCardFromSrv(cardId) {
    return fetch(this._url + "cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._verifyRes);
  }

  activeLike(cardId) {
    return fetch(this._url + "cards/" + cardId + "/likes", {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._verifyRes);
  }

  unactiveLike(cardId) {
    return fetch(this._url + "cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._verifyRes);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66/",
  headers: {
    authorization: "d4c04a33-0990-4ec8-944d-d2a160888358",
    "Content-Type": "application/json",
  },
});

export default api;
