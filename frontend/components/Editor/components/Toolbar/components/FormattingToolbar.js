// @flow
import React, { Component } from 'react';
import styles from '../Toolbar.scss';

export default class FormattingToolbar extends Component {
  props: {
    state: Object,
    onChange: Function,
  };

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */
  hasMark = type => {
    return this.props.state.marks.some(mark => mark.type === type);
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} e
   * @param {String} type
   */
  onClickMark = (e, type) => {
    e.preventDefault();
    let { state } = this.props;

    state = state.transform().toggleMark(type).apply();

    this.props.onChange(state);
  };

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    const onMouseDown = e => this.onClickMark(e, type);

    return (
      <span
        className={styles.button}
        onMouseDown={onMouseDown}
        data-active={isActive}
      >
        {icon}
      </span>
    );
  };

  render() {
    return (
      <span>
        {this.renderMarkButton('bold', 'B')}
        {this.renderMarkButton('italic', 'I')}
        {this.renderMarkButton('strikethrough', 'S')}
        {this.renderMarkButton('underlined', 'U')}
        {this.renderMarkButton('code', 'C')}
      </span>
    );
  }
}