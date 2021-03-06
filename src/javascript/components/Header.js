import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  constructor(config, mainApi) {
    super();
    this.api = mainApi;
    this.config = config;
    this.authButton = config.authButton;
    this.menuIcon = config.menuIcon;
    this.articlesLink = config.articlesLink;
    this.svg = config.svg;
    this.menuProps = config.menuProps;
  }

  addListeners() {
    this.listeners = [
      {
        element: this.menuIcon,
        event: 'click',
        callback: (e) => this._toggleMenu(e),
      },
      {
        element: this.authButton,
        event: 'click',
        callback: (e) => this.signOut(e),
      },
    ];
    this._setListeners(this.listeners);
  }

  render(userName) {
    if (!userName) {
      this.authButton.textContent = 'Авторизоваться';
      this.articlesLink.classList.add('header__link_inactive');
      // добавляем класс чтобы было удобней работать с попапами
      // так как они все открываются на одну кнопку
      this.authButton.classList.add('logged-out');
      this.authButton.classList.remove('logged-in');
    } else {
      this.loggedIn(userName);
    }
  }

  loggedIn(userName) {
    this.authButton.classList.add('logged-in');
    this.authButton.classList.remove('logged-out');
    this.articlesLink.classList.remove('header__link_inactive');
    this.authButton.textContent = userName;
    // добавляем иконку выхода
    this.authButton.appendChild(this.svg.content.cloneNode(true));
  }

  _toggleMenu() {
    this._toggle(this.menuProps);
  }

  signOut(e) {
    if (e.target.classList.contains('logged-in')
     || e.target.classList.contains('button__auth-svg')) {
      this.api.signOut()
        .then((res) => {
          console.log(res);
          sessionStorage.removeItem('userName');
          document.location.href = '../';
        });
    }
  }
}
