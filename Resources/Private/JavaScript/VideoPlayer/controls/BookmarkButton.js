import shaka from 'shaka-player/dist/shaka-player.ui';

export default class BookmarkButton extends shaka.ui.Element {
  static KEY = 'bookmark';

  constructor(parent, controls) {
    super(parent, controls);

    // The actual button that will be displayed
    this.button_ = document.createElement('button');
    this.button_.className = 'material-icons-round';
    this.button_.title = 'Bookmark';
    this.button_.textContent = 'bookmark_border';
    this.parent.appendChild(this.button_);

    // Listen for clicks on the button
    this.eventManager.listen(this.button_, 'click', () => {
      BookmarkButton.onClick(); // TODO: Inject
    });
  }
};


BookmarkButton.Factory = class {
  create(rootElement, controls) {
    return new BookmarkButton(rootElement, controls);
  }
};

shaka.ui.Controls.registerElement(
  BookmarkButton.KEY,
  new BookmarkButton.Factory()
);
