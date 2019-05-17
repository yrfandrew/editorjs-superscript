/**
 * Build styles
 */
require('./index.css').toString();

/**
 * Superscript Tool for the Editor.js
 *
 * Allows to wrap inline fragment and style it somehow.
 */
class Superscript {
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  // static get CSS() {};

  /**
   * @param {{api: object}}  - Editor.js API
   */
  constructor({api}) {
    this.api = api;

    /**
     * Toolbar Button
     *
     * @type {HTMLElement|null}
     */
    this.button = null;

    /**
     * Tag represented the term
     *
     * @type {string}
     */
    this.tag = 'SUP';

    /**
     * CSS classes
     */
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive
    };
  }

  /**
   * Specifies Tool as Inline Toolbar Tool
   *
   * @return {boolean}
   */
  static get isInline() {
    return true;
  }

  /**
   * Create button element for Toolbar
   *
   * @return {HTMLElement}
   */
  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  /**
   * Wrap/Unwrap selected fragment
   *
   * @param {Range} range - selected fragment
   */
  surround(range) {
    if (!range) {
      return;
    }

    let termWrapper = this.api.selection.findParentTag(this.tag);

    /**
     * If start or end of selection is in the highlighted block
     */
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  /**
   * Wrap selection with term-tag
   *
   * @param {Range} range - selected fragment
   */
  wrap(range) {
    /**
     * Create a wrapper for highlighting
     */
    let sup = document.createElement(this.tag);

    // sup.classList.add(Superscript.CSS);

    /**
     * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
     *
     * // range.surroundContents(sup);
     */
    sup.appendChild(range.extractContents());
    range.insertNode(sup);

    /**
     * Expand (add) selection to highlighted block
     */
    this.api.selection.expandToTag(sup);
  }

  /**
   * Unwrap term-tag
   *
   * @param {HTMLElement} termWrapper - term wrapper tag
   */
  unwrap(termWrapper) {
    /**
     * Expand selection to all term-tag
     */
    this.api.selection.expandToTag(termWrapper);

    let sel = window.getSelection();
    let range = sel.getRangeAt(0);

    let unwrappedContent = range.extractContents();

    /**
     * Remove empty term-tag
     */
    termWrapper.parentNode.removeChild(termWrapper);

    /**
     * Insert extracted content
     */
    range.insertNode(unwrappedContent);

    /**
     * Restore selection
     */
    sel.removeAllRanges();
    sel.addRange(range);
  }

  /**
   * Check and change Term's state for current selection
   */
  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag);

    this.button.classList.toggle(this.iconClasses.active, !!termTag);
  }

  /**
   * Get Tool icon's SVG
   * @return {string}
   */
  get toolboxIcon() {
    return '<svg width="20" height="20"><path d="M13.606 6.94l-5.143 5.143 5.143 5.143-1.58 1.58-5.143-5.143-5.143 5.143-1.58-1.58 5.143-5.143-5.143-5.143 1.58-1.58 5.143 5.143 5.143-5.143 1.58 1.58zM20.16 8.722h-5.468v-1.12l0.997-0.919c0.852-0.717 1.479-1.322 1.905-1.826 0.415-0.493 0.627-0.952 0.639-1.378 0.011-0.314-0.090-0.583-0.303-0.784-0.202-0.213-0.527-0.314-0.964-0.325-0.347 0.011-0.65 0.078-0.941 0.19l-0.739 0.437-0.504-1.311c0.303-0.247 0.661-0.437 1.098-0.594s0.919-0.213 1.445-0.213c0.874 0 1.546 0.224 1.994 0.683 0.448 0.437 0.695 1.042 0.695 1.759-0.011 0.627-0.213 1.21-0.605 1.737-0.381 0.538-0.852 1.042-1.423 1.524l-0.717 0.583v0.022h2.891v1.535z"></path></svg>'
  }

  /**
   * Sanitizer rule
   * @return {{sup: {class: string}}}
   */
  static get sanitize() {
    return {
      sup: {}
    };
  }
}

module.exports = Superscript;
