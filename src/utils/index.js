import { media } from './styledComponents';
import { successToaster, errorToaster } from './toaster';
import * as ldflexHelper from './ldflex-helper';
import * as notification from './notification';
import * as permissionHelper from './permissions';
import * as mapUtils from './map-utils';
import useModal from './modal';
import { MobileCompatWrapper, ModalCloseButton } from './modal-wrapper';
import { gpx } from './parser';

function* entries(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

export {
  media,
  entries,
  ldflexHelper,
  successToaster,
  errorToaster,
  notification,
  permissionHelper,
  useModal as modal,
  MobileCompatWrapper,
  ModalCloseButton,
  gpx,
  mapUtils
};
