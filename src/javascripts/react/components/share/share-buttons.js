/* eslint-disable react/no-multi-comp */
import React from 'react';

import {
  facebook,
  twitter,
  googlePlus,
  vkontakte
} from './social-media-share-links';
import { windowOpen } from './utils';


const SocialMediaShareButton = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    className: React.PropTypes.string,
    link: React.PropTypes.node.isRequired,
    url: React.PropTypes.string.isRequired
  },

  onClick() {
    windowOpen(this.props.link);
  },

  render() {
    const className = `SocialMediaShareButton ${this.props.className || ''}`;

    return (
      <div {...this.props}
        className={className}
        onClick={this.onClick}>
        {this.props.children}
      </div>
    );
  }
});

export const FacebookShareButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node.isRequired,
    title: React.PropTypes.string,
    url: React.PropTypes.string.isRequired
  },

  render() {
    const {
      url,
      title
    } = this.props;

    return (
      <SocialMediaShareButton
        link={facebook(url, title)}
        {...this.props}
        className={'SocialMediaShareButton--facebook' +
          ` ${this.props.className || ''}`} />
    );
  }
});


export const TwitterShareButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node.isRequired,
    title: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },

  render() {
    const {
      url,
      title
    } = this.props;

    return (
      <SocialMediaShareButton
        link={twitter(url, title)}
        {...this.props}
        className={'SocialMediaShareButton--twitter' +
          ` ${this.props.className || ''}`} />
    );
  }
});



export const GooglePlusShareButton = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    children: React.PropTypes.node.isRequired,
    url: React.PropTypes.string.isRequired
  },

  render() {
    const {
      url
    } = this.props;

    return (
      <SocialMediaShareButton
        link={googlePlus(url)}
        {...this.props}
        className={'SocialMediaShareButton--google-plus' +
          ` ${this.props.className || ''}`} />
    );
  }
});


export const VkontakteShareButton = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    children: React.PropTypes.node.isRequired,
    url: React.PropTypes.string.isRequired
  },

  render() {
    const {
      url,
      title,
      description
    } = this.props;

    return (
      <SocialMediaShareButton
        link={vkontakte(url, title, description)}
        {...this.props}
        className={'SocialMediaShareButton--vkontakte' +
          ` ${this.props.className || ''}`} />
    );
  }
});