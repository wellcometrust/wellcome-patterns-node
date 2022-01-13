import PrismicDOM from 'prismic-dom';
import linkResolver from '@weco/common/services/prismic/link-resolver';
import { Fragment, ReactElement } from 'react';
import { HTMLSerializer } from 'prismic-reactjs';
import { dasherize } from '@weco/common/utils/grammar';
const { Elements } = PrismicDOM.RichText;

export const dropCapSerializer: HTMLSerializer<ReactElement> = (
  type,
  element,
  content,
  children,
  key
) => {
  if (type === Elements.paragraph && key === '0' && children[0] !== null) {
    const firstChild = children[0];
    const firstCharacters =
      firstChild.props &&
      firstChild.props.children &&
      firstChild.props.children[0];

    if (typeof firstCharacters !== 'string') {
      return <p key={key}>{children}</p>;
    }

    const firstLetter = firstCharacters.charAt(0);
    const cappedFirstLetter = (
      <span key={key} className="drop-cap">
        {firstLetter}
      </span>
    );
    const newfirstCharacters = [cappedFirstLetter, firstCharacters.slice(1)];
    const childrenWithDropCap = [newfirstCharacters, ...children.slice(1)];

    return <p key={key}>{childrenWithDropCap}</p>;
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return defaultSerializer(type, element, content, children, key);
};

export const defaultSerializer: HTMLSerializer<ReactElement> = (
  type,
  element,
  content,
  children,
  key
) => {
  switch (type) {
    case Elements.heading1:
      return <h1 key={key}>{children}</h1>;
    case Elements.heading2:
      return (
        <h2 key={key} id={dasherize(element.text)}>
          {children}
        </h2>
      );
    case Elements.heading3:
      return <h3 key={key}>{children}</h3>;
    case Elements.heading4:
      return <h4 key={key}>{children}</h4>;
    case Elements.heading5:
      return <h5 key={key}>{children}</h5>;
    case Elements.heading6:
      return <h6 key={key}>{children}</h6>;
    case Elements.paragraph:
      return <p key={key}>{children}</p>;
    case Elements.preformatted:
      return <pre key={key}>{children}</pre>;
    case Elements.strong:
      return <strong key={key}>{children}</strong>;
    case Elements.em:
      return <em key={key}>{children}</em>;
    case Elements.listItem:
      return <li key={key}>{children}</li>;
    case Elements.oListItem:
      return <li key={key}>{children}</li>;
    case Elements.list:
      return <ul key={key}>{children}</ul>;
    case Elements.oList:
      return <ol key={key}>{children}</ol>;
    case Elements.image:
      const url = element.linkTo
        ? PrismicDOM.Link.url(element.linkTo, linkResolver)
        : undefined;
      const linkTarget =
        element.linkTo && element.linkTo.target
          ? element.linkTo.target
          : undefined;
      const linkRel = linkTarget ? 'noopener' : undefined;
      const wrapperClassList = [element.label || '', 'block-img'];

      const img = <img src={element.url} alt={element.alt || ''} />;

      return (
        <p key={key} className={wrapperClassList.join(' ')}>
          {url ? (
            <a target={linkTarget} rel={linkRel} href={url}>
              {img}
            </a>
          ) : (
            img
          )}
        </p>
      );
    case Elements.embed:
      return (
        <div
          key={key}
          data-oembed={element.oembed.embed_url}
          data-oembed-type={element.oembed.type}
          data-oembed-provider={element.oembed.provider_name}
        >
          {element.oembed.html}
        </div>
      );
    case Elements.hyperlink:
      const target = element.data.target || undefined;
      const rel = target ? 'noopener' : undefined;
      const linkUrl = PrismicDOM.Link.url(element.data, linkResolver);
      const isDocument = element.data.kind === 'document';
      const nameWithoutSpaces = element.data.name
        ? dasherize(element.data.name)
        : '';
      const documentSize = isDocument
        ? Math.round(element.data.size / 1000)
        : '';

      const isInPage = linkUrl.match(/^https:\/\/(#.*)/i);
      const hashLink = isInPage && isInPage[1];

      const fileExtension = linkUrl.match(/\.[0-9a-z]+$/i);
      const documentType =
        fileExtension && fileExtension[0].substr(1).toUpperCase();

      if (hashLink) {
        return (
          <a key={key} target={target} rel={rel} href={hashLink}>
            {children}
          </a>
        );
      }

      if (isDocument) {
        return (
          <a
            key={key}
            target={target}
            className="no-margin plain-link font-green flex-inline flex--h-baseline"
            href={linkUrl}
          >
            <span
              style={{
                top: '8px',
                display: 'inline-block',
                height: '24px',
                width: '24px',
                position: 'relative',
                userSelect: 'none',
              }}
            >
              <canvas
                height="20"
                width="20"
                style={{
                  display: 'block',
                  height: '100%',
                  visibility: 'hidden',
                }}
              ></canvas>
              <svg
                className="icon__svg no-margin"
                role="img"
                aria-labelledby={`icon-download-title-${nameWithoutSpaces}`}
                style={{
                  width: '20px',
                  height: '20px',
                  left: '0',
                  position: 'absolute',
                  top: '0',
                }}
              >
                <title id={`icon-download-title-${nameWithoutSpaces}`}>
                  download
                </title>
                <svg viewBox="0 0 26 26">
                  <path
                    className="icon__shape"
                    d="M21.2 21.1H4.8a1 1 0 0 0 0 2h16.4a1 1 0 0 0 0-2zm-8.98-2.38a1 1 0 0 0 1.56 0l4-5a1 1 0 0 0-1.56-1.25L14 15.25V4.1a1 1 0 0 0-2 0v11.15l-2.22-2.78a1 1 0 1 0-1.56 1.25z"
                  />
                </svg>
              </svg>
            </span>
            <span className="no-margin">
              <span className="no-margin underline-on-hover">{children}</span>{' '}
              <span style={{ whiteSpace: 'nowrap' }}>
                <span className="no-margin font-pewter">{documentType}</span>{' '}
                <span className="no-margin font-pewter">{documentSize}kb</span>
              </span>
            </span>
          </a>
        );
      } else {
        return (
          <a key={key} target={target} href={linkUrl}>
            {children}
          </a>
        );
      }
    case Elements.label:
      const labelClass = element.data.label || undefined;
      return (
        <span key={key} className={labelClass}>
          {children}
        </span>
      );
    case Elements.span:
      return content ? (
        <Fragment key={key}>
          {content
            ? content.split('\n').reduce((acc, p) => {
                if (acc.length === 0) {
                  return [p];
                } else {
                  const brIndex = (acc.length + 1) / 2 - 1;
                  const br = <br key={brIndex} />;
                  return [...acc, br, p];
                }
              }, [])
            : null}
        </Fragment>
      ) : (<></>);
    default:
      return (<></>);
  }
};
