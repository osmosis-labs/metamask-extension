import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from '../../modal';
import Typography from '../../../ui/typography';
import {
  TYPOGRAPHY,
  FONT_WEIGHT,
  ALIGN_ITEMS,
  DISPLAY,
} from '../../../../helpers/constants/design-system';
import Box from '../../../ui/box';
import withModalProps from '../../../../helpers/higher-order-components/with-modal-props';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import { DEFAULT_ROUTE } from '../../../../helpers/constants/routes';
import { setDefaultHomeActiveTabName } from '../../../../store/actions';

const ConvertTokenToNFT = ({ hideModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const t = useI18nContext();
  return (
    <Modal
      onSubmit={async () => {
        await dispatch(setDefaultHomeActiveTabName('NFTs'));
        history.push(DEFAULT_ROUTE);
        hideModal();
      }}
      submitText="Yes"
      onCancel={() => hideModal()}
      cancelText={t('cancel')}
      contentClass="convert-token-to-nft-content"
      containerClass="convert-token-to-nft-container"
    >
      <div className="convert-token-to-nft">
        <Box
          marginTop={2}
          display={DISPLAY.INLINE_FLEX}
          alignItems={ALIGN_ITEMS.CENTER}
        >
          <Typography variant={TYPOGRAPHY.H6} fontWeight={FONT_WEIGHT.NORMAL}>
            {t('convertTokenToNFTDescription')}
            {/* <Button
              type="link"
              className="convert-token-to-nft__link"
              rel="noopener noreferrer"
              target="_blank"
              href="https://metamask.zendesk.com/hc/en-us/articles/360015489251"
            >
              {t('learnMore')}
            </Button> */}
          </Typography>
        </Box>
      </div>
    </Modal>
  );
};

ConvertTokenToNFT.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default withModalProps(ConvertTokenToNFT);
