import { compose, display, spacing, styled } from '@mui/system';

const AffiliateImage = styled('img')(compose(spacing, display));

const AffiliateImageComponent = (props: React.ComponentProps<typeof AffiliateImage>) => {
  return <AffiliateImage display="block" {...props} />;
};

export default AffiliateImageComponent;
