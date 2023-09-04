// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor(
    img,
    title,
    description,
    category,
    price,
    amount = 0,
  ) {
    this.id = ++Product.#count // Генеруєио унікальний id для товару
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount
  }

  static add = (...data) => {
    const newProduct = new Product(...data)

    this.#list.push(newProduct)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }

  static getRandomList = (id) => {
    // Фільтруємо товари, щоб вилучити той, з яким порівнюєио id
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )

    // Відсортуємо за допомогою Math.random() та перемішаємо масив
    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )

    // Повертаємо перші 3 едементи з перемішаного масиву

    return shuffledList.slice(0, 3)
  }
}

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер Artline Gaming X66 v22 (X66v22) AMD Ryzen 5 5600X / RAM 12ГБ / HDD 2ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 Ti 8ГБ`,
  `Artline Gaming — це ігрові персональні комп'ютери, чиє покликання бути розважальним центром для будь-якого користувача.`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
  10,
)

Product.add(
  'https://picsum.photos/200/300',
  `Комп'ютер Artline Gaming X66 v22 (X66v22) AMD Ryzen 5 5600X / RAM 12ГБ / HDD 2ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 Ti 8ГБ`,
  `Artline Gaming — це ігрові персональні комп'ютери, чиє покликання бути розважальним центром для будь-якого користувача.`,
  [{ id: 2, text: 'Топ продажів' }],
  20000,
  10,
)

Product.add(
  'https://picsum.photos/200/300',
  `1Комп'ютер Artline Gaming X66 v22 (X66v22) AMD Ryzen 5 5600X / RAM 24ГБ / HDD 2ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 Ti 8ГБ`,
  `Artline Gaming — це ігрові персональні комп'ютери, чиє покликання бути розважальним центром для будь-якого користувача.`,
  [{ id: 1, text: 'Готовий до відправки' }],
  40000,
  10,
)

// ================================================================

class Purchase {
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1

  static #count = 0
  static #list = []

  static #bonusAccount = new Map()

  static getBonusBalance = (email) => {
    return Purchase.#bonusAccount.get(email) || 0
  }

  static calcBonusAmount = (value) => {
    return value * Purchase.#BONUS_FACTOR
  }

  static updateBonusBalance = (
    email,
    price,
    bonusUse = 0,
  ) => {
    const amount = this.calcBonusAmount(price)

    const currentBalance = Purchase.getBonusBalance(email)

    const updatedBalance =
      currentBalance + amount - bonusUse

    Purchase.#bonusAccount.set(email, updatedBalance)

    console.log(email, updatedBalance)

    return amount
  }

  constructor(data, product) {
    this.id = ++Purchase.#count

    this.firstname = data.firstname
    this.lastname = data.lastname

    this.phone = data.phone
    this.email = data.email

    this.comment = data.comment || null

    this.bonus = data.bonus || 0

    this.promocode = data.promocode || null

    this.totalPrice = data.totalPrice
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount

    this.product = product
  }

  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)

    this.#list.push(newPurchase)

    return newPurchase
  }

  static getList = () => {
    return Purchase.#list.reverse()
  }

  static getById = (id) => {
    return Purchase.#list.find((item) => item.id === id)
  }

  static updatedById = (id, data) => {
    const purchase = Purchase.getById(Number(id))

    if (purchase) {
      if (data.firstname) {
        purchase.firstname = data.firstname
      }
      if (data.lastname) {
        purchase.lastname = data.lastname
      }
      if (data.phone) {
        purchase.phone = data.phone
      }
      if (data.email) {
        purchase.email = data.email
      }

      return true
    } else {
      return false
    }
  }
}

console.log(
  Purchase.add(
    {
      firstname: 'Taras',
      lastname: 'Shevchenko',
      phone: '+3809545693758',
      email: 'taras.sh@example.com',
      comment:
        "влення Комп'ютер Artline Gaming X66 v22 (X66v22) AMD Ryzen 5 5600X / RAM 12ГБ / HDD 2ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 Ti 8ГБ (2 шт)",
      bonus: 6830,
      promocode: null,
      totalPrice: 47320,
      productPrice: 54000,
      deliveryPrice: 150,
      amount: 2,
    },
    {
      id: 1,
      img: 'https://picsum.photos/200/300',
      title:
        "Комп'ютер Artline Gaming X66 v22 (X66v22) AMD Ryzen 5 5600X / RAM 12ГБ / HDD 2ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 Ti 8ГБ",
      description:
        "Artline Gaming — це ігрові персональні комп'ютери, чиє покликання бути розважальним центром для будь-якого користувача.",
      category: [[Object], [Object]],
      price: 27000,
      amount: 10,
    },
  ),
  Purchase.add(
    {
      firstname: 'Taras',
      lastname: 'Shevchenko',
      phone: '+3809545693758',
      email: 'taras.sh@example.com',
      comment:
        "влення Комп'ютер Artline Gaming X66 v22 (X66v22) AMD Ryzen 5 5600X / RAM 12ГБ / HDD 2ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 Ti 8ГБ (2 шт)",
      bonus: 6830,
      promocode: null,
      totalPrice: 47320,
      productPrice: 54000,
      deliveryPrice: 150,
      amount: 2,
    },
    {
      id: 1,
      img: 'https://picsum.photos/200/300',
      title:
        "Комп'ютер Artline Gaming X66 v22 (X66v22) AMD Ryzen 5 5600X / RAM 12ГБ / HDD 2ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 Ti 8ГБ",
      description:
        "Artline Gaming — це ігрові персональні комп'ютери, чиє покликання бути розважальним центром для будь-якого користувача.",
      category: [[Object], [Object]],
      price: 27000,
      amount: 10,
    },
  ),
  Purchase.add(
    {
      firstname: 'Taras',
      lastname: 'Shevchenko',
      phone: '+3809545693758',
      email: 'taras.sh@example.com',
      comment:
        "влення Комп'ютер Artline Gaming X66 v22 (X66v22) AMD Ryzen 5 5600X / RAM 12ГБ / HDD 2ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 Ti 8ГБ (2 шт)",
      bonus: 6830,
      promocode: null,
      totalPrice: 47320,
      productPrice: 54000,
      deliveryPrice: 150,
      amount: 2,
    },
    {
      id: 1,
      img: 'https://picsum.photos/200/300',
      title:
        "Комп'ютер Artline Gaming X66 v22 (X66v22) AMD Ryzen 5 5600X / RAM 12ГБ / HDD 2ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 Ti 8ГБ",
      description:
        "Artline Gaming — це ігрові персональні комп'ютери, чиє покликання бути розважальним центром для будь-якого користувача.",
      category: [[Object], [Object]],
      price: 27000,
      amount: 10,
    },
  ),
)

