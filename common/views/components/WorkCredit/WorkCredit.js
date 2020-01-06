// @flow
import { Fragment } from 'react';
import type { Work } from '../../../model/work';
import { licenseMap } from '@weco/common/utils/get-license-info';

type Props = {|
  work: Work,
|};

const WorkCredit = ({ work }: Props) => {
  const license = work.thumbnail && work.thumbnail.license.licenseType;
  return (
    <Fragment>
      {work.title}
      {work.creators.length > 0 &&
        work.creators.map(creator => creator.label).join(', ')}
      {work.credit && (
        <a href={`https://wellcomecollection.org/works/${work.id}`}>
          {work.credit}
        </a>
      )}{' '}
      {license && <a href={licenseMap[license].url}>{license}</a>}
    </Fragment>
  );
};

export default WorkCredit;
