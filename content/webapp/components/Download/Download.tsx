import { AppContext } from '@weco/common/views/components/AppContext/AppContext';
import { DownloadOption } from '../../types/manifest';
import { FunctionComponent, useContext, useRef } from 'react';
import styled from 'styled-components';
import { font } from '@weco/common/utils/classnames';
import DownloadLink from '@weco/content/components/DownloadLink/DownloadLink';
import SpacingComponent from '@weco/common/views/components/styled/SpacingComponent';
import Button from '@weco/common/views/components/Buttons';
import PlainList from '@weco/common/views/components/styled/PlainList';
import { getFormatString } from '@weco/content/utils/iiif/v3';

export const DownloadOptions = styled.div.attrs({
  className: font('intb', 4),
})`
  white-space: normal;
  color: ${props => props.theme.color('black')};

  li + li {
    margin-top: ${props => `${props.theme.spacingUnit * 2}px`};
  }
`;

const Wrapper = styled.div.attrs({
  className: font('intr', 5),
})<{ $isEnhanced: boolean }>`
  position: relative;
  ${props => (props.$isEnhanced ? 'display: inline-block;' : '')}
`;

type Props = {
  ariaControlsId: string;
  downloadOptions: DownloadOption[];
  useDarkControl?: boolean;
  isInline?: boolean;
};

const Download: FunctionComponent<Props> = ({
  ariaControlsId,
  downloadOptions,
  useDarkControl = false,
  isInline = false,
}: Props) => {
  const downloadsContainer = useRef(null);
  const { isEnhanced } = useContext(AppContext);

  return (
    <Wrapper $isEnhanced={isEnhanced} ref={downloadsContainer}>
      {downloadOptions.length > 0 && (
        <>
          <Button
            variant="DropdownButton"
            label="Downloads"
            buttonType={isInline ? 'inline' : 'outlined'}
            isOnDark={useDarkControl}
            id={ariaControlsId}
          >
            <DownloadOptions className={font('intb', 5)}>
              <SpacingComponent>
                <PlainList>
                  {downloadOptions.map(option => {
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
                        />
                      </li>
                    );
                  })}
                </PlainList>
              </SpacingComponent>
            </DownloadOptions>
          </Button>
        </>
      )}
    </Wrapper>
  );
};

export default Download;
