enum Key {
  Escape = 27,
}

export interface ILightModal {
  openModal: () => void;
  closeModal: () => void;
}

export interface ILightModalOptions {
  modal: string;
  openBtns?: string;
  closeBtn?: string;
  activeClass?: string;
  zIndex?: number;
}

class LightModal implements ILightModal {
  private _modal: HTMLElement;
  private _closeBtn: HTMLElement;
  private _openBtns: NodeListOf<HTMLElement>;
  private _activeCVlass: string = 'active';
  private _zIndex: string = '10';

  constructor(props: ILightModalOptions) {
    this._modal = document.querySelector(props.modal);
    this._closeBtn = document.querySelector(props.closeBtn);
    this._openBtns = document.querySelectorAll(props.openBtns);
    props.activeClass && (this._activeCVlass = props.activeClass);
    props.zIndex && (this._zIndex = props.zIndex.toString());
    this._init();
  }

  public openModal = (): void => {
    this._modal.classList.add(this._activeCVlass);
    document.body.addEventListener('keydown', this._keyCloseModal);
  }

  public closeModal = (): void => {
    this._modal.classList.remove(this._activeCVlass);
    document.body.removeEventListener('keydown', this._keyCloseModal);
  }

  private _keyCloseModal = (e: KeyboardEvent): void => {
    e.keyCode === Key.Escape && this.closeModal();
  }

  private _init = (): void => {
    if (this._hasModal()) {
      this._modal.style.zIndex = this._zIndex;
      this._hasCloseBtn() &&
        this._closeBtn.addEventListener('click', this.closeModal);
      this._hasOpenBtns() &&
        this._openBtns.forEach((btn) =>
          btn.addEventListener('click', this.openModal)
        );
    } else {
      console.error(`LightModal: По селектору не найдено HTML элемента.`);
    }
  }

  private _hasCloseBtn = (): boolean => {
    return !!this._closeBtn;
  }

  private _hasOpenBtns = (): boolean => {
    return !!this._openBtns.length;
  }

  private _hasModal = (): boolean => {
    return !!this._modal;
  }
}

export default LightModal;
