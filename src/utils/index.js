import { media } from './styledComponents';
import { expandedProperty } from './context';
import { successToaster, errorToaster } from './toaster';
import * as ldflexHelper from './ldflex-helper';
import * as notification from './notification';
import * as permissionHelper from './permissions';
import useModal from './modal';
import { MobileCompatWrapper, ModalCloseButton } from './modal-wrapper';

function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

export {
  media,
  expandedProperty,
  entries,
  ldflexHelper,
  successToaster,
  errorToaster,
  notification,
  permissionHelper,
  useModal as modal,
  MobileCompatWrapper,
  ModalCloseButton
};
