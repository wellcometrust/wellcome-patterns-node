import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import { DownloadOption } from '../../types/manifest';
import { LicenseData } from '@weco/common/utils/licenses';
import { ReactElement, useContext, useRef } from 'react';
import styled from 'styled-components';
import { font, classNames } from '@weco/common/utils/classnames';
import DownloadLink, {
  DownloadFormat,
} from '@weco/common/views/components/DownloadLink/DownloadLink';
import SpacingComponent from '@weco/common/views/components/SpacingComponent/SpacingComponent';
import DropdownButton from '@weco/common/views/components/DropdownButton/DropdownButton';
import { NextPage } from 'next';
import PlainList from '@weco/common/views/components/styled/PlainList';

export const DownloadOptions = styled.div.attrs(() => ({
  className: font('intb', 4),
}))`
  white-space: normal;
  color: ${props => props.theme.color('black')};

  li + li {
    margin-top: ${props => `${props.theme.spacingUnit * 2}px`};
  }
`;

function getFormatString(format: string): DownloadFormat | undefined {
  switch (format) {
    case 'application/pdf':
      return 'PDF';
    case 'text/plain':
      return 'PLAIN';
    case 'image/jpeg':
      return 'JPG';
    case 'video/mp4':
      return 'MP4';
    case 'audio/mp3':
      return 'MP3';
    default:
      return undefined;
  }
}

export function getCredit(
  workId: string,
  title: string,
  iiifImageLocationCredit: string | undefined,
  license: LicenseData
): ReactElement {
  const titleCredit = title.replace(/\.$/g, '');

  const linkCredit = iiifImageLocationCredit ? (
    <>
      Credit:{' '}
      <a href={`https://wellcomecollection.org/works/${workId}`}>
        {iiifImageLocationCredit}
      </a>
      .
    </>
  ) : null;

  const licenseCredit: ReactElement = license.url ? (
    <a href={license.url}>{license.label}</a>
  ) : (
    <>{license.label}</>
  );

  return (
    <>
      <div key="0">
        {titleCredit}. {linkCredit} {licenseCredit}
      </div>
    </>
  );
}

type Props = {
  ariaControlsId: string;
  workId: string;
  downloadOptions: DownloadOption[];
  title?: string;
  iiifImageLocationCredit?: string;
  useDarkControl?: boolean;
  isInline?: boolean;
};

const Download: NextPage<Props> = ({
  ariaControlsId,
  workId,
  downloadOptions,
  useDarkControl = false,
  isInline = false,
}: Props) => {
  const downloadsContainer = useRef(null);
  const { isEnhanced } = useContext(AppContext);

  return (
    <div
      className={classNames({
        [font('intr', 5)]: true,
        'inline-block': isEnhanced,
        relative: true,
      })}
      ref={downloadsContainer}
    >
      {downloadOptions.length > 0 && (
        <>
          <DropdownButton
            label="Downloads"
            buttonType={isInline ? 'inline' : 'outlined'}
            isOnDark={useDarkControl}
            id={ariaControlsId}
          >
            <DownloadOptions className={font('intb', 5)}>
              <SpacingComponent>
                <PlainList>
                  {downloadOptions.map(option => {
                    const action = option.id?.match(/\/full\/full\//)
                      ? 'download large work image'
                      : option.id?.match(/\/full\/760/)
                      ? 'download small work image'
                      : option.label;
                    const format = getFormatString(option.format);

                    return (
                      <li key={option.id}>
                        <DownloadLink
                          href={option.id}
                          linkText={
                            option.format === 'application/pdf'
                              ? 'Whole item'
                              : option.label
                          }
                          format={format}
                          width={option.width}
                          mimeType={option.format}
                          trackingEvent={{
                            category: 'Button',
                            action,
                            label: workId,
                          }}
                        />
                      </li>
                    );
                  })}
                </PlainList>
              </SpacingComponent>
            </DownloadOptions>
          </DropdownButton>
        </>
      )}
    </div>
  );
};

export default Download;
