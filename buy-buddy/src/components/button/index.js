import { withInstall } from '@/utils/withInstall';

import primaryCircle from '@/components/button/primaryCircle.vue';
import plainCircle from '@/components/button/plainCircle.vue';
import outlineCircle from '@/components/button/outlineCircle.vue';
import linkCircle from '@/components/button/linkCircle.vue';

import primaryText from '@/components/button/primaryText.vue';
import secondaryText from '@/components/button/secondaryText.vue';
import outlineText from '@/components/button/outlineText.vue';
import linkText from '@/components/button/linkText.vue';
import plainText from '@/components/button/plainText.vue';

//文字按鈕
const PrimaryButton = withInstall(primaryText);
const SecondaryButton = withInstall(secondaryText);
const OutlineButton = withInstall(outlineText);
const LinkButton = withInstall(linkText);
const PlainButton = withInstall(plainText);

//純圖示按鈕
const PrimaryCircle = withInstall(primaryCircle);
const PlainCircle = withInstall(plainCircle);
const OutlineCircle = withInstall(outlineCircle);
const LinkCircle = withInstall(linkCircle);

//export components
export default { 
    PrimaryButton, 
    SecondaryButton, 
    OutlineButton,
    LinkButton,
    PlainButton,
    PrimaryCircle,
    PlainCircle,
    OutlineCircle,
    LinkCircle
 };

export { 
    PrimaryButton, 
    SecondaryButton, 
    OutlineButton,
    LinkButton,
    PlainButton,
    PrimaryCircle,
    PlainCircle,
    OutlineCircle,
    LinkCircle
};
