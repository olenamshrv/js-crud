// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Track {
  // Статичне приватне поле для зберігання списку об'єктів Track
  static #list = []

  constructor(name, author, image) {
    this.id = Math.floor(1000 + Math.random() * 9000) // Генеруємо випадкове id
    this.name = name
    this.image = image
    this.author = author
  }

  // Статичний метод для створення об'єкту Track і додавання його до списку #list
  static create(name, author, image) {
    const newTrack = new Track(name, author, image)
    this.#list.push(newTrack)
    return newTrack
  }

  // Статичний метод для отримання всього списку треків
  static getList() {
    return this.#list.reverse()
  }

  static getById(id) {
    return this.#list.find((track) => track.id === id)
  }
}

Track.create(
  'Інь Янь',
  'MONATIK і ROXOLANA',
  'https://picsum.photos/100/100',
)

Track.create(
  'Bailo Conmigo (Remix)',
  'MONATIK і ROXOLANA',
  'https://picsum.photos/100/100',
)

Track.create(
  'Shameless',
  'Camila Cabelo',
  'https://picsum.photos/100/100',
)

Track.create(
  'DAKITI',
  'BAD BUNNY і JHAY',
  'https://picsum.photos/100/100',
)

Track.create(
  '11 pm',
  'Maluma',
  'https://picsum.photos/100/100',
)

Track.create(
  'Інша любов',
  'Enleo',
  'https://picsum.photos/100/100',
)

console.log(Track.getList())

//===

class Playlist {
  // Статичне приватне поле для зберігання списку об'єктів Playlist
  static #list = []

  constructor(name) {
    this.id = Math.floor(1000 + Math.random() * 9000) // Генеруємо випадкове id
    this.name = name
    this.tracks = []
    this.image = 'https://picsum.photos/345/345'
    this.imageSmall = 'https://picsum.photos/164/164'
    this.amount = 0
  }

  // Статичний метод для створення об'єкту Playlist і додавання його до списку #list
  static create(name) {
    const newPlaylist = new Playlist(name)
    this.#list.push(newPlaylist)
    return newPlaylist
  }

  // Статичний метод для отримання всього списку треків
  static getList() {
    return this.#list.reverse()
  }

  static makeMix(playlist) {
    const allTracks = Track.getList()

    let randomTracks = allTracks
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    playlist.tracks.push(...randomTracks)
    playlist.amount = playlist.tracks.length
  }

  static getById(id) {
    return Playlist.#list.find(
      (playlist) => playlist.id === id,
    )
  }

  deleteTrackById(trackId) {
    this.tracks = this.tracks.filter(
      (track) => track.id !== trackId,
    )
    this.amount = this.tracks.length
  }

  addTrack(track) {
    this.tracks.push(track)
    this.amount = this.tracks.length
  }

  static findListValue(value) {
    return this.#list.filter((playlist) =>
      playlist.name
        .toLowerCase()
        .includes(value.toLowerCase()),
    )
  }
}

const playlist1 = Playlist.create('Пісні, що сподобались')
playlist1.tracks = [...Track.getList().slice(0, 4)]
playlist1.amount = playlist1.tracks.length

Playlist.makeMix(Playlist.create('Спільний альбом'))

const playlist2 = Playlist.create('Інь Ян')
playlist2.tracks = [...Track.getList().slice(3, 5)]
playlist2.amount = playlist2.tracks.length

Playlist.create('Мій плейліст №1')

console.log(Playlist.getList())

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-choose', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-choose', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-choose',

    data: {},
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-create', function (req, res) {
  // res.render генерує нам HTML сторінку

  const isMix = !!req.query.isMix
  // console.log(isMix)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-create',

    data: {
      isMix,
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/spotify-create', function (req, res) {
  // res.render генерує нам HTML сторінку

  console.log(req.body, req.query)

  const isMix = !!req.query.isMix
  console.log(isMix)
  const name = req.body.name

  if (!name) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі

      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Ввведіть назву плейліста',
        link: isMix
          ? `/spotify-create?isMix=true`
          : '/spotify-create',
      },
    })
  }

  const playlist = Playlist.create(name)

  if (isMix) {
    Playlist.makeMix(playlist)
  }

  console.log(playlist)

  res.render('spotify-playlist', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-playlist', function (req, res) {
  // res.render генерує нам HTML сторінку

  const id = Number(req.query.id)

  const playlist = Playlist.getById(id)

  if (!playlist) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі

      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такого плейліста не знайдено',
        link: `/`,
      },
    })
  }

  console.log('before', playlist.tracks)
  console.log('after', playlist.tracks.reverse())

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks.reverse(),
      name: playlist.name,
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-track-delete', function (req, res) {
  const playlistId = Number(req.query.playlistId)
  const trackId = Number(req.query.trackId)

  const playlist = Playlist.getById(playlistId)

  // res.render генерує нам HTML сторінку

  if (!playlist) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі

      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такого плейліста не знайдено',
        link: `/spotify-playlist?id=${playlistId}`,
      },
    })
  }

  playlist.deleteTrackById(trackId)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-playlist-add', function (req, res) {
  // res.render генерує нам HTML сторінку

  const playlistId = Number(req.query.playlistId)

  const playlist = Playlist.getById(playlistId)

  if (!playlist) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі

      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такого плейліста не знайдено',
        link: `/`,
      },
    })
  }

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist-add', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-playlist-add',

    data: {
      playlistId: playlistId,
      tracks: Track.getList(),
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-track-add', function (req, res) {
  // res.render генерує нам HTML сторінку

  const playlistId = Number(req.query.playlistId)
  const trackId = Number(req.query.trackId)

  const playlist = Playlist.getById(playlistId)
  const track = Track.getById(trackId)

  playlist.addTrack(track)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-playlist',

    data: {
      name: playlist.name,
      playlistId: playlistId,
      tracks: playlist.tracks.reverse(),
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-playlist-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-playlist-list',

    data: {
      list: Playlist.getList(),
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-search', function (req, res) {
  // res.render генерує нам HTML сторінку

  const value = ''

  const list = Playlist.findListValue(value)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-search', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-search',

    data: {
      list: list.map(({ tracks, ...rest }) => ({
        ...rest,
        amount: tracks.length,
      })),
      value,
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/spotify-search', function (req, res) {
  // res.render генерує нам HTML сторінку

  const value = req.body.value || ''

  const list = Playlist.findListValue(value)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-search', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-search',

    data: {
      list: list.map(({ tracks, ...rest }) => ({
        ...rest,
        amount: tracks.length,
      })),
      value,
    },
  })
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
