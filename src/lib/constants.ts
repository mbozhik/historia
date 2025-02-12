export const websitePaths = {
  main: {
    about: {
      text: 'О нас',
      link: '/about',
    },
    contacts: {
      text: 'Контакты',
      link: '/contacts',
    },
  },
  auth: {
    profile: {
      link: '/profile/reader',
    },
    sign_in: {
      text: 'Войти',
    },
    sign_out: {
      text: 'Выйти',
    },
    sign_up: {
      text: 'Создать аккаунт',
      link: '/sign-up',
    },
  },
  profile: {
    reader: {
      text: 'Читательский кабинет',
      text_mobile: 'Читатель',
      link: '/profile/reader',
    },
    author: {
      text: 'Авторский кабинет',
      text_mobile: 'Автор',
      link: '/profile/author',
    },
    settings: {
      text: 'Настройки',
      text_mobile: 'Настройки',
      link: '/profile/settings',
    },
  },
}
