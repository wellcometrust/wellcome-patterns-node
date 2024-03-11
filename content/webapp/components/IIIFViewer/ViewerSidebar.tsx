import {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from 'react';
import { DigitalLocation } from '@weco/common/model/catalogue';
import NextLink from 'next/link';
import WorkLink from '../WorkLink';
import Icon from '@weco/common/views/components/Icon/Icon';
import styled from 'styled-components';
import Space from '@weco/common/views/components/styled/Space';
import { classNames, font } from '@weco/common/utils/classnames';
import LinkLabels from '@weco/content/components/LinkLabels/LinkLabels';
import { getCatalogueLicenseData } from '@weco/common/utils/licenses';
import ViewerStructures from './ViewerStructures';
import ItemViewerContext from '../ItemViewerContext/ItemViewerContext';
import MultipleManifestList from './MultipleManifestList';
import IIIFSearchWithin from '../IIIFSearchWithin/IIIFSearchWithin';
import WorkTitle from '../WorkTitle/WorkTitle';
import { removeTrailingFullStop, toHtmlId } from '@weco/content/utils/string';
import { arrow, chevron } from '@weco/common/icons';
import { getMultiVolumeLabel } from '@weco/content/utils/iiif/v3';
import { OptionalToUndefined } from '@weco/common/utils/utility-types';

const Inner = styled(Space).attrs({
  $h: { size: 'm', properties: ['padding-left', 'padding-right'] },
  $v: { size: 'm', properties: ['padding-top', 'padding-bottom'] },
})`
  h1 {
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 10;
    overflow: hidden;
  }
`;

const AccordionInner = styled(Space).attrs({
  className: font('intb', 5),
  $v: { size: 's', properties: ['padding-top', 'padding-bottom'] },
})`
  button {
    width: 100%;
    font-family: inherit;
    color: inherit;
    font-size: inherit;

    &:active {
      outline: ${props => props.theme.highContrastOutlineFix};
      box-shadow: ${props => props.theme.focusBoxShadow};
    }

    span {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  p {
    margin-bottom: 0.5em;
  }
`;

const Item = styled.div`
  border-bottom: 1px solid ${props => props.theme.color('neutral.600')};

  &:first-child {
    border-top: 1px solid ${props => props.theme.color('neutral.600')};
  }
`;

const AccordionButton = styled.button`
  padding: 0;

  h2 {
    margin-bottom: 0;
  }
`;

type AccordionItemProps = PropsWithChildren<{
  title: string;
  testId?: string;
}>;

const AccordionItem = ({ title, children, testId }: AccordionItemProps) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(false);
  }, []);

  return (
    <Item data-testid={testId}>
      <AccordionInner onClick={() => setIsActive(!isActive)}>
        <AccordionButton
          aria-expanded={isActive ? 'true' : 'false'}
          aria-controls={toHtmlId(title)}
        >
          <span>
            <h2 className={font('intb', 5)}>{title}</h2>
            <Icon
              icon={chevron}
              iconColor="white"
              rotate={isActive ? undefined : 270}
            />
          </span>
        </AccordionButton>
      </AccordionInner>
      <AccordionInner
        id={toHtmlId(title)}
        className={classNames({
          'is-hidden': !isActive,
        })}
      >
        {children}
      </AccordionInner>
    </Item>
  );
};

type ViewerSidebarProps = OptionalToUndefined<{
  iiifImageLocation?: DigitalLocation;
  iiifPresentationLocation?: DigitalLocation;
}>;

const ViewerSidebar: FunctionComponent<ViewerSidebarProps> = ({
  iiifImageLocation,
  iiifPresentationLocation,
}) => {
  const { work, transformedManifest, parentManifest } =
    useContext(ItemViewerContext);

  const matchingManifest =
    parentManifest &&
    parentManifest.canvases.find(canvas => {
      return !transformedManifest
        ? false
        : canvas.id === transformedManifest.id;
    });

  const manifestLabel =
    matchingManifest?.label &&
    getMultiVolumeLabel(matchingManifest.label, work?.title || '');

  const { structures, searchService } = { ...transformedManifest };

  const digitalLocation: DigitalLocation | undefined =
    iiifPresentationLocation || iiifImageLocation;

  const license =
    digitalLocation?.license &&
    getCatalogueLicenseData(digitalLocation.license);

  const locationOfWork = work.notes.find(
    note => note.noteType.id === 'location-of-original'
  );

  return (
    <>
      <Inner className={font('intb', 5)}>
        {manifestLabel && (
          <span className={font('intr', 5)}>{manifestLabel}</span>
        )}
        <h1>
          <WorkTitle title={work.title} />
        </h1>

        {work.primaryContributorLabel && (
          <Space $h={{ size: 'm', properties: ['margin-right'] }}>
            <LinkLabels items={[{ text: work.primaryContributorLabel }]} />
          </Space>
        )}

        {work.productionDates.length > 0 && (
          <LinkLabels
            heading="Date"
            items={[{ text: work.productionDates[0] }]}
          />
        )}

        {work.referenceNumber && (
          <LinkLabels
            heading="Reference"
            items={[{ text: work.referenceNumber }]}
          />
        )}

        <Space $v={{ size: 'm', properties: ['margin-top'] }}>
          <WorkLink id={work.id} source="viewer_back_link">
            <a
              className={font('intr', 5)}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              Catalogue details
              <Space
                $h={{ size: 's', properties: ['margin-left'] }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Icon icon={arrow} matchText={true} iconColor="white" />
              </Space>
            </a>
          </WorkLink>
        </Space>
      </Inner>
      <Inner>
        <AccordionItem title="Licence and re-use">
          <div className={font('intr', 6)}>
            {license && license.label && (
              <p>
                <strong>Licence:</strong>{' '}
                {license.url ? (
                  <NextLink href={license.url}>{license.label}</NextLink>
                ) : (
                  <span>{license.label}</span>
                )}
              </p>
            )}
            <p>
              <strong>Credit:</strong> {removeTrailingFullStop(work.title)}.{' '}
              {digitalLocation?.credit && <>{digitalLocation?.credit}. </>}
              Source:{' '}
              <WorkLink id={work.id} source="viewer_credit">
                Wellcome Collection
              </WorkLink>
              .
            </p>

            {locationOfWork && (
              <p>
                <strong>Provider: </strong>
                {locationOfWork.contents}
              </p>
            )}
          </div>
        </AccordionItem>

        {Boolean(structures && structures.length > 0) && (
          <AccordionItem title="Contents">
            <ViewerStructures />
          </AccordionItem>
        )}
        {/*
          Note: this check for `behavior === 'multi-part'` is repeated in items.tsx to
          avoid sending unnecessary data about parent manifests that we're not going
          to render.  If you change the display condition here, you'll likely want to
          update it there also.
        */}
        {parentManifest &&
          parentManifest.behavior?.[0] === 'multi-part' &&
          parentManifest.canvases && (
            <AccordionItem title="Volumes">
              <MultipleManifestList />
            </AccordionItem>
          )}
      </Inner>
      {searchService && (
        <Inner>
          <IIIFSearchWithin />
        </Inner>
      )}
    </>
  );
};

export default ViewerSidebar;
