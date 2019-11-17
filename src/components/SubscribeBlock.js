import styled from '@emotion/styled';

export const SubscribeBlock = styled('div')({
  overflow: 'hidden',
  margin: 0,
  '& #mc_embed_signup form': {
    marginBottom: '20px',
  },
  '@media all and (max-width: 700px)': {
    paddingRight: 0,
    width: '100% !important',
    padding: '0 10px',
    '& .mc-field-group': {
      width: '100% !important',
    },
    '& .mc-field-group input': {
      width: '100% !important',
      fontSize: '0.8em',
      height: '2.4em',
    },
  },
});