// ================================================================

class Promocode {
  static #list = []

  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }

  static add = (name, factor) => {
    const newPromoCode = new Promocode(name, factor)
    Promocode.#list.push(newPromoCode)
    return newPromoCode
  }

  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }

  static calc = (promo, price) => {
    return price * promo.factor
  }
}

Promocode.add('SUMMER2023', 0.9)
Promocode.add('DISCOUNT50', 0.5)
Promocode.add('SALE25', 0.75)

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'purchase-index',

    data: {
      list: Product.getList(),
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'purchase-product',

    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-create', function (req, res) {
  const id = Number(req.query.id)
  const amount = Number(req.body.amount)

  if (amount < 1) {
    return res.render('alert', {
      // вказуємо назву папки контейнера, в якій знаходяться наші стилі

      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Некоректна кількість товару',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  const product = Product.getById(id)

  if (product.amount < 1) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такої кількості товару немає в наявності',
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  console.log(product, amount)

  const productPrice = product.price * amount
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE
  const bonus = Purchase.calcBonusAmount(totalPrice)

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'purchase-create',

    // data: {
    //   list: Product.getRandomList(id),
    //   product: Product.getById(id),
    // },

    data: {
      id: product.id,

      cart: [
        {
          text: `${product.title} (${amount} шт)`,
          price: productPrice,
        },
        {
          text: `Доставка`,
          price: Purchase.DELIVERY_PRICE,
        },
      ],
      totalPrice,
      productPrice,
      deliveryPrice: Purchase.DELIVERY_PRICE,
      amount,
      bonus,
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-submit', function (req, res) {
  const id = Number(req.query.id)

  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,
    comment,

    promocode,
    bonus,
  } = req.body

  const product = Product.getById(id)

  if (!product) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Товар не знайдено',
        link: `/purchase-list`,
      },
    })
  }

  if (product.amount < amount) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Товару не має в потрібній кількості',
        link: `/purchase-list`,
      },
    })
  }

  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  bonus = Number(bonus)

  if (
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount) ||
    isNaN(bonus)
  ) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: `Помилка`,
        info: 'Некоректні дані',
        link: `/purchase-list`,
      },
    })
  }

  if (!firstname || !lastname || !email || !phone) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: `Заповніть обов'язкові поля`,
        info: 'Некоректні дані',
        link: `/purchase-list`,
      },
    })
  }

  if (bonus || bonus > 0) {
    const bonusAmount = Purchase.getBonusBalance(email)

    console.log(bonusAmount)

    if (bonus > bonusAmount) {
      bonus = bonusAmount
    }

    Purchase.updateBonusBalance(email, totalPrice, bonus)

    totalPrice -= bonus
  } else {
    Purchase.updateBonusBalance(email, totalPrice, 0)
  }

  if (promocode) {
    promocode = Promocode.getByName(promocode)

    if (promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }

  if (totalPrice < 0) totalPrice = 0

  const purchase = Purchase.add(
    {
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,
      bonus,

      firstname,
      lastname,
      email,
      phone,

      promocode,
      comment,
    },
    product,
  )

  console.log(purchase)

  res.render('alert', {
    style: 'alert',

    data: {
      message: `Успішно`,
      info: 'Замовлення створено',
      link: `/purchase-list?email=${purchase.email}`,
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-list', function (req, res) {
  // res.render генерує нам HTML сторінку

  const email = req.query.email

  const purchaseList = Purchase.getList()
    .filter((item) => item.email === email)
    .reverse()

  console.log(purchaseList)

  // const {
  //   id
  // }

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'purchase-list',

    data: {
      list: purchaseList,
    },
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-info', function (req, res) {
  // res.render генерує нам HTML сторінку

  const id = req.query.id

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-info', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'purchase-info',

    data: {
      purchase: {
        ...Purchase.getById(Number(id)),
        deliveryAddress:
          'вул. Центральна 14, кв. 36, м. Київ, 02000, Україна',
      },
    },
  })
})

// ================================================================

router.get('/purchase-edit', function (req, res) {
  const id = req.query.id

  res.render('purchase-edit', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'purchase-edit',

    data: {
      purchase: Purchase.getById(Number(id)),
    },
  })
})

// ================================================================

router.post('/purchase-edit', function (req, res) {
  const { lastname, firstname, email, phone, id } = req.body

  const result = Purchase.updatedById(Number(id), {
    lastname,
    firstname,
    email,
    phone,
  })

  console.log('update', Purchase.getById(Number(id)))

  if (result) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Успішно',
        info: 'Дані оновились успішно',
        link: `/`,
      },
    })
  } else {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Не вдалося оновити дані',
        link: `/`,
      },
    })
  }
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
